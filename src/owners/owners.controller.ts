import { Controller, Body, Param, Get, Post, Delete, HttpException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnersService } from './owners.service';
import { Owner } from './owner.entity';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}
    @Get()
    async findAll(): Promise<Owner[]> {
        try {
            return await this.ownersService.findAll();
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Post()
    async create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
        try {
            return await this.ownersService.create(createOwnerDto);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<number> {
        try {
            return await this.ownersService.delete({
                where: {id},
            });
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }
}
