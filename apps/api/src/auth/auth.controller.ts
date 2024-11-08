import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @Public()
  async login(@Request() req) {
    return await this.authService.login(req.user.id, req.user.name)
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @Public()
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user.id, req.user.name)
  }

  @Post('test')
  test() {
    return 'test'
  }
}
