import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { TicketsModule } from './entities/tickets/tickets.module';
import { TicketsController } from './entities/tickets/tickets.controller';
import { TicketsService } from './entities/tickets/tickets.service';
import { UsersModule } from './entities/users/users.module';
import { UsersController } from './entities/users/users.controller';
import { UsersService } from './entities/users/users.service';
import { AuthModule } from './entities/auth/auth.module';
import { AuthController } from './entities/auth/auth.controller';
import { AuthService } from './entities/auth/auth.service';


// 🧩 MODELS
import { User } from './entities/users/model/user.model';
import { UserArea } from './entities/xtras/xtras-model/user-area.model';
import { Area } from './entities/areas/model/area.model';

import { Configuration } from './entities/xtras/xtras-model/configuration.model';
import { Domain } from './entities/xtras/xtras-model/domain.model';
import { Promotion } from './entities/xtras/xtras-model/promotion.model';
import { Role } from './entities/xtras/xtras-model/role.model';

import { AreasModule } from './entities/areas/areas.module';
import { AreasController } from './entities/areas/areas.controller';
import { AreasService } from './entities/areas/areas.service';
import { UserAreaService } from './entities/xtras/xtras-service/user-area/user-area.service';
import { JWTStrategy } from './entities/auth/jwt.strategy';
import { AuthenticationTokenVerificationMiddleware as AtuthVerification } from './common/middleware/authentication.middleware';



@Module({
  imports: [
    TicketsModule,
    UsersModule,
    AuthModule,
    AreasModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ticket_system',
      autoLoadModels: true,
      synchronize: false,
      logging: false,

      // 🔐 Incluindo todos os modelos explicitamente
      models: [
        User,
        UserArea,
        Area,
        Configuration,
        Domain,
        Promotion,
        Role,
      ],
    }),
    
  ],
  controllers: [
    AppController,
    TicketsController,
    UsersController,
    AuthController,
    AreasController,
  ],
  providers: [
    AppService,
    TicketsService,
    
    AuthService,
    
    AreasService,
    
    UserAreaService,

    JWTStrategy
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AtuthVerification)
      .exclude({ path: 'auth/login', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}