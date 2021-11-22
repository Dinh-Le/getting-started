import {
  Body,
  Controller,
  Delete,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto';
import { Public } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const user = await this.authService.validateUser(loginRequestDto);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Delete('logout')
  logout() {
    this.authService.logout();
  }
}
