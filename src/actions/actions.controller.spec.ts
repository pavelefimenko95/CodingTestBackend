import { Test } from '@nestjs/testing';
import { ActionsController } from './actions.controller';
import { DatabaseModule } from '../database/database.module';
import { OWNERS_REPOSITORY, CARS_REPOSITORY } from '../constants/database';
import { Car } from '../cars/car.entity';
import { CarsService } from '../cars/cars.service';
import { Owner } from '../owners/owner.entity';
import { OwnersService } from '../owners/owners.service';

describe('ActionsController', () => {
    let actionsController: ActionsController;
    let ownersService: OwnersService;
    let carsService: CarsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [ActionsController],
            providers: [
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
            ],
        }).compile();

        ownersService = module.get<OwnersService>(OwnersService);
        carsService = module.get<CarsService>(CarsService);
        actionsController = module.get<ActionsController>(ActionsController);
    });

    describe('handleDeprecations', () => {
        it('should return undefined', async () => {
            jest.spyOn(ownersService, 'delete').mockImplementation(async () => 1);

            expect(await actionsController.handleDeprecations()).toBe(undefined);
        });
    });
});
