import { Type } from 'class-transformer';
import {  IsString, IsNotEmpty , IsNumber , IsUUID , IsOptional, IsDate  , IsDateString} from 'class-validator';
import { Is } from 'sequelize-typescript';


export class AreaDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    status: 'active' | 'inactive';

    @IsNumber()
    @IsNotEmpty()
    domain_id: number;

    @IsUUID()
    uuid: string; 

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    created_at: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    updated_at: Date;
    
    @IsOptional()
    @IsNumber()
    super_area: number;
}