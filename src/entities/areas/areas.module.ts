import { Module } from '@nestjs/common';
import { Area } from './model/area.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { UserAreaService } from 'src/shared/service/user-area/user-area.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [SequelizeModule.forFeature([Area]), UsersModule], // 👈 isso é essencial
        controllers: [AreasController],
        providers: [AreasService], 
        exports: [AreasService],
})
export class AreasModule {}
