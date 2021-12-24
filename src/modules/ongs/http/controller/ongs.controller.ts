import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOngDto } from '../../dtos/create-ong.dto';
import { UpdateOngDto } from '../../dtos/update-ong.dto';
import { GetAllOngUseCase } from '../../useCases/get-all-ong/get-all-ong-use-case';
import { CreateOngUseCase } from '../../useCases/create-ong/create-ong-use-case';

@Controller('ongs')
export class OngsController {
  constructor(
    private readonly createOng: CreateOngUseCase,
    private readonly getAllOng: GetAllOngUseCase,
  ) {}

  @Post()
  create(@Body() createOngDto: CreateOngDto) {
    return this.createOng.execute(createOngDto);
  }

  @Get()
  findAll() {
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
