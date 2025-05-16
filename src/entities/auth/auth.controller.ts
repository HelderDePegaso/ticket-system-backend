import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service'; 
import { criptography } from 'src/security/security';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private authService: AuthService) {

    }
    
    @Post('login')
    login(@Body()credentials: LoginDto) {
        const userOrNull =  this.authService.login(credentials);
        

        console.log("userOrNull")

        if (!userOrNull) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return userOrNull

    }

    @Get("logout")
    logout() {
        
    }
}
