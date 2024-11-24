import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import refreshConfig from './config/refresh.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClsModule } from 'nestjs-cls';
import githubOauthConfig from 'src/repo-provider/config/github-oauth.config';
import { GithubStrategy } from 'src/repo-provider/strategies/github.strategy';
import { GithubService } from 'src/repo-provider/github/github.service';
import { RepositoryProviderService } from 'src/repo-provider/repo-provider.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(githubOauthConfig),

    ClsModule.forFeature()
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    GithubService,
    LocalStrategy,
    RefreshJwtStrategy,
    JwtStrategy,
    GithubStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AuthModule { }
