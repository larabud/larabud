import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [ClsModule.forFeature()],
  controllers: [WorkspaceController],
  providers: [
    PrismaService,
    WorkspaceService
  ],
})
export class WorkspaceModule { }
