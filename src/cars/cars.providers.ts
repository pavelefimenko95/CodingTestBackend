import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CARS_REPOSITORY } from '../constants/database';

export const carsProviders = [
    {
        provide: CARS_REPOSITORY,
        useValue: Car,
    },
    CarsService,
];
