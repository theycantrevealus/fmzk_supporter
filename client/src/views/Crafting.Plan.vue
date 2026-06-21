<template>
  <div class="card py-5">
    <div class="card flex w-12">
      <Stepper value="1" class="w-12">
        <StepList>
          <Step value="1">Preparation</Step>
          <Step value="2">Execution</Step>
          <Step value="3">Summary</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div>
              <div class="p-4">
                <div class="formgrid grid">
                  <div class="field col">
                    <label for="txt_correct_city">Bonus City</label>
                    <ToggleSwitch v-model="is_bonus_city" class="flex" />
                  </div>
                  <div class="field col">
                    <label for="txt_city">City</label>
                    <Select
                      id="txt_city"
                      @change="prepareMeta"
                      v-model="selected.city"
                      :options="collection.cities"
                      optionLabel="name"
                      placeholder="Select City"
                      class="w-full md:w-56 mx-1"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_base_city_bonus"
                      >Base Production Bonus (%)</label
                    >
                    <input
                      id="txt_base_city_bonus"
                      type="text"
                      disabled
                      :value="
                        (
                          (selected.base_production_bonus +
                            selected.refining_specialty_bonus) *
                          100
                        ).toFixed(2)
                      "
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_daily_bonus">Daily Bonus (%)</label>
                    <!-- <input
                      id="txt_daily_bonus"
                      type="text"
                      @keyup="prepareMeta"
                      v-model="selected.daily_bonus"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    /> -->
                    <InputText
                      name="txt_daily_bonus"
                      @change="prepareMeta"
                      v-model="selected.daily_bonus"
                      min="0"
                      type="number"
                      placeholder="Daily Bonus"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_rrr">RRR (%)</label>
                    <input
                      id="txt_rrr"
                      type="text"
                      disabled
                      :value="(rrr * 100).toFixed(2)"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_tax">Tax (%)</label>
                    <input
                      id="txt_tax"
                      type="text"
                      disabled
                      :value="(tax * 100).toFixed(2)"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_setup">Set Up Fee (%)</label>
                    <input
                      id="txt_setup"
                      type="text"
                      disabled
                      :value="(setupfee * 100).toFixed(2)"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                </div>
                <div class="flex py-4">
                  <div class="flex font-bold w-2">
                    <Select
                      @change="onFilterChange"
                      v-model="ui.select.category.selected"
                      :options="ui.select.category.options"
                      optionLabel="name"
                      placeholder="Enchantment"
                      class="w-full md:w-56 mx-1"
                    />
                  </div>
                  <div class="flex font-bold w-2">
                    <Select
                      @change="onFilterChange"
                      v-model="ui.select.subcategory1.selected"
                      :options="ui.select.subcategory1.options"
                      optionLabel="name"
                      placeholder="Enchantment"
                      class="w-full md:w-56 mx-1"
                    />
                  </div>
                  <div class="flex font-bold w-2">
                    <Select
                      @change="onFilterChange"
                      v-model="ui.select.tier.selected"
                      :options="ui.select.tier.options"
                      optionLabel="name"
                      placeholder="Tier"
                      class="w-full md:w-56 mx-1"
                    />
                  </div>
                  <div class="flex font-bold w-2">
                    <Select
                      @change="onFilterChange"
                      v-model="ui.select.enchantment.selected"
                      :options="ui.select.enchantment.options"
                      optionLabel="name"
                      placeholder="Enchantment"
                      class="w-full md:w-56 mx-1"
                    />
                  </div>
                  <div class="flex font-bold w-2">
                    <Select
                      @change="onFilterChange"
                      v-model="selected.item"
                      :options="collection.items"
                      optionLabel="name"
                      placeholder="Find Item"
                      filter
                      :autoFilter="false"
                      @filter="onSearch"
                      @show="onDropdownOpen"
                      :virtualScrollerOptions="{
                        itemSize: 38,
                        showLoader: true,
                        loading: ui.select.item.loading,
                        delay: 150,
                      }"
                      class="w-full md:w-56 mx-1"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value">
                          T{{ slotProps.value?.tier }}.{{
                            slotProps.value?.enchantment
                          }}
                          {{ slotProps.value?.name }}
                        </div>
                      </template>
                      <template #option="slotProps">
                        T{{ slotProps.option?.tier }}.{{
                          slotProps.option?.enchantment
                        }}
                        {{ slotProps.option?.name }}
                      </template>
                    </Select>
                  </div>
                </div>
                <div class="formgrid grid">
                  <div class="field col">
                    <label for="radio_use_focus">Use Focus</label>
                    <ToggleSwitch
                      v-model="focus.use"
                      class="flex"
                      @change="prepareMeta"
                    />
                  </div>
                  <div class="field col">
                    <label for="radio_premium_status">Premium Status</label>
                    <ToggleSwitch v-model="premium" class="flex" />
                  </div>
                  <div class="field col"></div>
                  <div class="field col">
                    <label for="txt_craft_qty">Craft Qty</label>
                    <!-- <input
                      id="txt_daily_bonus"
                      type="text"
                      @keyup="prepareMeta"
                      v-model="selected.daily_bonus"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    /> -->
                    <InputText
                      name="txt_craft_qty"
                      @change="prepareMeta"
                      v-model="targetCraft"
                      min="0"
                      type="number"
                      placeholder="Craft Qty"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_average_price">Market Average Price</label>
                    <InputText
                      name="txt_average_price"
                      @change="prepareMeta"
                      v-model="average_price"
                      min="0"
                      type="number"
                      placeholder="Avg. Market"
                    />
                  </div>
                  <div class="field col">
                    <label for="txt_usage_fee">Usage Fee</label>
                    <InputText
                      name="txt_usage_fee"
                      @change="prepareMeta"
                      v-model="usage_fee"
                      min="0"
                      type="number"
                      placeholder="Craft Station Fee"
                    />
                  </div>
                </div>
              </div>
              <div class="flex w-full justify-content-center p-4">
                <Button
                  label="Calculate"
                  icon="pi pi-plus"
                  iconPos="left"
                  @click="processCalculation"
                />
                <Dialog
                  v-model:visible="ui.dialog.proceed"
                  modal
                  :header="`Calculate ${targetCalculate.name}`"
                  :style="{ width: '75rem' }"
                >
                  <div class="flex w-full">
                    <Tabs value="0" class="w-full">
                      <TabList>
                        <div v-for="(aV, aK) in requiredResources" :key="aK">
                          <Tab :value="aK.toString()">Option {{ aK + 1 }}</Tab>
                        </div>
                      </TabList>
                      <TabPanels>
                        <div v-for="(bV, bK) in requiredResources" :key="bK">
                          <TabPanel :value="bK.toString()">
                            <div class="flex p-1 m-1">
                              <Fieldset legend="Information" class="m-2 w-3">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>Silver</td>
                                      <td>:</td>
                                      <td class="text-right">
                                        {{ bV.silver }}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Time</td>
                                      <td>:</td>
                                      <td class="text-right">{{ bV.time }}</td>
                                    </tr>
                                    <tr>
                                      <td>Focus</td>
                                      <td>:</td>
                                      <td class="text-right">{{ bV.focus }}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </Fieldset>
                              <Fieldset
                                legend="Required Resources"
                                class="m-2 w-9"
                              >
                                <table
                                  class="p-datatable-table custom-grid-table w-full"
                                >
                                  <thead>
                                    <tr>
                                      <th>Resource Name</th>
                                      <th>Recipe</th>
                                      <th>Qty</th>
                                      <th>Buy Price / pcs</th>
                                      <th>Total Buy</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(rVal, rKey) in bV.resources">
                                      <td>
                                        T{{ rVal.tier }}.{{ rVal.enchantment }}
                                        {{ rVal.name }}
                                      </td>
                                      <td class="text-right">
                                        {{ rVal.count }}
                                      </td>
                                      <td class="text-right">
                                        {{
                                          result?.[bK]?.iteration?.[0]
                                            ?.remaining[
                                            bV.resources.filter(
                                              (z: any) =>
                                                z.uniquename ===
                                                rVal.uniquename,
                                            )[0].uniquename
                                          ]
                                        }}
                                      </td>
                                      <td>
                                        <InputText
                                          v-model="rVal.buy_price"
                                          type="number"
                                        />
                                      </td>
                                      <td class="text-right">
                                        {{
                                          (rVal.buy_price ?? 0) *
                                          (result?.[bK]?.iteration?.[0]
                                            ?.remaining[
                                            bV.resources.filter(
                                              (z: any) =>
                                                z.uniquename ===
                                                rVal.uniquename,
                                            )[0].uniquename
                                          ] ?? 0)
                                        }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </Fieldset>
                            </div>
                            <div class="flex p-1 m-1">
                              <Fieldset legend="Iteration" class="w-12">
                                <table
                                  class="p-datatable-table custom-grid-table w-full"
                                >
                                  <thead>
                                    <tr>
                                      <th rowspan="2">Iterasi</th>
                                      <th colspan="2">Remaining</th>
                                      <th rowspan="2">Craftable</th>
                                      <th rowspan="2">Total Crafted</th>
                                    </tr>
                                    <tr>
                                      <th
                                        v-for="(cV, cK) in bV.resources"
                                        :key="cK"
                                      >
                                        T{{ cV.tier }}.{{ cV.enchantment }}
                                        {{ cV.name }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(aV, aK) in result[bK].iteration"
                                    >
                                      <td class="text-right">
                                        {{ aV.iteration }}
                                      </td>
                                      <td
                                        v-for="(dV, dK) in bV.resources"
                                        :key="dK"
                                        class="text-right"
                                      >
                                        {{
                                          aV.remaining[
                                            bV.resources.filter(
                                              (z: any) =>
                                                z.uniquename === dV.uniquename,
                                            )[0].uniquename
                                          ]
                                        }}
                                      </td>
                                      <td class="text-right">
                                        {{ aV.craftable }}
                                      </td>
                                      <td class="text-right">
                                        {{ aV.totalCrafted }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </Fieldset>
                            </div>
                          </TabPanel>
                        </div>
                      </TabPanels>
                    </Tabs>
                  </div>

                  <div class="flex pt-6 with justify-content-between p-6">
                    <Button
                      type="button"
                      label="Cancel"
                      severity="secondary"
                      @click="ui.dialog.proceed = false"
                    ></Button>
                    <Button
                      type="button"
                      label="OK !"
                      @click="getCalculationResult"
                    ></Button>
                  </div>
                </Dialog>
              </div>
              <div class="p-4">
                <table class="p-datatable-table custom-grid-table w-full">
                  <thead>
                    <tr>
                      <th rowspan="2"></th>
                      <th rowspan="2">#</th>
                      <th rowspan="2" class="w-4">Item</th>
                      <th rowspan="2">Qty</th>
                      <th rowspan="2">Market <br />Price</th>
                      <th rowspan="2">Margin</th>
                      <th colspan="3">Sell Plan Suggestion</th>
                      <th rowspan="2">Production <br />Cost / Item</th>
                      <th rowspan="2">Production <br />Cost Total</th>
                      <th rowspan="2">Profit / Item</th>
                      <th rowspan="2">Profit Total</th>
                    </tr>
                    <tr>
                      <th>5%</th>
                      <th>10%</th>
                      <th>15%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="flex pt-6 with justify-content-between p-6">
              <b></b>
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div>
              <div class="flex p-4">
                <!-- <table class="p-datatable-table custom-grid-table w-full">
                  <thead>
                    <tr>
                      <th>Iterasi</th>
                      <th
                        v-for="(value, key) in requiredResources.t5_metal
                          .requiredItem"
                        :key="key"
                      >
                        {{ key }} {{ value }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="a in result.iteration">
                      <td>{{ a.iteration }}</td>
                      <td
                        v-for="(b, key) in requiredResources.t5_metal
                          .requiredItem"
                        :key="key"
                      >
                        {{ a.remaining[key] }}
                      </td>
                    </tr>
                  </tbody>
                </table> -->
              </div>
            </div>
            <div class="flex pt-6 with justify-content-between p-6">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('1')"
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-col h-48">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
              >
                Content III
              </div>
            </div>
            <div class="flex pt-6 with justify-content-between p-6">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>

<script lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { ProductService } from "../services/item";
import { defineComponent } from "vue";

type ResultStep = {
  iteration: number;
  remaining: Record<string, number>;
};

type ResultMap = Record<
  string,
  {
    iteration: ResultStep[];
  }
>;

export default defineComponent({
  name: "CraftingPlan",
  components: {},
  data() {
    return {
      debounceTimer: null as any,
      searchQuery: null as any,
      ui: {
        dialog: {
          proceed: false,
        },
        select: {
          item: {
            loading: false as any,
          },
          category: {
            selected: { name: "All Category", code: "" },
            options: [
              { name: "All Category", code: "" },
              { name: "Farming", code: "farming" },
              { name: "Crafting", code: "crafting" },
              { name: "Artefacts", code: "artefacts" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
            ],
          },
          subcategory1: {
            selected: { name: "All Sub Category", code: "" },
            options: [
              { name: "All Sub Category", code: "" },
              { name: "Resources", code: "resources" },
              { name: "Refined Resources", code: "refinedresources" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
              { name: "", code: "" },
            ],
          },
          subcategory2: {
            selected: { name: "All Sub Category", code: 0 },
            options: [
              { name: "All Sub Category", code: 0 },
              { name: "T1", code: 1 },
              { name: "T2", code: 2 },
              { name: "T3", code: 3 },
              { name: "T4", code: 4 },
              { name: "T5", code: 5 },
              { name: "T6", code: 6 },
              { name: "T7", code: 7 },
              { name: "T8", code: 8 },
            ],
          },
          tier: {
            selected: { name: "All Tier", code: -1 },
            options: [
              { name: "All Tier", code: -1 },
              { name: "Tier 1", code: 1 },
              { name: "Tier 2", code: 2 },
              { name: "Tier 3", code: 3 },
              { name: "Tier 4", code: 4 },
              { name: "Tier 5", code: 5 },
              { name: "Tier 6", code: 6 },
              { name: "Tier 7", code: 7 },
              { name: "Tier 8", code: 8 },
            ],
          },
          enchantment: {
            selected: { name: "All Enchantment", code: -1 },
            options: [
              { name: "All Enchantment", code: -1 },
              { name: "Enchantment 0", code: 0 },
              { name: "Enchantment 1", code: 1 },
              { name: "Enchantment 2", code: 2 },
              { name: "Enchantment 3", code: 3 },
              { name: "Enchantment 4", code: 4 },
            ],
          },
        },
      },
      focus: {
        use: false,
        rate: 0.59,
      },
      collection: {
        items: [] as any,
        cities: [
          { name: "Lymhurst", code: "lymhurst" },
          { name: "Martlock", code: "martlock" },
          { name: "Bridgewatch", code: "bridgewatch" },
          { name: "Thetford", code: "thetford" },
          { name: "Fort Sterling", code: "fort_sterling" },
          { name: "Caerleon", code: "caerleon" },
          { name: "Brecillien", code: "brecillien" },
        ],
      },
      hasInitialLoaded: false,
      selected: {
        city: null as { name: string; code: string } | null,
        base_production_bonus: 0,
        refining_specialty_bonus: 0,
        daily_bonus: null,
        item: null as any,
      },
      cities: {
        lymhurst: {
          // This is default if not event activity bonus
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        martlock: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        bridgewatch: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        thetford: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        fort_sterling: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        caerleon: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
        brecillien: {
          base_production_bonus: 0.18,
          refining_specialty_bonus: 0.4,
        },
      } as any,
      rrr: 0,
      tax: 0.08,
      setupfee: 0.025,
      premium: false,
      is_bonus_city: false,
      targetCraft: null,
      usage_fee: null,
      average_price: null,
      // requiredResources: {
      //   t5_metal: {
      //     available: {
      //       t4_metal: 634,
      //       t5_ore: 1900,
      //     },
      //     requiredItem: {
      //       t4_metal: 1,
      //       t5_ore: 3,
      //     },
      //   },
      // } as any,
      requiredResources: [
        {
          silver: 0,
          time: 0,
          focus: 0,
          resources: [
            { name: "Resource 1", enchantment: 0, tier: 0, count: 0 },
            { name: "Resource 2", enchantment: 0, tier: 0, count: 0 },
          ],
        },
        {
          silver: 0,
          time: 0,
          focus: 0,
          resources: [
            { name: "Resource 1", enchantment: 0, tier: 0, count: 0 },
            { name: "Resource 2", enchantment: 0, tier: 0, count: 0 },
          ],
        },
      ] as any[],
      targetCalculate: {
        name: "",
      },
      // result: {
      //   iteration: [] as Array<{
      //     iteration: number;
      //     remaining: Record<string, number>;
      //   }>,
      // },
      // result: [] as any[],
      result: {} as Record<string, any>,
    };
  },

  mounted() {
    this.prepareMeta();
    // this.resetPlaceholders(200);
    // this.simulateCraft("t5_metal", this.rrr);
  },
  watch: {
    premium: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.tax = 0.04;
        } else {
          this.tax = 0.08;
        }
      },
      deep: true,
      immediate: true,
    },
    is_bonus_city: {
      handler(newValue, oldValue) {
        this.prepareMeta();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    prepareMeta() {
      if (this.selected.city) {
        this.selected.base_production_bonus =
          this.cities[this.selected.city.code].base_production_bonus;
        this.selected.refining_specialty_bonus = this.is_bonus_city
          ? this.cities[this.selected.city.code].refining_specialty_bonus
          : 0;
        this.rrr = this.calculateResourceReturnRate(this.selected.city?.code);
      }
    },
    simulateCraft(resource: any, rrr: number) {
      const requiredItem = resource.requiredItem;
      const available: Record<string, number> = { ...resource.available };
      const totalConsumed: Record<string, number> = {};

      for (const key of Object.keys(requiredItem)) {
        totalConsumed[key] = 0;
      }

      const requirements = Object.entries(requiredItem).map(
        ([key, value]: any) => ({
          key,
          qty: value.qty,
          returnable: value.returnable ?? false,
        }),
      );

      const steps: any[] = [];

      let totalCrafted = 0;
      let iteration = 1;

      const initialCraftable = Math.min(
        ...requirements.map((req) =>
          Math.floor((available[req.key] ?? 0) / req.qty),
        ),
      );

      steps.push({
        iteration: 1,
        craftable: initialCraftable,
        returned: {},
        remaining: { ...available },
        totalCrafted: 0,
      });

      while (requirements.some((req) => (available[req.key] ?? 0) >= req.qty)) {
        const craftable = Math.min(
          ...requirements.map((req) =>
            Math.floor((available[req.key] ?? 0) / req.qty),
          ),
        );

        if (craftable <= 0) break;

        const returned: Record<string, number> = {};

        for (const req of requirements) {
          const consumed = craftable * req.qty;

          totalConsumed[req.key] = (totalConsumed[req.key] ?? 0) + consumed;

          let recycled = 0;
          if (req.returnable) {
            recycled = Math.floor(consumed * rrr);
          } else {
            recycled = 0;
          }

          returned[req.key] = recycled;
          available[req.key] = recycled;
        }

        totalCrafted += craftable;
        iteration++;

        steps.push({
          iteration,
          craftable,
          returned,
          remaining: { ...available },
          totalCrafted,
        });
      }

      return {
        crafted: totalCrafted,
        remaining: available,
        steps,
        totalConsumed,
      };
    },
    findInitialCraftQty(
      targetQty: number,
      outputPerCraft: number,
      requiredItem: Record<string, { qty: number; returnable: boolean }>,
      rrr: number,
    ): Record<string, number> {
      const targetCraft = Math.ceil(targetQty / outputPerCraft);

      let low = 0;
      let high = targetCraft;

      while (low < high) {
        const mid = Math.floor((low + high) / 2);

        const available: Record<string, number> = {};

        for (const [item, data] of Object.entries(requiredItem)) {
          available[item] = mid * data.qty;
        }

        const producedCraft = this.simulateCraft(
          {
            available,
            requiredItem,
          },
          rrr,
        ).crafted;

        if (producedCraft >= targetCraft) {
          high = mid;
        } else {
          low = mid + 1;
        }
      }

      return Object.fromEntries(
        Object.entries(requiredItem).map(([item, data]: any) => [
          item,
          low * data.qty,
        ]),
      );
    },
    validateSimulation() {},
    calculateResourceReturnRate(targetCity: string): number {
      const dailyBonus = this.selected.daily_bonus
        ? parseInt(this.selected.daily_bonus) / 100
        : 0;
      const totalBonus = this.focus.use
        ? this.cities[targetCity].base_production_bonus +
          this.selected.refining_specialty_bonus +
          dailyBonus +
          this.focus.rate
        : this.cities[targetCity].base_production_bonus +
          this.selected.refining_specialty_bonus +
          dailyBonus;
      return totalBonus / (1 + totalBonus);
    },
    onFilterChange(event: any) {},
    async fetchItems(searchValue: string) {
      this.ui.select.item.loading = true;

      // Prepare filter
      let tier: any = [];

      if (this.ui.select.tier.selected.code < 0) {
        tier = [];
      } else {
        tier = [
          {
            value: this.ui.select.tier.selected.code,
            matchMode: FilterMatchMode.EQUALS,
          },
        ];
      }

      let enchantment: any = [];

      if (this.ui.select.enchantment.selected.code < 0) {
        enchantment = [];
      } else {
        enchantment = [
          {
            value: this.ui.select.enchantment.selected.code,
            matchMode: FilterMatchMode.EQUALS,
          },
        ];
      }

      const category = [
        {
          value: this.ui.select.category.selected.code,
          matchMode: FilterMatchMode.CONTAINS,
        },
      ];

      const subcategory1 = [
        {
          value: this.ui.select.subcategory1.selected.code,
          matchMode: FilterMatchMode.CONTAINS,
        },
      ];

      ProductService.getItems({
        first: 0,
        rows: 5,
        sortField: null,
        sortOrder: null,
        filters: {
          name: {
            operator: FilterOperator.OR,
            constraints: [
              {
                value: searchValue,
                matchMode: FilterMatchMode.CONTAINS,
              },
            ],
          },
          tier: {
            operator: FilterOperator.AND,
            constraints: tier,
          },
          enchantment: {
            operator: FilterOperator.AND,
            constraints: enchantment,
          },
          shopcategory: {
            operator: FilterOperator.AND,
            constraints: category,
          },
          shopsubcategory1: {
            operator: FilterOperator.AND,
            constraints: subcategory1,
          },
        },
      }).then(async (response) => {
        const parsedData = response.data;
        this.collection.items = parsedData;
        this.ui.select.item.loading = false;
      });
    },
    onDropdownOpen() {
      if (!this.hasInitialLoaded) {
        this.fetchItems("");
        this.hasInitialLoaded = true;
      }
    },
    onSearch(event: any) {
      const value = event.value ? event.value.trim() : "";

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchItems(value);
      }, 300);
    },
    processCalculation() {
      const targetItem = this.selected.item;

      if (!targetItem) {
        alert("Please select item");
        return;
      }

      this.ui.dialog.proceed = true;

      // Reset required resources to fill with target craft
      this.requiredResources = [];
      this.result = [];

      targetItem.craftingrequirements.forEach((a: any) => {
        const amountCraft = a.amountcrafted ?? 1;
        this.requiredResources.push({
          silver: a.silver,
          time: a.time,
          focus: a.focus,
          resources: a.craftresource,
        });

        const requiredItem: any = {};

        a.craftresource.forEach((b: any) => {
          if (!requiredItem[b.uniquename.toString()])
            requiredItem[b.uniquename] = {
              qty: b.count,
              returnable: b.returnable ?? false,
            };
        });

        const initialCraft = this.findInitialCraftQty(
          this.targetCraft ?? 0,
          amountCraft,
          requiredItem,
          this.rrr,
        );

        const c = this.simulateCraft(
          {
            available: initialCraft,
            requiredItem: requiredItem,
          },
          this.rrr,
        );

        this.result.push({
          iteration: c.steps,
          remaining: c.remaining,
          crafted: c.crafted,
        });
      });

      this.targetCalculate.name = `T${targetItem.tier}.${targetItem.tier} ${targetItem.name}`;
    },
    getCalculationResult() {
      this.ui.dialog.proceed = false;
      console.clear();
      console.log(this.requiredResources);
    },
  },
});
</script>
