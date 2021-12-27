import { AuthenticateOngDto } from '@modules/auth/dtos/authenticate-ong.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticateOngUseCase } from '../../useCases/authenticate-ong/authenticate-ong-use-case';
import { Public } from '../../helpers/public.decorator';
import { GetCurrentOngById } from '@modules/auth/helpers';
import { ProfileOngUseCase } from '../../useCases/profile-ong/profile-ong-use-case';

@Controller()
export class AuthController {
  constructor(
    private readonly authenticateOng: AuthenticateOngUseCase,
    private readonly profileOng: ProfileOngUseCase,
  ) {}

  @Public()
  @Post('auth')
  authenticate(@Body() authenticateOngDto: AuthenticateOngDto) {
    return this.authenticateOng.execute(authenticateOngDto);
  }

  @Get('profile')
  profile(@GetCurrentOngById() ong_id: string) {
    return this.profileOng.execute({ ong_id });
  }
}
