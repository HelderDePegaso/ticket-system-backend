import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { User } from 'src/entities/users/model/user.model';
import { Area } from 'src/entities/areas/model/area.model';
import { Optional } from 'sequelize';

import { TicketDto as TicketAttributes } from '../dto/ticket.dto';


export type TicketCreationAttributes = Optional<
  TicketAttributes, 'id' | 'uuid' | 'status' | 'created_at' | 'updated_at'>;
@Table({
  tableName: 'tickets',
  timestamps: true,
})
export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(36),
    unique: true,
  })
  uuid: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  requester_id: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  technician_id?: number;

  @ForeignKey(() => Area)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  area_id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT('long'),
    get() {
      const raw = this.getDataValue('attachments');
      return raw ? JSON.parse(raw) : null;
    },
    set(value: any) {
      this.setDataValue('attachments', JSON.stringify(value));
    },
  })
  attachments?: any;

  
  @AllowNull(false)
  @Default('open')
  @Column(DataType.ENUM('open', 'closed', 'in_progress', 'pending', 'escalated', 'cancelled', 'seen', 'resolved'))
  status: 'open' | 'closed' | 'in_progress' | 'pending' | 'escalated' | 'cancelled' | 'seen' | 'resolved';
  
  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @BelongsTo(() => User, 'requester_id')
  requester: User;

  @BelongsTo(() => User, 'technician_id')
  technician: User;

  @BelongsTo(() => Area, 'area_id')
  area: Area;

  @BeforeCreate
  static generateUuid(instance: Ticket) {
    instance.uuid = uuidv4();
  }
}
