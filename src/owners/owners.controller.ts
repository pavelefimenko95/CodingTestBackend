import { Controller, Body, Param, Get, Post, Delete, HttpException } from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
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
    async create(@Body() ownerDto: OwnerDto): Promise<Owner> {
        try {
            return await this.ownersService.create(ownerDto);
        } catch (e) {
            throw new HttpException(e, 422);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.ownersService.delete({
                where: {id},
            });
        } catch(e) {
            throw new HttpException(e, 422);
        }
    }
}
