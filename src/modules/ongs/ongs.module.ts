import { Module } from '@nestjs/common';
import { OngsService } from './ongs.service';
import { OngsController } from './ongs.controller';

@Module({
  controllers: [OngsController],
  providers: [OngsService]
})
export class OngsModule {}
