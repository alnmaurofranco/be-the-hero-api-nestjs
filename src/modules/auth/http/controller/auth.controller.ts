import { AuthenticateOngDto } from '@modules/auth/dtos/authenticate-ong.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateOngUseCase } from '../../useCases/authenticate-ong/authenticate-ong-use-case';
import { Public } from '../../helpers/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticateOng: AuthenticateOngUseCase) {}

  @Public()
  @Post()
  authenticate(@Body() authenticateOngDto: AuthenticateOngDto) {
    return this.authenticateOng.execute(authenticateOngDto);
  }
}
