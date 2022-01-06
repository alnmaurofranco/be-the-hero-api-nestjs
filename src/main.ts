import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './infra/prisma/prisma-client-exception.filter';
import { readFileSync } from 'fs';

async function bootstrap() {
  const certificate = readFileSync(__dirname + '/../localhost.crt');
  const keyfile = readFileSync(__dirname + '/../localhost.key');

  const httpsOptions = {
    cert: certificate,
    key: keyfile,
  };

  const options: NestApplicationOptions = {
    cors: {
      origin: '*',
    },
    httpsOptions: process.env.SSL_ENABLE === 'true' ? httpsOptions : undefined,
  };

  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix(process.env.DEFAULT_PREFIX);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT);
}
bootstrap();
