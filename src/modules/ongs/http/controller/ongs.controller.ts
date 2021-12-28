import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateOngDto } from '../../dtos/create-ong.dto';
import { UpdateOngDto } from '../../dtos/update-ong.dto';
import { GetAllOngUseCase } from '../../useCases/get-all-ong/get-all-ong-use-case';
import { CreateOngUseCase } from '../../useCases/create-ong/create-ong-use-case';
import { GetCurrentOngById, Public } from '@modules/auth/helpers';
import { AccessTokenAuthGuard } from '@modules/auth/helpers/guards';
import { ProfileOngUseCase } from '../../useCases/profile-ong/profile-ong-use-case';

@Controller()
export class OngsController {
  constructor(
    private readonly profileOng: ProfileOngUseCase,
    private readonly createOng: CreateOngUseCase,
    private readonly getAllOng: GetAllOngUseCase,
  ) {}

  @Get('profile')
  profile(@GetCurrentOngById() ong_id: string) {
    return this.profileOng.execute({ ong_id });
  }

  @Public()
  @Post('ongs')
  create(@Body() createOngDto: CreateOngDto) {
    return this.createOng.execute(createOngDto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('ongs')
  findAll(@GetCurrentOngById() ong_id: string) {
    console.log('findAll()', ong_id);
    return this.getAllOng.execute();
  }

  @Get('ongs/:id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch('ongs/:id')
  update(@Param('id') id: string, @Body() updateOngDto: UpdateOngDto) {
    return 'this.ongsService.update(+id, updateOngDto);';
  }

  @Delete('ongs/:id')
  remove(@Param('id') id: string) {
    return 'this.ongsService.remove(+id);';
  }
}
