import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  JWT_ACCESS_TOKEN_SECRET: 'access_token',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: '1m',
  JWT_REFRESH_TOKEN_SECRET: 'refresh_token',
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: '1y',
}));
