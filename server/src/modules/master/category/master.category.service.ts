import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MasterCategory } from './model/master.category.model';
import { Model } from 'mongoose';
import { prime_datatable } from 'src/utility/prime';
import { PrimeParameter } from 'src/utility/prime.dto';

@Injectable()
export class MasterCategoryService {
  constructor(
    @InjectModel(MasterCategory.name)
    private masterCategoryModel: Model<MasterCategory>,
  ) {}

  async all(payload: any) {
    try {
      const parameter: PrimeParameter = JSON.parse(payload);
      return await prime_datatable(parameter, this.masterCategoryModel).catch(
        (error: Error) => {
          throw error;
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async add() {}

  async edit() {}

  async remove() {}
}
