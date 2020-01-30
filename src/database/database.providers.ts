import { Sequelize } from 'sequelize-typescript';
import { Owner } from '../owners/owner.entity';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Car } from '../cars/car.entity';
import * as dbConfig from '../config/dbConfig.json';

const config: any = dbConfig;

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(config);
            sequelize.addModels([Owner, Car, Manufacturer]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
