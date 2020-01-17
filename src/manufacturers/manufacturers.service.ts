import { Injectable, Inject } from '@nestjs/common';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerDto } from './dto/manufacturer.dto';

@Injectable()
export class ManufacturersService {
    constructor(
        @Inject('MANUFACTURERS_REPOSITORY') private readonly manufacturersRepository: typeof Manufacturer,
    ) {}

    findAll(): Promise<Manufacturer[]> {
        return this.manufacturersRepository.findAll<Manufacturer>();
    }

    create(manufacturerDto: ManufacturerDto): Promise<Manufacturer> {
        return this.manufacturersRepository.create<Manufacturer>(manufacturerDto);
    }

    delete(id: string): Promise<number> {
        return this.manufacturersRepository.destroy({
            where: {id},
        });
    }
}
