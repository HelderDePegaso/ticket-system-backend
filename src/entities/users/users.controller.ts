import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Param } from '@nestjs/common';
import { Request } from 'express'; 
import { UsersService } from './users.service';
import { UserDto as UserAttributes  } from './dto/user.dto';
import { ROLE, ROLES , getRoleByName } from 'src/essentials/essentials';
import { UserAreaService } from '../../shared/service/user-area/user-area.service';
import { UserArea } from '../../shared/model/user-area.model';
import { UserCreationAttributes } from './model/user.model';

import { Promotion } from '../../shared/model/promotion.model';
import { omitFields } from 'src/utils/omitFields';
import { UserAreaDto } from '../../shared/dtos/user-area-dto';

@Controller('users')
export class UsersController {

    

    
    constructor(private usersService: UsersService, private userAreaService: UserAreaService) {}

    @Get("mydata")
    getLoadedUserData(req: Request) {
        return this.usersService.get({uuid: ( req as any )?.appExtended.user.uuid});
    }

    @Get("all")
    getAllUsers() {
        return this.usersService.findAll();
    }

    @Get(":id")
    get(@Param("id") param: Partial<UserAttributes>) {
        

        const uuid: string | undefined = param.uuid;

        if (!uuid) {
            throw new HttpException(`User not provided`, HttpStatus.NOT_FOUND);
        }

        return this.usersService.get({uuid: uuid});
    }
    
    @Post("create")
    create(@Body() body: UserCreationAttributes  ) {
        console.log("O Boky -> ")
        console.log(body); 
        return this.usersService.create(body);

    }

    @Put("update")
    update(@Body() body: UserAttributes) {
        return this.usersService.update(body);
    }

    @Delete("delete")
    delete(@Body() body: Pick<UserAttributes, 'uuid'>) {
        return this.usersService.delete(body);
    }

    @Post("addInArea")
    async addInArea(@Body() body: any) {
        const userUUID = body.userUUID 
        const areaUUID = body.areaUUID
        const role = body.role

        const acceptedRole:ROLE | null = getRoleByName(role)
        
        console.log(this.userAreaService)
        console.log(userUUID && areaUUID && role)

        
        
        if (userUUID && areaUUID) {
            const userAreaOrNulL: UserArea | null =  await this.userAreaService.addUserToArea(userUUID, areaUUID);

            console.log("userAreaOrNulL")
            console.log(userAreaOrNulL?.dataValues)
            if (userAreaOrNulL == null) {
                return "User or area not found";
            } else {
                if (!acceptedRole) return userAreaOrNulL
                const promotion : Promotion | null = await this.usersService.promoteUser( userAreaOrNulL , acceptedRole)
                
                if (!promotion) return userAreaOrNulL

                const safeUserArea:Partial<UserAreaDto> = omitFields(userAreaOrNulL.dataValues, ['id', 'created_at', 'updated_at'])
                const safePromotion:Partial<Promotion> = omitFields(promotion.dataValues, ['id', 'created_at', 'updated_at'])
                
                return { userArea: safeUserArea , safePromotion};
                
            }
        }

        
    }

    @Delete("removeFromArea")
    async removeFromArea(@Body() body: any) {
        const userUUID = body.userUUID
        const areaUUID = body.areaUUID

        if (userUUID && areaUUID) {
            const userAreaOrNulL: any  =  await this.userAreaService.removeUserFromArea(userUUID, areaUUID);

            
            
            console.log(userAreaOrNulL)

            if (userAreaOrNulL == null) {
                return new HttpException("User or area not found", HttpStatus.NOT_FOUND); ;
            } else {
                return userAreaOrNulL;
                
            }
        }
        
    }
}
