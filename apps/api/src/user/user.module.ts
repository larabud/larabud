import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forFeature()
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule { }
