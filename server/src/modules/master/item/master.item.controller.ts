import { Controller, Get, Query } from '@nestjs/common';
import { MasterItemService } from './master.item.service';

@Controller('master/item')
export class MasterItemController {
  constructor(private readonly masterItemService: MasterItemService) {}

  @Get()
  async all(@Query('lazyEvent') parameter: string) {
    return this.masterItemService.all(parameter);
  }
}
