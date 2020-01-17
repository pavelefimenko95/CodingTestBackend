import { Sequelize } from 'sequelize-typescript';
import { Owner } from '../owners/owner.entity';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Car } from '../cars/car.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'mysql',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'appDb',
            });
            sequelize.addModels([Owner, Car, Manufacturer]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
