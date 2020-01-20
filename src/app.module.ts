import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { CarsModule } from './cars/cars.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  imports: [OwnersModule, ManufacturersModule, CarsModule, ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
