import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PostsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
