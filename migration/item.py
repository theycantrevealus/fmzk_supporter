""" Albion Item Reader """
import json
import re
import pandas as pd # type: ignore
from pymongo import MongoClient # type: ignore

# Need to activate in case to re-fetch images
# import os
# import requests

client = MongoClient("mongodb://root:test123@localhost:27017/")
db = client["fmzk"]
collection = db["items"]

def format_name(value):
    """ Format Name """
    level_match = re.search(r'_LEVEL(\d+)\b', value)
    tier_match = re.search(r'^T(\d+)', value)

    enchantment = int(level_match.group(1)) if level_match else 0
    tier = int(tier_match.group(1)) if tier_match else 0

    name = re.sub(r'_LEVEL\d+\b', '', value)
    name = re.sub(r'^T\d+(?:_\d+H)?_', '', name)
    name = name.replace('_', ' ').title()

    return {
        "name": name,
        "enchantment": enchantment,
        "tier": tier,
    }

def to_int(value):
    """ Format Int"""
    if value is None:
        return 0

    try:
        return int(value)
    except (ValueError, TypeError):
        return 0

def normalize_craftingrequirements(cr):
    """ Normalizer """
    if cr is None:
        return None

    if not isinstance(cr, dict):
        return cr

    has_craftresource = "craftresource" in cr

    rename_map_cr = {
        "@silver": "silver",
        "@time": "time",
        "@craftingfocus": "focus",
        "@uniquename": "uniquename",
        "@count": "count",
        "@amountcrafted": "amountcrafted",
        "@enchantmentlevel": "enchantmentlevel"
    }

    result = {}

    for k, v in cr.items():
        new_key = rename_map_cr.get(k, k)

        if new_key == "craftresource":
            if v is None:
                result["craftresource"] = []

            elif isinstance(v, dict):
                result["craftresource"] = [
                    normalize_craftingrequirements(v)
                ]

            elif isinstance(v, list):
                result["craftresource"] = [
                    normalize_craftingrequirements(item)
                    for item in v
                ]

            else:
                result["craftresource"] = []

            continue

        new_value = normalize_craftingrequirements(v)

        if new_key in {"silver", "time", "focus", "count", "enchantmentlevel"}:
            new_value = to_int(new_value)

        if new_key == "uniquename":
            parsed = format_name(new_value)

            result["name"] = parsed["name"]
            result["uniquename"] = new_value
            result["enchantment"] = parsed["enchantment"]
            result["tier"] = parsed["tier"]
            continue

        result[new_key] = new_value

    if has_craftresource and "craftresource" not in result:
        result["craftresource"] = []

    return result

with open("items.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    item_types = [
        ("trackingitem", "trackingitem"),
        ("farmableitem", "farmableitem"),
        ("simpleitem", "simpleitem"),
        ("consumableitem", "consumableitem"),
        ("trashitem", "trashitem"),
        ("equipmentitem", "equipmentitem"),
        ("weapon", "weapon"),
        ("mount", "mount"),
        ("furnitureitem", "furnitureitem"),
        ("mountskin", "mountskin"),
        ("journalitem", "journalitem"),
        ("transformationweapon", "transformationweapon"),
    ]

    dfs = []
    for key, cls in item_types:
        df = pd.DataFrame(data["items"].get(key, []))
        df["classification"] = cls
        dfs.append(df)

    df = pd.concat(dfs, ignore_index=True)

    df = df[[
        "@uniquename", "@shopcategory", "@shopsubcategory1", "@shopsubcategory2", 
        "@tier", "@craftingcategory", "enchantments", "craftingrequirements", "classification"
    ]]

    if isinstance(df["craftingrequirements"], dict):
        df["craftingrequirements"] = [df["craftingrequirements"]]

    df["craftingrequirements"] = df["craftingrequirements"].apply(
        lambda value: [
            normalize_craftingrequirements(item)
            for item in (
                value if isinstance(value, list)
                else [value] if isinstance(value, dict)
                else []
            )
        ]
    )
    # df["craftingrequirements"] = df["craftingrequirements"].apply(normalize_craftingrequirements)
    # df["craftingrequirements"] = df["craftingrequirements"].apply(lambda x: normalize_craftingrequirements(x) if pd.notna(x) else x)
    rename_map = {
        "@uniquename": "uniquename",
        "@shopcategory": "shopcategory",
        "@shopsubcategory1": "shopsubcategory1",
        "@shopsubcategory2": "shopsubcategory2",
        "@tier": "tier",
        "@craftingcategory": "craftingcategory",
        "enchantments": "enchantmentdetail",
        "craftingrequirements": "craftingrequirements",
        "classification": "classification"
    }

    df.rename(columns=rename_map, inplace=True)

    # df['uniquename'] = df['uniquename'].apply(format_name)
    # df[['name', 'level', 'tier']] = (
    #     df['uniquename']
    #     .apply(format_name)
    #     .apply(pd.Series)
    # )

    df[['name', 'enchantment', 'tier']] = (
        df['uniquename']
        .apply(format_name)
        .apply(pd.Series)
    )

    df['tier'] = (
        df['tier']
        .fillna(0)
        .astype(int)
    )

    records = df.to_dict(orient="records")

    """ Get Image Part"""
    # output_dir = "images"
    # os.makedirs(output_dir, exist_ok=True)

    # base_url = "https://render.albiononline.com/v1/item"

    # for record in records:
    #     item_id = record.get("@uniquename")

    #     if not item_id:
    #         continue  # skip if missing

    #     image_url = f"{base_url}/{item_id}.png"
    #     image_path = os.path.join(output_dir, f"{item_id}.png")

    #     try:
    #         response = requests.get(image_url, timeout=10)
    #         response.raise_for_status()

    #         with open(image_path, "wb") as f:
    #             f.write(response.content)

    #         print(f"Saved: {image_path}")

    #     except requests.RequestException as e:
    #         print(f"Failed to fetch {item_id}: {e}")

    if records:
        collection.insert_many(records)

    print(f"Inserted {len(records)} records into MongoDB collection '{collection.name}'")
