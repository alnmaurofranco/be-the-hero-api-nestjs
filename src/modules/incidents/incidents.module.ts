import { Module } from '@nestjs/common';
import { IncidentsController } from './http/controller/incidents.controller';

@Module({
  imports: [],
  controllers: [IncidentsController],
  providers: [],
})
export class IncidentsModule {}
