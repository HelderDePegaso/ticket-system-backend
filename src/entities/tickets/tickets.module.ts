import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from 'src/entities/tickets/model/ticket.model';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { User } from '../users/model/user.model';
import { AreasService } from '../areas/areas.service';
import { UserArea } from 'src/shared/model/user-area.model';

@Module({
    imports: [ SequelizeModule.forFeature([Ticket]) , UsersModule],
    controllers: [TicketsController],
    providers: [TicketsService , AreasService] ,
    exports: []
})
export class TicketsModule {}
