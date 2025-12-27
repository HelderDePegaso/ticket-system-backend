import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  IsJSON,
  IsArray,
  ValidateNested,
} from 'class-validator';


export class TicketSimpleDto {
  
  @IsString()
  title: string

  @IsString()
  description: string

  @IsUUID()
  areaUuid: string

  @IsOptional()
  @IsString()
  relatedDate: string
}
