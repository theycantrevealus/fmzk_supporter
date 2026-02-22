import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongoSchema, HydratedDocument } from 'mongoose';

export type MasterItemDocument = HydratedDocument<MasterItem>;

@Schema({ collection: 'items' })
export class MasterItem {
  @Prop({ alias: '@unique_name' })
  name: string;

  @Prop({ alias: '@tier' })
  tier: string;

  @Prop()
  classification: string;

  @Prop({ alias: '@shopcategory' })
  shopcategory: string;

  @Prop({ alias: '@craftingcategory' })
  craftcategory: string;

  @Prop({ alias: '@shopsubcategory1' })
  subcat1: string;

  @Prop({ alias: '@shopsubcategory2' })
  subcat2: string;

  @Prop({ alias: 'enhancements', type: MongoSchema.Types.Mixed })
  enhance: object;

  @Prop({ alias: 'craftingrequirements' })
  crafting_requirement: number;

  @Prop()
  remark: string;
}

export const MasterItemSchema = SchemaFactory.createForClass(MasterItem);

export const MasterItemJoin = raw({
  name: { type: String },
});

export const MasterItemRecipe = raw({
  item: { type: MasterItemJoin },
  qty: { type: Number },
});
