import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { DatabaseModule } from '../database/database.module';
import { actionsProviders } from './actions.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ActionsController],
    providers: actionsProviders,
})
export class ActionsModule {}
