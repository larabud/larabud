import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GithubAuthGuard } from './guards/github-auth/github-auth.guard';
import { Response } from 'express';
import { SkipWorkspace } from 'src/workspace/decorators';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("register")
  @SkipWorkspace()
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @SkipWorkspace()
  @Public()
  login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name)
  }

  @UseGuards(RefreshAuthGuard)
  @SkipWorkspace()
  @Public()
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name)
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
  async githubCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(req.user.id, req.user.name)
    res.redirect(`http://localhost:3000/api/auth/github/callback?userId=${response.id}&name=${response.name}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`)
  }
}
