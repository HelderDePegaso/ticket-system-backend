import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TicketDto } from './dto/ticket.dto';
import { Ticket, TicketCreationAttributes } from 'src/entities/tickets/model/ticket.model';
import { getModelToken, InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid'
import { ModuleRef } from '@nestjs/core';
import { User } from '../users/model/user.model';
import { UsersService } from '../users/users.service';
import { Area } from '../areas/model/area.model';
import { UserArea } from 'src/shared/model/user-area.model';

import { fn, col, literal, Op } from 'sequelize'
import { formatSQLDateUTC } from 'src/utils/format-sqldate-utc';

@Injectable()
export class TicketsService implements OnModuleInit {




    private ticketModel: typeof Ticket;
    private userModel: typeof User

    constructor(
        //@Inject(getModelToken(Ticket)) private ticketModel: typeof Ticket,
        private moduleRef: ModuleRef,

    ) {

    }

    onModuleInit() {
        this.ticketModel = this.moduleRef.get(getModelToken(Ticket), { strict: false });
        this.userModel = this.moduleRef.get(getModelToken(User), { strict: false });

        console.log("this.ticketModel")
        console.log(this.ticketModel)
    }

    async get(where: Partial<TicketDto>) {
        return await this.ticketModel.findOne({ where })
    }

    async create(ticket: Partial<TicketDto>) {
        const builtTicket = this.ticketModel.build({ ...(ticket as TicketCreationAttributes), uuid: uuidv4() } as TicketCreationAttributes);
        console.log("buitTicket")
        console.log(builtTicket)
        return await builtTicket.save()
    }


    getUserAreaTickets() {
        throw new Error('Method not implemented.');
    }
    async getAreaTickets(userId: number) {
        try {

            const tickets = await this.ticketModel.findAll({
                include: [
                    {
                        model: Area,
                        attributes: ['id', 'name', 'uuid'],
                        include: [
                            {
                                model: UserArea,
                                attributes: [],
                                where: { user_id: userId } // filtra apenas áreas onde o usuário está
                            }
                        ]
                    },
                    {
                        model: User, // requester
                        as: 'requester',
                        attributes: ['id', 'uuid', 'name', 'email']
                    },
                    {
                        model: User, // technician
                        as: 'technician',
                        attributes: ['id', 'uuid', 'name', 'email']
                    }
                ]
            });

            return tickets
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    async getUserTickets(userId: number, lastModified: number = 0 /** timestamp */) {
        try {

            const ticketWhere = (lastModified > 0) ? { updated_at: { [Op.gt]: formatSQLDateUTC(lastModified) } } : {};

            const tickets = await this.ticketModel.findAll({
                where: ticketWhere,
                attributes: [
                    'uuid',
                    'title',
                    'status',
                    [fn('UNIX_TIMESTAMP', col('Ticket.created_at')), 'created_at_unix'],
                    [fn('UNIX_TIMESTAMP', col('Ticket.updated_at')), 'updated_at_unix'],
                ],
                include: [
                    {
                        model: Area,
                        required: true,
                        attributes: ['name', 'uuid'],
                        include: [
                            {
                                model: UserArea,
                                required: true,
                                attributes: [],
                                where: { user_id: userId }
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'requester',
                        attributes: ['uuid', 'name', ['logon', 'email']]
                    },
                    {
                        model: User,
                        as: 'technician',
                        attributes: ['uuid', ['logon', 'email']]
                    }
                ]
            });

            return tickets
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
