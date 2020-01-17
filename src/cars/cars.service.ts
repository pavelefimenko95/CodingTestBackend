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

    findOne(id: string): Promise<Car> {
        return this.carsRepository.findOne<Car>({
            where: {id},
        });
    }

    create(carDto: CarDto): Promise<Car> {
        return this.carsRepository.create<Car>(carDto);
    }

    delete(id: string): Promise<number> {
        return this.carsRepository.destroy({
            where: {id},
        });
    }
}