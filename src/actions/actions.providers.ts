import { Owner } from '../owners/owner.entity';
import { Car } from '../cars/car.entity';
import { OwnersService } from '../owners/owners.service';
import { CarsService } from '../cars/cars.service';
import { OWNERS_REPOSITORY, CARS_REPOSITORY } from '../constants/database';

export const actionsProviders = [
    {
        provide: OWNERS_REPOSITORY,
        useValue: Owner,
    },
    {
        provide: CARS_REPOSITORY,
        useValue: Car,
    },
    OwnersService,
    CarsService,
];
