import { Owner } from './owner.entity';
import { OwnersService } from './owners.service';
import { OWNERS_REPOSITORY } from '../constants/database';

export const ownersProviders = [
    {
        provide: OWNERS_REPOSITORY,
        useValue: Owner,
    },
    OwnersService,
];
