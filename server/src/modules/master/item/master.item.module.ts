import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterItem, MasterItemSchema } from './model/master.item.model';
import { MasterItemController } from './master.item.controller';
import { MasterItemService } from './master.item.service';

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
      { name: MasterItem.name, schema: MasterItemSchema },
    ]),
  ],
  controllers: [MasterItemController],
  providers: [MasterItemService],
  exports: [MasterItemService],
})
export class MasterItemModule {}
