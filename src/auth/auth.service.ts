import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';
import { LoginRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginRequestDto: LoginRequestDto): Promise<any> {
    const user = await this.usersService.findOne(loginRequestDto.username);
    if (user && user.password === loginRequestDto.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('jwt.JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('jwt.JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return { accessToken, refreshToken };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logout() {}
}
