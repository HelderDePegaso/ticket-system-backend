import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service'; 
import { criptography } from 'src/security/security';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private authService: AuthService) {

    }
    
    @Post('login')
    async login(@Body()credentials: LoginDto) {
        const userOrNull =  await this.authService.login(credentials);
        

        console.log("userOrNull")
        console.log(userOrNull)
        if (!userOrNull) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return {
            status: 200, 
            message: "Login efetuado com sucesso", 
            data: {token :  userOrNull }
        }

    }

    @Get("logout")
    logout() {
        
    }
}
