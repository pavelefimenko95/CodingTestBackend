import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { carsProviders } from './cars.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CarsController],
    providers: [
        CarsService,
        ...carsProviders,
    ],
})
export class CarsModule {}
