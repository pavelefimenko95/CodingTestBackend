import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { ownersProviders } from './owners.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [OwnersController],
    providers: ownersProviders,
})
export class OwnersModule {}
