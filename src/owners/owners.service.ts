import { Injectable, Inject } from '@nestjs/common';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OWNERS_REPOSITORY } from '../constants/database';

@Injectable()
export class OwnersService {
    constructor(
        @Inject(OWNERS_REPOSITORY) private readonly ownersRepository: typeof Owner,
    ) {}

    findAll(options?: object): Promise<Owner[]> {
        return this.ownersRepository.findAll<Owner>(options);
    }

    create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.ownersRepository.create<Owner>(createOwnerDto);
    }

    delete(options: object): Promise<number> {
        return this.ownersRepository.destroy(options);
    }
}