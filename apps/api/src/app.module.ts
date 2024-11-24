import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from './workspace/workspace.module';
import { APP_GUARD } from '@nestjs/core';
import { WorkspaceGuard } from './workspace/guards/workspace.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClsModule } from 'nestjs-cls';
import { GithubModule } from './repo-provider/github/github.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('workspaceId', Number(req.headers['x-workspace-id']));
        },
      },
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    WorkspaceModule,
    GithubModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: WorkspaceGuard,
    },
  ],
})
export class AppModule { }
