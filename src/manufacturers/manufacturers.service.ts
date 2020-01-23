import { Injectable, Inject } from '@nestjs/common';
import { Manufacturer } from './manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { MANUFACTURERS_REPOSITORY } from '../constants/database';

@Injectable()
export class ManufacturersService {
    constructor(
        @Inject(MANUFACTURERS_REPOSITORY) private readonly manufacturersRepository: typeof Manufacturer,
    ) {}

    findAll(options?: object): Promise<Manufacturer[]> {
        return this.manufacturersRepository.findAll<Manufacturer>(options);
    }

    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
        return this.manufacturersRepository.create<Manufacturer>(createManufacturerDto);
    }

    delete(options: object): Promise<number> {
        return this.manufacturersRepository.destroy(options);
    }
}
