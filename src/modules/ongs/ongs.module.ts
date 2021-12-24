import { Module } from '@nestjs/common';
import { OngsController } from './http/controller/ongs.controller';
import { OngsPrismaRepository } from './repositories/prisma/ongs-prisma-repository';
import { CreateOngUseCase } from './useCases/create-ong/create-ong-use-case';
import { GetAllOngUseCase } from './useCases/get-all-ong/get-all-ong-use-case';

@Module({
  controllers: [OngsController],
  providers: [
    {
      provide: 'OngsRepository',
      useClass: OngsPrismaRepository,
    },
    CreateOngUseCase,
    GetAllOngUseCase,
  ],
})
export class OngsModule {}
