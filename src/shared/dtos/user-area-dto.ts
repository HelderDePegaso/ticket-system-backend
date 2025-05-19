




import { Type } from 'class-transformer';
import { IsInt, IsUUID, IsDateString, IsDate } from 'class-validator';

export class UserAreaDto {
  @IsInt()
  id: number;

  @IsInt()
  user_id: number;

  @IsInt()
  area_id: number;

  @IsUUID()
  uuid: string;

  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}


