import { AuthenticateOngDto } from '@modules/auth/dtos/authenticate-ong.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../helpers/public.decorator';
import { AuthenticateOngUseCase } from '../../useCases/authenticate-ong/authenticate-ong-use-case';

@Controller()
export class AuthController {
  constructor(private readonly authenticateOng: AuthenticateOngUseCase) {}

  @Public()
  @Post('auth')
  authenticate(@Body() authenticateOngDto: AuthenticateOngDto) {
    return this.authenticateOng.execute(authenticateOngDto);
  }
}
