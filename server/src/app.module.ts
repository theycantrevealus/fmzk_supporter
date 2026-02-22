import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MasterItemModule } from './modules/master/item/master.item.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }),
    MasterItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
