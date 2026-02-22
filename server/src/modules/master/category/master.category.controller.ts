import { Controller, Get, Query } from '@nestjs/common';
import { MasterCategoryService } from './master.category.service';

@Controller('master/category')
export class MasterCategoryController {
  constructor(private readonly masterCategoryService: MasterCategoryService) {}

  @Get()
  async all(@Query('lazyEvent') parameter: string) {
    return this.masterCategoryService.all(parameter);
  }
}
