import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MasterItemDocument = HydratedDocument<MasterItem>;

@Schema({ collection: 'items' })
export class MasterItem {
  @Prop()
  uniquename: string;

  @Prop()
  name: string;

  @Prop()
  tier: string;

  @Prop()
  enhancement: string;

  @Prop()
  classification: string;

  @Prop()
  shopcategory: string;

  @Prop()
  craftcategory: string;

  @Prop()
  shopsubcategory1: string;

  @Prop()
  shopsubcategory2: string;

  // @Prop()
  // craftingrequirements: any;

  // @Prop()
  // craftingdetail: any;

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
