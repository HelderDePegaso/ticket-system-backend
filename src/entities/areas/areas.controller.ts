import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query } from '@nestjs/common';
import { AreaDto } from './dto/area.dto';
import { AreasService } from './areas.service';
import { omitFields } from 'src/utils/util';

@Controller('areas')
export class AreasController {

    constructor(@Inject(AreasService) private areasService: AreasService) {
        
    }

    @Post("create")
    public create(@Body() area: AreaDto) {
        console.log("Começar a criar")
        console.log(area)
        return this.areasService.create(area)
    }

    @Get(":id")
    async getAnArea(@Param("id") uuid: string) {
        
        //const uuid: string | undefined = uuid;
        
        if (!uuid) {
            throw new HttpException(`Area not provided`, HttpStatus.BAD_REQUEST);
        }

        const area = await this.areasService.get({uuid})

        if (!area) return new HttpException(`Area ${uuid} not found`, HttpStatus.NOT_FOUND)

        return area
    }
}
