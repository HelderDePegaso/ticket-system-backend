import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './model/user.model';
import { UserAreaService } from '../xtras/xtras-service/user-area/user-area.service';
import { AreasService } from '../areas/areas.service';
import { UserArea } from '../xtras/model/user-area.model';

@Module({
    imports: [SequelizeModule.forFeature([User, UserArea])], 
    controllers: [UsersController],
    providers: [UsersService, UserAreaService, User , AreasService , UserArea],
    exports: [UsersService, UserAreaService, UserArea], 
  })
export class UsersModule {}
