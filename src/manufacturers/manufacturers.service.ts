import { Injectable, Inject } from '@nestjs/common';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerDto } from './dto/manufacturer.dto';
import { MANUFACTURERS_REPOSITORY } from '../constants/database';

@Injectable()
export class ManufacturersService {
    constructor(
        @Inject(MANUFACTURERS_REPOSITORY) private readonly manufacturersRepository: typeof Manufacturer,
    ) {}

    findAll(options?: object): Promise<Manufacturer[]> {
        return this.manufacturersRepository.findAll<Manufacturer>(options);
    }

    create(manufacturerDto: ManufacturerDto): Promise<Manufacturer> {
        return this.manufacturersRepository.create<Manufacturer>(manufacturerDto);
    }

    delete(options: object): Promise<number> {
        return this.manufacturersRepository.destroy(options);
    }
}
