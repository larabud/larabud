import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forFeature()
  ],
  controllers: [ProjectController],
  providers: [ProjectService,],
})
export class ProjectModule { }
