import { NestApplicationOptions } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './infra/prisma/prisma-client-exception.filter';

async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: {
      origin: '*',
    },
  };

  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api');

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3333);
}
bootstrap();
