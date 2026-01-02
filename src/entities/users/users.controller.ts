import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Param, ParseIntPipe, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express'; 
import { UsersService } from './users.service';
import { UserDto as UserAttributes, UserDto  } from './dto/user.dto';
import { ROLE, ROLES , getRoleByName } from 'src/utils/role-logic';
import { UserAreaService } from '../../shared/service/user-area/user-area.service';
import { UserArea } from '../../shared/model/user-area.model';
import { User, UserCreationAttributes } from './model/user.model';

import { Promotion } from '../../shared/model/promotion.model';
import { omitFields } from 'src/utils/omitFields';
import { UserInAreaRepresentationDto, UserAreaDto } from '../../shared/dtos/user-area-dto';


import { RolesGuard } from 'src/common/guards/roles.guard';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/model/area.model';
import { changeFieldName } from 'src/utils/util';
import { MyAreaDto } from './dto/my-area.dto';
import { last } from 'rxjs';
import { LastModifiedHttpParam } from 'src/common/type/last-modified.http.param';
import { AppResponseObject } from 'src/common/type/app-response-object';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {

    

    
    constructor(private usersService: UsersService, private userAreaService: UserAreaService , private areaService: AreasService) {}

    @Get("mydata")
    async getLoadedUserData(@Req()  req: Request) { 
        console.log("Reading user data")
        const myData = await this.usersService.get({uuid: ( req as any )?.user.uuid});

        if (!myData) return new HttpException(`User data not found`, HttpStatus.NOT_FOUND);

        return  changeFieldName(omitFields(myData.dataValues , ["password", "id"]) , "logon", "email")
    }

    @Get("all")
    getAllUsers() {
        return this.usersService.findAll();
    }

    @Get("my-areas")
    async getMyAreas(@Req() req : any) {
        console.log("Começar a buscar area")
        console.log(req.user)
        const userId  = await this.usersService.getUserId(req.user.uuid);
        if (!userId) return new HttpException(`User id not found`, HttpStatus.NOT_FOUND);

        const allUserAreas =  await this.userAreaService.getAllUserAreas(userId);
        
        console.log(allUserAreas);
        const mapped = await mappedReturn(allUserAreas)

        return mapped

        async function mappedReturn(allUserAreas: any[]) : Promise<MyAreaDto[]> {
            return allUserAreas.map(ua => {
                const area = (ua.dataValues as any).area;
                const promotions = (ua.dataValues as any).promotions
                const role =( promotions[0].dataValues  as any).role
                
                return Object.assign(
                    {} , 
                    area.dataValues , 
                    {function: role.dataValues.name} , 
                    {valid_until: promotions[0].dataValues.valid_until })
            })//.filter(Boolean)
        }
    }


    @Get("areas")
    async getMyAreasMock(@Req() req : any  , @Query() lastModified : LastModifiedHttpParam) {
        debugger
        console.log("Começar a buscar area")
        console.log(req.user)
        const userId  = await this.usersService.getUserId(req.user.uuid);
        if (!userId) return new HttpException(`User id not found`, HttpStatus.NOT_FOUND);

        const allUserAreas =  await this.userAreaService.getAllUserAreas(userId, lastModified.lastModified);
        
        console.log(allUserAreas);
        const mapped = await mappedReturn(allUserAreas)

        return {statusCode: 200 , data: {areas: mapped}, message: "OK"} as AppResponseObject<MyAreaDto[]>

        async function mappedReturn(allUserAreas: any[]) : Promise<MyAreaDto[]> {
            return allUserAreas.map(ua => {
                const area = (ua.dataValues as any).area;
                const promotions = (ua.dataValues as any).promotions
                const role = (promotions.length == 0) ? null : ( promotions[0].dataValues  as any).role
                
                return Object.assign(
                    {} , 
                    area.dataValues , 
                    {function: (role) ? role.dataValues.name : "N/A"} , 
                    {valid_until: (promotions.length > 0) ? promotions[0].dataValues.valid_until : "N/A" })
            })//.filter(Boolean)
        }
    }

    @Get(":uuid")
    async get(@Param("uuid", ParseUUIDPipe) param: Partial<UserAttributes>) {
        
        const uuid: any = (param as string ) ; 
        
        if (!uuid) {
            throw new HttpException(`User uuid not provided`, HttpStatus.NOT_FOUND);
        }

        const user:User | null = await this.usersService.get({uuid: uuid}); 

        if (!user) {
            throw new HttpException(`User ${uuid} not found`, HttpStatus.NOT_FOUND);
        }
        
        return omitFields(user.dataValues, ["password", "id"]);
    }
    
    @RolesDecorator([ROLES.ADMIN, ROLES.TECNITION])
    @Post("create")
    async create(@Body() body: UserDto  ) {
        console.log("O Boky -> ")
        console.log(body); 
        const user: User | null = await this.usersService.create(body);

        if(!user) {
            throw new HttpException(`User not created`, HttpStatus.NOT_FOUND);
        }
        
        return omitFields(user.dataValues, ["password", "id"]);

    }

    @Put("update")
    update(@Body() body: UserAttributes) {
        return this.usersService.update(body);
    }

    @Delete("delete")
    delete(@Body() body: Pick<UserAttributes, 'uuid'>) {
        return this.usersService.delete(body);
    }

    @Delete(":uuid")
    async deleteWithUUID(@Param("uuid", ParseUUIDPipe) param: string) {
        console.log("Param -> ")
        console.log(param);
        let userDto = new UserDto();
        userDto.uuid = param
        let rtn: number | null =  await this.usersService.delete(userDto);

        
        if (rtn == 0) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        } else if (rtn == null) {
            throw new HttpException(`There's a conflict`, HttpStatus.CONFLICT);
        }
        
        return    {
            status: 200,
            message: `User ${param} deleted`
        }    

    }

    @Post("addInArea")
    async addInArea(@Body() body: UserInAreaRepresentationDto) {
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
    async removeFromArea(@Body() body: UserInAreaRepresentationDto) {
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
