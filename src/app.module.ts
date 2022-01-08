import { Module } from '@nestjs/common';
import { OngsModule } from './modules/ongs/ongs.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthConfiguration } from '@config/auth.config';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenAuthGuard } from './modules/auth/helpers/guards/access-token-guard.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [AuthConfiguration], // carregar um arquivo com configurações
    }),
    PrismaModule,
    AuthModule,
    OngsModule,
    IncidentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
})
export class AppModule {}
