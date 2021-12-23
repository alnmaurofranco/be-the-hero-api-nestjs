import { Module } from '@nestjs/common';
import { OngsModule } from './modules/ongs/ongs.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule, OngsModule, IncidentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
