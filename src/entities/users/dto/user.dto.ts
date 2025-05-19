import { Type } from 'class-transformer';
import { IsInt, IsString, IsUUID, IsIn, IsDateString, IsDate } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  logon: string;

  @IsString()
  password: string;

  @IsUUID()
  uuid: string;

  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

    @Type(() => Date)
  @IsDate()
  created_at: Date;

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

  