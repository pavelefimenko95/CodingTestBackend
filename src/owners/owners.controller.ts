import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { OwnerDto } from './dto/owner.dto';
import { OwnersService } from './owners.service';
import { Owner } from './owner.entity';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}
    @Get()
    findAll(): Promise<Owner[]> {
        return this.ownersService.findAll();
    }

    @Post()
    create(@Body() ownerDto: OwnerDto): Promise<Owner> {
        return this.ownersService.create(ownerDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.ownersService.delete(id);
    }
}
