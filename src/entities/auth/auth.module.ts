import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { EncriptPass } from '../../common/middleware/encript-pass';

import { UsersModule } from '../users/users.module';
import { JWTStrategy } from './jwt.strategy';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [JWTStrategy]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        
        

        consumer
            .apply(EncriptPass)
            .forRoutes(
                {path: 'auth/login', method: RequestMethod.POST},
                { path: 'users/create', method: RequestMethod.POST }
            );
    }
}
