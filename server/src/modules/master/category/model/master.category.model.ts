import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IMasterSubCategory2 {
  id: string;
  name: string;
}

export interface IMasterSubCategory {
  id: string;
  name: string;
  subcategories2: IMasterSubCategory2[];
}

export const MasterSubCategory2 = raw({
  id: { type: String },
  name: { type: String },
});

export const MasterSubCategory = raw({
  id: { type: String },
  name: { type: String },
  subcategories2: { type: [MasterSubCategory2] },
});

export type MasterCategoryDocument = HydratedDocument<MasterCategory>;

@Schema({ collection: 'categories' })
export class MasterCategory {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({ type: [MasterSubCategory] })
  subcategories: IMasterSubCategory;
}

export const MasterCategorySchema =
  SchemaFactory.createForClass(MasterCategory);

export const MasterCategoryJoin = raw({
  name: { type: String },
});

export interface IMasterCategory {
  name: string;
}
