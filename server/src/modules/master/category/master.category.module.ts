import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MasterCategory,
  MasterCategorySchema,
} from './model/master.category.model';
import { MasterCategoryController } from './master.category.controller';
import { MasterCategoryService } from './master.category.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017',
        user: 'root',
        pass: 'test123',
        dbName: 'fmzk',
      }),
    }),
    MongooseModule.forFeature([
      { name: MasterCategory.name, schema: MasterCategorySchema },
    ]),
  ],
  controllers: [MasterCategoryController],
  providers: [MasterCategoryService],
  exports: [MasterCategoryService],
})
export class MasterCategoryModule {}
