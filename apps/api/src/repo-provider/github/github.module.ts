import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import githubOauthConfig from '../config/github-oauth.config';

@Module({
  imports: [
    ConfigModule.forFeature(githubOauthConfig),
    ClsModule.forFeature()
  ],
  controllers: [GithubController],
  providers: [GithubService, UserService, PrismaService],
})
export class GithubModule { }
