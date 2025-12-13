import { Inject, Injectable } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Ticket } from './model/ticket.model';
import { getModelToken, InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TicketsService {

    
    
    private readonly ticketModel: typeof Ticket
    
    async get(where: Partial<TicketDto>) {
        return await this.ticketModel.findOne({where})
    }

    async create(ticket: TicketDto) {
        await this.ticketModel.create(ticket)
    }
}
