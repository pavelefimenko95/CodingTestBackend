import { Injectable, Inject } from '@nestjs/common';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CARS_REPOSITORY } from '../constants/database';

@Injectable()
export class CarsService {
    constructor(
        @Inject(CARS_REPOSITORY) private readonly carsRepository: typeof Car,
    ) {}

    findAll(options?: object): Promise<Car[]> {
        return this.carsRepository.findAll<Car>(options);
    }

    findOne(id: string, options?): Promise<Car> {
        return this.carsRepository.findOne<Car>({
            where: {id},
            ...options,
        });
    }

    create(createCarDto: CreateCarDto): Promise<Car> {
        return this.carsRepository.create<Car>(createCarDto);
    }

    update(updateCarDto: UpdateCarDto, options): Promise<[number, Car[]]> {
        return this.carsRepository.update(updateCarDto, options);
    }

    delete(options: object): Promise<number> {
        return this.carsRepository.destroy(options);
    }
}