import { Inject, Injectable } from '@nestjs/common';
//
import * as Sequelize from 'sequelize'; // ✅ CORRETO

import { InjectModel } from '@nestjs/sequelize';

import { LoginDto } from '../auth/dto/LoginDto';
import { User, UserCreationAttributes } from './model/user.model'
import { UserDto  } from './dto/user.dto';

import { UUIDV4 } from 'src/security/security'
import { ROLE, ROLES } from 'src/utils/util';
import { Promotion } from 'src/shared/model/promotion.model';
import { Optional } from 'sequelize';
import { UserArea } from '../../shared/model/user-area.model';

import { criptography } from 'src/security/security'
import { Role } from '../../shared/model/role.model';
import { Configuration } from 'src/shared/model/configuration.model';
import { AssistentService } from 'src/shared/service/assistent/assistent.service';

@Injectable()
export class UsersService {
    
  private configModel: typeof Configuration = Configuration
  private assistentService: AssistentService = new AssistentService()

    constructor(
        @InjectModel(User)
        private userModel: typeof User, 
        
        
      ) {}
    
      async findAll() {
        const users = await this.userModel.findAll();
        return users.map((user) => user.toJSON() as UserDto);
      }
    
      async create(data: UserDto) {

        data.uuid = UUIDV4();
        
         const user = await this.userModel.build(data);

         return user.save();
      }

      async delete(userData: Pick<UserDto, 'uuid'>) {
        console.log("Deletando user");
        console.log(userData)
        return await this.userModel.destroy({where: {uuid: userData.uuid }});
      }

      async update(userData: Partial<UserDto>) {
        console.log("Atualizando user");
        
        return await  this.userModel.update(userData, { where: { uuid: userData.uuid } });
      }


      async promoteUser(userArea: UserArea , role: ROLE) {
                const correpondingRoleModel: Role | null = await Role.findOne({where: {id: role.id, name: role.name} })
                
                if (correpondingRoleModel) {
                   return await Promotion.create({user_area_id: userArea.id, role_id: role.id})
                
                  } else {
                    return null;
                  }
      }
    
    async login(credentials: LoginDto): Promise<User | null> {
        // console.log("Logar em UserService -> " + credentials.logon);
        const loginFields: Partial<UserDto> = {logon: credentials.logon, password: credentials.password , status: 'active'}
        const user = await this.get(loginFields)
        //console.log(user)
        if (user) {
            let roles: any = await this.getUserRoles(user.id);
            console.log("User found");
            //console.log(user);

            user.dataValues["roles"] = roles

            return user;
        } else {
            console.log("User not found");
            return null;
        }
        
    }
  async getUserRoles(id: number) {
    let roles  :      string[]  = []
    const isAdmin = await this.isAdmin(id);

    if (isAdmin) {
      roles.push(ROLES.ADMIN)
    }

    const promotions = await this.assistentService.getAllPromotionsOfAnUser(id)
    console.log(promotions)

    if (promotions) {
      promotions.forEach(promotion => {
        const role = promotion.dataValues["role"]
        roles.push(role.dataValues.name)
      })
    }
    return roles
  }
  async isAdmin(id: number) {
    const admin = await  this.configModel.findOne({where: {main_admin: id}})

    if (admin) {
      return true;
    } else {
      return false;
    }
  }

    async get(data: Partial<UserDto>) {
      return await this.userModel.findOne({where: data});
    }

}
