import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/transform/transform.interceptor';
import { AppModule } from './app.module';
import { LoggerService } from './system/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const loggerService = app.get(LoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(loggerService)); // 全局注册错误的过滤器(错误异常)
  app.useGlobalInterceptors(new TransformInterceptor(loggerService)); // 全局注册成功过滤器

  const options = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
