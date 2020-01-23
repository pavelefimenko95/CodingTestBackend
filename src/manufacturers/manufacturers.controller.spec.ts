import { Test } from '@nestjs/testing';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from './manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { DatabaseModule } from '../database/database.module';
import { MANUFACTURERS_REPOSITORY } from '../constants/database';

describe('ManufacturersController', () => {
    let manufacturersController: ManufacturersController;
    let manufacturersService: ManufacturersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [ManufacturersController],
            providers: [
                {
                    provide: MANUFACTURERS_REPOSITORY,
                    useValue: Manufacturer,
                },
                ManufacturersService,
            ],
        }).compile();

        manufacturersService = module.get<ManufacturersService>(ManufacturersService);
        manufacturersController = module.get<ManufacturersController>(ManufacturersController);
    });

    describe('findAll', () => {
        it('should return an array of manufacturers', async () => {
            const result = [
                new Manufacturer(),
            ];
            jest.spyOn(manufacturersService, 'findAll').mockImplementation(async () => result);

            expect(await manufacturersController.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('should return a Manufacturer', async () => {
            const result = new Manufacturer();
            const createManufacturerDto: CreateManufacturerDto = {
                name: 'pl',
                phone: '+302342344334',
                siret: 234234234,
            };

            jest.spyOn(manufacturersService, 'create').mockImplementation(async () => result);

            expect(await manufacturersController.create(createManufacturerDto)).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return deleted rows count', async () => {
            const result: number = 1;
            const manufacturerToDeleteId = '1';

            jest.spyOn(manufacturersService, 'delete').mockImplementation(async () => result);

            expect(await manufacturersController.delete(manufacturerToDeleteId)).toBe(result);
        });
    });
});
