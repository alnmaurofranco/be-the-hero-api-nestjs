import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: {
      origin: '*',
    },
  };

  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
