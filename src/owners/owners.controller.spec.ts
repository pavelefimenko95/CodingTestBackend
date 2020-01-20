import { Test } from '@nestjs/testing';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { Owner } from './owner.entity';
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
});