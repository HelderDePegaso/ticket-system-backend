export interface UserDto {
    id: number;
    name: string;
    logon: string;
    password: string;
    uuid: string;
    status: 'active' | 'inactive';
    created_at: Date;
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

  