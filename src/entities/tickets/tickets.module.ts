import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './model/ticket.model';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [Ticket],
    controllers: [TicketsController],
    providers: [TicketsService, Ticket] 
})
export class TicketsModule {}
