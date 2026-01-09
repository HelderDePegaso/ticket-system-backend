import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { UsersService } from '../users/users.service'; 
import { UserDto, SafeUserDto } from '../users/dto/user.dto';
import { User } from '../users/model/user.model';
import { omitFields } from 'src/utils/omitFields';
import { JWTStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, @Inject (JWTStrategy) private jwtStrategy : JWTStrategy ) {}

    public async  login(credentials: LoginDto) {
        console.log("Logar em AuthService ->")
        const user: any = await this.usersService.login(credentials);
        console.log(credentials);
        console.log("R no auth")
        //console.log(user);
        if (user) {
            console.log("User found");
            //console.log(user);
            let safeUser = this.toSafeUser(user);
            const token = await this.jwtStrategy.generateToken(safeUser);
            console.log("safeUser");
            //console.log(safeUser);
            return {token: token, user: safeUser}
    
        } else {
            return null
        }
    } 
    
    private toSafeUser(user: User): SafeUserDto {
        //const { name, status, created_at, updated_at } = user.dataValues;
        //return new SafeUserDto({ name, status, created_at, updated_at });

        const rawUser = user.get(); // ou user.toJSON()
        return omitFields(rawUser, ['id', 'logon', 'password']);
    }
}
