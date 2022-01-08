import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOngDto } from '../../dtos/create-ong.dto';
import { CreateOngUseCase } from '../../useCases/create-ong/create-ong-use-case';
import { GetAllOngUseCase } from '../../useCases/get-all-ong/get-all-ong-use-case';
import { ProfileOngUseCase } from '../../useCases/profile-ong/profile-ong-use-case';
import { GetCurrentOngById, Public } from '@modules/auth/helpers';
import { Role } from '@modules/auth/helpers/roles.decorator';

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

  @Role('admin')
  //@UseGuards(AccessTokenAuthGuard)
  @Get('ongs')
  findAll() {
    return this.getAllOng.execute();
  }
}
