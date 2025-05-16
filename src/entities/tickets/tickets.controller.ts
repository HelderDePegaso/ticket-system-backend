import { Controller, Get, Param } from '@nestjs/common';

@Controller('tickets')
export class TicketsController {
    
    @Get(':id') 
    getTicket(@Param("uuid") uuid: string) {
        
    }
}
