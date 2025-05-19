import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    
    @IsString()
    @IsNotEmpty()
    logon: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}