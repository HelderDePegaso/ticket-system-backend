import { Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { TicketsService } from './tickets.service';
import { omitFields } from 'src/utils/util';
import { Ticket } from './model/ticket.model';

@Controller('tickets')
export class TicketsController {

    constructor( private ticketService: TicketsService) {

    }
    
    @Get(':id') 
    async getTicket(@Param("uuid") uuid: string) {
        const ticket:Ticket | null = await this.ticketService.get({uuid: uuid})

        if (ticket == null) 
            return new HttpException("Ticket not found", HttpStatus.NOT_FOUND)

        return omitFields(ticket.dataValues, ["id", "area_id"])
    }

    @Post('create')
    createATicket(ticket: TicketDto) {
        this.ticketService.create(ticket)
    }
}
