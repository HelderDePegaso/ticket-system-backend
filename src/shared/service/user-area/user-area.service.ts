import { Inject, Injectable } from '@nestjs/common';
import { Area } from 'src/entities/areas/model/area.model';
import { User } from 'src/entities/users/model/user.model';
import { UserArea } from 'src/shared/model/user-area.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/entities/users/users.service';
import { AreasService } from 'src/entities/areas/areas.service';


import { v4 as uuidv4 } from 'uuid';
import { Promotion } from 'src/shared/model/promotion.model';
import { Role } from 'src/shared/model/role.model';
import { Op } from 'sequelize';
import { formatSQLDateUTC } from 'src/utils/util';

@Injectable()
export class UserAreaService {


    //@InjectModel(UserArea) private userArea : UserArea;
    private userArea: typeof UserArea

    constructor(private userService: UsersService, private areaService: AreasService) { }



    async addUserToArea(userModelOrUuid: User | string, areaModelOrUuid: Area | string) {
        const loadedUser: User | null = userModelOrUuid instanceof User ? userModelOrUuid : await this.userService.get({ uuid: userModelOrUuid });
        const loadedArea: Area | null = areaModelOrUuid instanceof Area ? areaModelOrUuid : await this.areaService.get({ uuid: areaModelOrUuid })

        if (!loadedUser || !loadedArea) {
            return null;
        }
        console.log("Vssssssss");
        return await UserArea.create({ user_id: loadedUser.id, area_id: loadedArea.id, uuid: uuidv4() })


    }

    async removeUserFromArea(userModelOrUuid: User | string, areaModelOrUuid: Area | string) {
        try {
            const loadedUser: User | null = userModelOrUuid instanceof User ? userModelOrUuid : await this.userService.get({ uuid: userModelOrUuid });
            const loadedArea: Area | null = areaModelOrUuid instanceof Area ? areaModelOrUuid : await this.areaService.get({ uuid: areaModelOrUuid })

            console.log("loadeds")
            console.log(loadedUser)
            console.log(loadedArea)

            if (!loadedUser || !loadedArea) {
                return null;
            }

            const userArea = await this.get({ user_id: loadedUser.id, area_id: loadedArea.id })

            console.log("What was deleted")
            console.log(userArea)


            return await userArea?.destroy();

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async get(where: Partial<UserArea>) {
        console.log(this.userArea)
        return await UserArea.findOne({ where })
    }

    async getAllUserAreas(userId: number, lastModified: number = 0 /** timestamp */) {
        
        const areaWhere = { updated_at: { [Op.gt]: formatSQLDateUTC(lastModified) } };
        const area: any = {
            model: Area,
            attributes: ["uuid", "name", "abbrev", "status", "domain_id"]
        }

        if (lastModified > 0) area.where = areaWhere
        
        return await UserArea.findAll({
            attributes: ['uuid'],
            where: {
                user_id: userId
            },

            include: [

                area,


                {
                    model: Promotion,
                    attributes: ["role_id", "valid_until"],
                    include: [
                        {
                            model: Role,
                            attributes: ["name"]
                        }
                    ]
                }
            ]
        })
    }
}
