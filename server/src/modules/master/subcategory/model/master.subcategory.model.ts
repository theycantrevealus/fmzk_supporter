import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MasterSubCategoryDocument = HydratedDocument<MasterSubCategory>;

@Schema()
export class MasterSubCategory {
  @Prop()
  name: string;

  @Prop()
  remark: string;
}

export const MasterSubCategorySchema =
  SchemaFactory.createForClass(MasterSubCategory);

export const MasterSubCategoryJoin = raw({
  name: { type: String },
});

export interface IMasterSubCategory {
  name: string;
}
