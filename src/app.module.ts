import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Comment } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middelware/logger.middleware';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DATABASE,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [User, Comment],
      // migrations: ['/src/migrations/*.ts'],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: "1h"
      }
    }),
    LoggerModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}