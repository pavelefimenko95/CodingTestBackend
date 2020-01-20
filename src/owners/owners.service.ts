import { Injectable, Inject } from '@nestjs/common';
import { Owner } from './owner.entity';
import { OwnerDto } from './dto/owner.dto';
import { OWNERS_REPOSITORY } from '../constants/database';

@Injectable()
export class OwnersService {
    constructor(
        @Inject(OWNERS_REPOSITORY) private readonly ownersRepository: typeof Owner,
    ) {}

    findAll(options?: object): Promise<Owner[]> {
        return this.ownersRepository.findAll<Owner>(options);
    }

    create(ownerDto: OwnerDto): Promise<Owner> {
        return this.ownersRepository.create<Owner>(ownerDto);
    }

    delete(options: object): Promise<number> {
        return this.ownersRepository.destroy(options);
    }
}