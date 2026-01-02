import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class LastModifiedHttpParam {
    @IsOptional()
    @Type(()  => Number)
    @IsNumber()
    lastModified: number;
}