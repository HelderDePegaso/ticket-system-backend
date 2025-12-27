import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Ticket, TicketCreationAttributes } from 'src/entities/tickets/model/ticket.model';
import { getModelToken, InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid'
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class TicketsService implements OnModuleInit {

    
    
    private ticketModel: typeof Ticket;
    
    constructor(
        //@Inject(getModelToken(Ticket)) private ticketModel: typeof Ticket,
        private moduleRef: ModuleRef
    ) {
        
    }

    onModuleInit() {
        this.ticketModel = this.moduleRef.get(getModelToken(Ticket), { strict: false });

        console.log("this.ticketModel")
        console.log(this.ticketModel)
    }

    async get(where: Partial<TicketDto>) {
        return await this.ticketModel.findOne({where})
    }

    async create(ticket: Partial<TicketDto>) {
        const builtTicket = this.ticketModel.build({...(ticket as TicketCreationAttributes) , uuid: uuidv4()} as TicketCreationAttributes);
        console.log("buitTicket")
        console.log(builtTicket)
        return await builtTicket.save()
    }
}
