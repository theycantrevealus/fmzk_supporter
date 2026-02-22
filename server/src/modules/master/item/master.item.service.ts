import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterItem } from './model/master.item.model';
import { Model } from 'mongoose';
import { PrimeParameter } from 'src/utility/prime.dto';
import { prime_datatable } from 'src/utility/prime';

@Injectable()
export class MasterItemService {
  constructor(
    @InjectModel(MasterItem.name)
    private readonly masterItemModel: Model<MasterItem>,
  ) {}

  async all(payload: any) {
    try {
      const parameter: PrimeParameter = JSON.parse(payload);
      return await prime_datatable(parameter, this.masterItemModel).catch(
        (error: Error) => {
          throw error;
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
