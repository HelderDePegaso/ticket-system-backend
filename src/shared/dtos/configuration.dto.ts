import { Type } from 'class-transformer';
import { IsInt, IsString, IsOptional, IsDateString, IsDate } from 'class-validator';

export class ConfigurationAttributes {
  @IsInt()
  id: number;

  @IsString()
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  main_admin: number;

    @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}
