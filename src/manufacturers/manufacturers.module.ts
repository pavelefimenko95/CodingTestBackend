import { Module } from '@nestjs/common';
import { ManufacturersController } from './manufacturers.controller';
import { manufacturersProviders } from './manufacturers.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ManufacturersController],
    providers: manufacturersProviders,
})

export class ManufacturersModule {}
