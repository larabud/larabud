import { Body, Controller, Get, Post, Query, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthenticatedJWTUser } from './types/auth';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { SkipWorkspace } from 'src/common/decorators/skip-workspace.decorator';
import { GithubAuthGuard } from 'src/repo-provider/guards/github-auth.guard';
import { GithubService } from 'src/repo-provider/github/github.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GithubService
  ) { }


  @Public()
  @Post('register')
  @SkipWorkspace()
  @ApiOperation({ summary: 'Register a user' })
  @ApiCreatedResponse({
    type: UserEntity
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @SkipWorkspace()
  @ApiOperation({ summary: 'Login a user' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'User login credentials',
    type: LoginRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials.',
  })
  async login(@Request() req): Promise<LoginResponseDto> {
    return await this.authService.login(req.user.id, req.user.name);
  }


  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @Public()
  @SkipWorkspace()
  @ApiOperation({ summary: 'Refresh the authentication token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed.',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token.',
  })
  async refreshToken(@Request() req): Promise<AuthenticatedJWTUser> {
    return await this.authService.refreshToken(req.user.id, req.user.name);
  }

  @UseGuards(GithubAuthGuard)
  @SkipWorkspace()
  @Public()
  @Get('github/login')
  githubLogin() { }

  @UseGuards(GithubAuthGuard)
  @SkipWorkspace()
  @Public()
  @Get('github/callback')
  async githubInstallCallback(@Request() req, @Res() res: Response, @Query('installation_id') installationId: string) {
    if (installationId) {
      await this.githubService.saveProviderTokens({
        userId: req.user.id,
        name: 'github',
        appId: installationId,
      });
    }

    const provider = await this.githubService.getProviderTokens(req.user.id, 'github');
    if ((!provider || !provider.appId)) {
      return res.redirect(`https://github.com/apps/larabud/installations/new`);
    }

    const response = await this.authService.login(req.user.id, req.user.name);

    const redirectUrl = `http://app.larabud.local:3000/api/auth/github/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`;

    return res.redirect(redirectUrl);
  }

}
