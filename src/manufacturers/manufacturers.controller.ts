import { Controller, Body, Param, Get, Post, Delete, HttpException } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from './manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Controller('manufacturers')
export class ManufacturersController {
    constructor(
        private readonly manufacturersService: ManufacturersService,
    ) {}

    @Get()
    async findAll(): Promise<Manufacturer[]> {
        try {
            return await this.manufacturersService.findAll();
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Post()
    async create(@Body() createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
        try {
            return await this.manufacturersService.create(createManufacturerDto);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<number> {
        try {
            return await this.manufacturersService.delete({
                where: {id},
            });
        } catch(e) {
            throw new HttpException(e, 422);
        }
    }
}
