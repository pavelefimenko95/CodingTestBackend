import { Injectable, Inject } from '@nestjs/common';
import { Car } from './car.entity';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarsService {
    constructor(
        @Inject('CARS_REPOSITORY') private readonly carsRepository: typeof Car,
    ) {}

    findAll(): Promise<Car[]> {
        return this.carsRepository.findAll<Car>();
    }

    findOne(id: string, options?): Promise<Car> {
        return this.carsRepository.findOne<Car>({
            where: {id},
            ...options,
        });
    }

    create(carDto: CarDto): Promise<Car> {
        return this.carsRepository.create<Car>(carDto);
    }

    update(carDto: CarDto): Promise<[number, Car[]]> {
        return this.carsRepository.update(carDto, {
            where: {id: carDto.id},
        });
    }

    delete(id: string): Promise<number> {
        return this.carsRepository.destroy({
            where: {id},
        });
    }
}