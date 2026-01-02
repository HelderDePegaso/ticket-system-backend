import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query, Req } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { TicketsService } from './tickets.service';
import { omitFields } from 'src/utils/util';
import { Ticket } from './model/ticket.model';
import { TicketSimpleDto } from './dto/ticket.simple.dto';
import { UsersService } from '../users/users.service';
import { AreasService } from '../areas/areas.service';
import { LastModifiedHttpParam } from 'src/common/type/last-modified.http.param';

@Controller('tickets')
export class TicketsController {

    constructor( private ticketService: TicketsService , private userService: UsersService , private areaService: AreasService) {

    }


    @Get('user_tickets')
    async getAllTickets(@Req() req: any, @Query() lastModified : LastModifiedHttpParam) {
        const requester_uuid: string | undefined = req.user.uuid;
        if (!requester_uuid) throw new HttpException(`User uuid not found. Try logging again`, HttpStatus.INTERNAL_SERVER_ERROR);
        const requester_id: number | undefined = await this.userService.getUserId(requester_uuid);
        if (!requester_id) throw new HttpException(`User id not found`, HttpStatus.INTERNAL_SERVER_ERROR);
        console.log("Requester id -> " + requester_id);
        return {
            statusCode: 200,
            message: "Tickets found",
            data:  await this.ticketService.getUserTickets(requester_id)
        }
    }

    @Get('user_area_tickets')
    async getUserAreaTickets() {
        return await this.ticketService.getUserAreaTickets()
    }

    @Get('area_tickets')
    async getAreaTickets(@Req() req: any) {
        const requester_uuid: string | undefined = req.user.uuid;
        if (!requester_uuid) throw new HttpException(`User uuid not found. Try logging again`, HttpStatus.INTERNAL_SERVER_ERROR);
        const requester_id: number | undefined = await this.userService.getUserId(requester_uuid);
        if (!requester_id) throw new HttpException(`User id not found`, HttpStatus.INTERNAL_SERVER_ERROR);
        return await this.ticketService.getAreaTickets(requester_id)
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
