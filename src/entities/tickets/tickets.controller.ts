import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Req } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { TicketsService } from './tickets.service';
import { omitFields } from 'src/utils/util';
import { Ticket } from './model/ticket.model';
import { TicketSimpleDto } from './dto/ticket.simple.dto';
import { UsersService } from '../users/users.service';
import { AreasService } from '../areas/areas.service';

@Controller('tickets')
export class TicketsController {

    constructor( private ticketService: TicketsService , private userService: UsersService , private areaService: AreasService) {

    }
    
    @Get(':id') 
    async getTicket(@Param("uuid") uuid: string) {
        const ticket:Ticket | null = await this.ticketService.get({uuid: uuid})

        if (ticket == null) 
            return new HttpException("Ticket not found", HttpStatus.NOT_FOUND)

        return omitFields(ticket.dataValues, ["id", "area_id"])
    }

    @Post('create')
    async createATicket(@Req() req: any, @Body()ticket: TicketSimpleDto) {
        console.log("Creating a ticket")
        console.log(req.user)
        console.log(ticket)
        

        const requester_id: number | undefined = await this.userService.getUserId(req.user.uuid)
        const area_id: number | undefined = await this.areaService.getAreaId(ticket.areaUuid)
        if (!requester_id) throw new HttpException(`User id not found`, HttpStatus.INTERNAL_SERVER_ERROR);
        if (!area_id)  throw new HttpException(`Area id not found`, HttpStatus.INTERNAL_SERVER_ERROR);

        const newTicket: Partial<TicketDto> = {
            requester_id: requester_id, 
            area_id ,
            title: ticket.title,
            description: ticket.description, 
            status: "open"
        }
        console.log("newTicket")
        console.log(newTicket)
        return await this.ticketService.create(newTicket)

        
    }
} 
