import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsIn, IsDateString, IsDate } from 'class-validator';

export class PromotionDto {
  @IsInt()
  id: number;

  @IsInt()
  role_id: number;

  @IsInt()
  user_area_id: number;

  @IsOptional()
  @IsDateString()
  valid_from?: string;

  @IsOptional()
  @IsDateString()
  valid_until?: string;

  @IsIn(['active', 'expired', 'disabled'])
  status: 'active' | 'expired' | 'disabled';

    @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}
