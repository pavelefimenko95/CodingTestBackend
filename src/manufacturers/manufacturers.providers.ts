import { Manufacturer } from './manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { MANUFACTURERS_REPOSITORY } from '../constants/database';

export const manufacturersProviders = [
    {
        provide: MANUFACTURERS_REPOSITORY,
        useValue: Manufacturer,
    },
    ManufacturersService,
];