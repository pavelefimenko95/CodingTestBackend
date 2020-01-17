import { Car } from './car.entity';

export const carsProviders = [
    {
        provide: 'CARS_REPOSITORY',
        useValue: Car,
    },
];