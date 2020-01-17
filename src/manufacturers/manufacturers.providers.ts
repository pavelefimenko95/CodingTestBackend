import { Manufacturer } from './manufacturer.entity';

export const manufacturersProviders = [
    {
        provide: 'MANUFACTURERS_REPOSITORY',
        useValue: Manufacturer,
    },
];