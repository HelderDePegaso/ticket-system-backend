import { Inject, Injectable } from '@nestjs/common';
//
import * as Sequelize from 'sequelize'; // ✅ CORRETO

import { InjectModel } from '@nestjs/sequelize';

import { LoginDto } from '../auth/dto/LoginDto';
import { User, UserCreationAttributes } from './model/user.model'
import { UserDto  } from './dto/user.dto';

import { UUIDV4 } from 'src/security/security'
import { ROLE, ROLES } from 'src/essentials/essentials';
import { Promotion } from 'src/shared/model/promotion.model';
import { Optional } from 'sequelize';
import { UserArea } from '../../shared/model/user-area.model';

import { criptography } from 'src/security/security'
import { Role } from '../../shared/model/role.model';

@Injectable()
export class UsersService {
    

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
      ) {}
    
      async findAll() {
        const users = await this.userModel.findAll();
        return users.map((user) => user.toJSON() as UserDto);
      }
    
      async create(data: UserCreationAttributes) {

        data.uuid = UUIDV4();
        
         const user = await this.userModel.build(data);

         return user.save();
      }

      async delete(userData: Pick<UserDto, 'uuid'>) {
        return await this.userModel.destroy({where: userData});
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
            console.log("User found");
            //console.log(user);
            return user;
        } else {
            console.log("User not found");
            return null;
        }
        
    }

    async get(data: Partial<UserDto>) {
      return await this.userModel.findOne({where: data});
    }

}
