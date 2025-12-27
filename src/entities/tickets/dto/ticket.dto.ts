import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  IsJSON,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsIn } from 'sequelize-typescript';

export class TicketDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsInt()
  requester_id: number;

  @IsOptional()
  @IsInt()
  technician_id: number;

  @IsInt()
  area_id: number;

  @IsString()
  title: string;

  
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  attachments: any[];

  @IsString()
  status: 'open' | 'closed' | 'in_progress' | 'pending' | 'escalated' | 'cancelled' | 'seen' | 'resolved';

  @IsOptional()
  created_at: Date;

  @IsOptional()
  updated_at: Date;
}
