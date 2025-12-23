import { Injectable } from '@nestjs/common';
import { AreaDto } from './dto/area.dto';
import { Area, AreaCreationAttributes } from './model/area.model'
import { InjectModel } from '@nestjs/sequelize';

import { omitFields } from 'src/utils/omitFields';

import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AreasService {

    private areaModel = Area

    constructor(
       
    ) {}

    async create(area: AreaCreationAttributes) {
        console.log("Dentro do create de area em AreasService")
        const theArea = {...area, uuid: uuidv4(), domain_id: 1}
        const areaCreated:Area = this.areaModel.build(theArea)
        //areaCreated.uuid = uuidv4()
        //areaCreated.domain_id = 1
        await areaCreated.save()
        return omitFields(areaCreated.dataValues, ["id", "domain_id", "super_area"])
    }

    async get(where: Partial<AreaDto>) {
       const r =  await this.areaModel.findOne({where})
       console.log("Areas found")
       console.log(r)
       return r
    }
}
