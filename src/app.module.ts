import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from './config/env';
import { AppService } from './app.service';
import { UserModule } from './system/user/user.module';
import { PostsModule } from './system/posts/posts.module';
import { AuthModule } from './system/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './system/auth/jwt-auth.grard';
// import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { UploadModule } from './system/upload/upload.module';
import { LoggerService } from './system/logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', '123456'), // 密码
        database: configService.get('DB_DATABASE', 'test_db'), //数据库名
        entities: ['dist/**/*.entity{.ts,.js}'],
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true,
      }),
    }),
    UserModule,
    PostsModule,
    AuthModule,
    RedisModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LoggerService,
    // RedisService,
  ],
})
export class AppModule { }
