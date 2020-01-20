import { Controller, Body, Param, Get, Post, Put, Delete, HttpException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
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

    @Get(':id/manufacturer')
    async findManufacturer(@Param('id') id: string): Promise<Manufacturer> {
        try {
            return (await this.carsService.findOne(id, {
                include: [{model: Manufacturer}],
            })).manufacturer;
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Post()
    async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
        try {
            return await this.carsService.create(createCarDto);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Put()
    async update(@Body() updateCarDto: UpdateCarDto): Promise<[number, Car[]]> {
        try {
            return await this.carsService.update(updateCarDto, {
                where: {id: updateCarDto.id},
            });
        } catch(e) {
            throw new HttpException(e, 422);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<number> {
        try {
            return await this.carsService.delete({
                where: {id},
            });
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }
}
