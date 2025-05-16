import { Module } from '@nestjs/common';
import { Area } from './model/area.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
    imports: [SequelizeModule.forFeature([Area])], // 👈 isso é essencial
        controllers: [AreasController],
        providers: [AreasService], 
        exports: [AreasService],
})
export class AreasModule {}
