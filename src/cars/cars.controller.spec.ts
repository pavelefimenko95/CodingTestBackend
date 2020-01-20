import { Test } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { DatabaseModule } from '../database/database.module';
import { CARS_REPOSITORY } from '../constants/database';

describe('CarsController', () => {
    let carsController: CarsController;
    let carsService: CarsService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [CarsController],
            providers: [
                {
                    provide: CARS_REPOSITORY,
                    useValue: Car,
                },
                CarsService,
            ],
        }).compile();

        carsService = module.get<CarsService>(CarsService);
        carsController = module.get<CarsController>(CarsController);
    });

    describe('findAll', () => {
        it('should return an array of cars', async () => {
            const result = [
                new Car(),
            ];
            jest.spyOn(carsService, 'findAll').mockImplementation(async () => result);

            expect(await carsController.findAll()).toBe(result);
        });
    });
});
