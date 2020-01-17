import { Module } from '@nestjs/common';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import { manufacturersProviders } from './manufacturers.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ManufacturersController],
    providers: [
        ManufacturersService,
        ...manufacturersProviders,
    ],
})

export class ManufacturersModule {}
