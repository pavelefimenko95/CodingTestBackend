import { Owner } from './owner.entity';

export const ownersProviders = [
    {
        provide: 'OWNERS_REPOSITORY',
        useValue: Owner,
    },
];