import { Type } from 'class-transformer';
import { IsInt, IsString, IsUUID, IsIn, IsDateString, IsDate, IsOptional } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class UserDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  logon: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updated_at: Date;
}


// dto/safe-user.dto.ts
export class SafeUserDto {
  name: string;
  status: string;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<SafeUserDto>) {
    Object.assign(this, partial);
  }
}

export const userSensitiveFields = ['id', 'logon', 'password'] ;

  