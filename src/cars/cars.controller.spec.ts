import { Test } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
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

    describe('findOne', () => {
        it('should return a car', async () => {
            const result = new Car();
            const requestedCarId = '1';

            jest.spyOn(carsService, 'findOne').mockImplementation(async () => result);

            expect(await carsController.findOne(requestedCarId)).toBe(result);
        });
    });

    describe('findManufacturer', () => {
        it('should return a manufacturer', async () => {
            const result = new Manufacturer();
            const requestedCar = new Car();
            requestedCar.manufacturer = result;
            const requestedCarId = '1';

            jest.spyOn(carsService, 'findOne').mockImplementation(async () => requestedCar);

            expect(await carsController.findManufacturer(requestedCarId)).toBe(result);
        });
    });

    describe('create', () => {
        it('should return a Car', async () => {
            const result = new Car();
            const createCarDto: CreateCarDto = {
                price: 123,
                firstRegistrationDate: new Date('2018-08-15'),
                manufacturerId: '1',
            };

            jest.spyOn(carsService, 'create').mockImplementation(async () => result);

            expect(await carsController.create(createCarDto)).toBe(result);
        });
    });

    describe('update', () => {
        it('should return array with updated rows count', async () => {
            const result: [number, Car[]] = [1, [new Car()]];
            const updateCarDto: UpdateCarDto = {
                id: 1,
                price: 123,
                firstRegistrationDate: new Date('2018-08-15'),
            };

            jest.spyOn(carsService, 'update').mockImplementation(async () => result);

            expect(await carsController.update(updateCarDto)).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return deleted rows count', async () => {
            const result: number = 1;
            const carToDeleteId = '1';

            jest.spyOn(carsService, 'delete').mockImplementation(async () => result);

            expect(await carsController.delete(carToDeleteId)).toBe(result);
        });
    });
});
