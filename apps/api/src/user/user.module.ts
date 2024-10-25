import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClsModule } from 'nestjs-cls';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [ClsModule.forFeature()]
})
export class UserModule { }
