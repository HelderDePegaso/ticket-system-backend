import { Type } from 'class-transformer';
import { IsInt, IsString, IsIn, IsDateString, IsDate } from 'class-validator';

export class RoleDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}
