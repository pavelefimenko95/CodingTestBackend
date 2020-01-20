import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { carsProviders } from './cars.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [CarsController],
    providers: carsProviders,
})
export class CarsModule {}
