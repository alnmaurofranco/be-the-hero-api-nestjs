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

@Controller('ongs')
export class OngsController {
  constructor(
    private readonly createOng: CreateOngUseCase,
    private readonly getAllOng: GetAllOngUseCase,
  ) {}

  @Public()
  @Post()
  create(@Body() createOngDto: CreateOngDto) {
    return this.createOng.execute(createOngDto);
  }

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  findAll(@GetCurrentOngById() ong_id: string) {
    console.log('findAll()', ong_id);
    return this.getAllOng.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOngDto: UpdateOngDto) {
    return 'this.ongsService.update(+id, updateOngDto);';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.ongsService.remove(+id);';
  }
}
