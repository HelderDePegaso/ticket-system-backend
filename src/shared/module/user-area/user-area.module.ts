import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserArea } from '../../model/user-area.model';
import { UserAreaService } from '../../xtras-service/user-area/user-area.service';
import { UsersService } from 'src/entities/users/users.service';
import { AreasService } from 'src/entities/areas/areas.service';

@Module({
    imports: [SequelizeModule.forFeature([UserArea])] ,
    providers: [UserAreaService , UsersService , AreasService]
})
export class UserAreaModule {}
