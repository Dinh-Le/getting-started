import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    console.log(configService.get<string>('jwt.JWT_ACCESS_TOKEN_SECRET'));
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
