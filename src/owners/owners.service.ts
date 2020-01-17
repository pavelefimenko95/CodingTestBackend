import { Injectable, Inject } from '@nestjs/common';
import { Owner } from './owner.entity';
import { OwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnersService {
    constructor(
        @Inject('OWNERS_REPOSITORY') private readonly ownersRepository: typeof Owner,
    ) {}

    findAll(): Promise<Owner[]> {
        return this.ownersRepository.findAll<Owner>();
    }

    create(ownerDto: OwnerDto): Promise<Owner> {
        return this.ownersRepository.create<Owner>(ownerDto);
    }

    delete(id: string): Promise<number> {
        return this.ownersRepository.destroy({
            where: {id},
        });
    }
}