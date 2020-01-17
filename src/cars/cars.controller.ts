import { Controller, Body, Param, Get, Post, Delete, HttpException } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}
    @Get()
    async findAll(): Promise<Car[]> {
        try {
            return await this.carsService.findAll();
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Car> {
        try {
            return await this.carsService.findOne(id);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Post()
    async create(@Body() carDto: CarDto): Promise<Car> {
        try {
            return await this.carsService.create(carDto);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<number> {
        try {
            return await this.carsService.delete(id);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }
}
