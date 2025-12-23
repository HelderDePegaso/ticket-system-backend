import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Query, Req } from '@nestjs/common';
import { AreaDto } from './dto/area.dto';
import { AreasService } from './areas.service';
import { omitFields } from 'src/utils/util';
import { UserAreaService } from 'src/shared/service/user-area/user-area.service';

@Controller('areas')
export class AreasController {

    constructor(@Inject(AreasService) private areasService: AreasService , private userAreaService: UserAreaService) {
        
    }

    @Post("create")
    public create(@Body() area: AreaDto) {
        console.log("Começar a criar")
        console.log(area)
        return this.areasService.create(area)
    }

    @Get(":id")
    async getAnArea(@Param("id") uuid: string) {
        console.log("Começar a buscar area")    
        //const uuid: string | undefined = uuid;
        
        if (!uuid) {
            throw new HttpException(`Area id not provided`, HttpStatus.BAD_REQUEST);
        }

        const area = await this.areasService.get({uuid})

        
        if (!area) return new HttpException(`Area ${uuid} not found`, HttpStatus.NOT_FOUND)

        let safeArea = omitFields(area.dataValues, ["id", "domain_id", "super_area"])

        

        return safeArea
    }

    
}
