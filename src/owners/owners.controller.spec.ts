import { Test } from '@nestjs/testing';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { Owner } from './owner.entity';
import { OwnerDto } from './dto/owner.dto';
import { DatabaseModule } from '../database/database.module';
import { OWNERS_REPOSITORY } from '../constants/database';

describe('OwnersController', () => {
    let ownersController: OwnersController;
    let ownersService: OwnersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule],
            controllers: [OwnersController],
            providers: [
                {
                    provide: OWNERS_REPOSITORY,
                    useValue: Owner,
                },
                OwnersService,
            ],
        }).compile();

        ownersService = module.get<OwnersService>(OwnersService);
        ownersController = module.get<OwnersController>(OwnersController);
    });

    describe('findAll', () => {
        it('should return an array of owners', async () => {
            const result = [
                new Owner(),
            ];
            jest.spyOn(ownersService, 'findAll').mockImplementation(async () => result);

            expect(await ownersController.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('should return an Owner', async () => {
            const result = new Owner();
            const ownerDto: OwnerDto = {
                name: 'pavel',
                purchaseDate: new Date('2019-10-15'),
                carId: '1',
            };

            jest.spyOn(ownersService, 'create').mockImplementation(async () => result);

            expect(await ownersController.create(ownerDto)).toBe(result);
        });
    });

    describe('delete', () => {
        it('should return deleted rows count', async () => {
            const result: number = 1;
            const ownerToDeleteId = '1';

            jest.spyOn(ownersService, 'delete').mockImplementation(async () => result);

            expect(await ownersController.delete(ownerToDeleteId)).toBe(result);
        });
    });
});