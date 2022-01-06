import { AuthenticateOngDto } from '@modules/auth/dtos/authenticate-ong.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from '../../helpers/public.decorator';
import { AuthenticateOngUseCase } from '../../useCases/authenticate-ong/authenticate-ong-use-case';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateGoogleUseCase } from '../../useCases/authenticate-google/authenticate-google-use-case';

@Controller()
export class AuthController {
  constructor(
    private readonly authenticateOng: AuthenticateOngUseCase,
    private readonly authenticateGoogle: AuthenticateGoogleUseCase,
  ) {}

  @Public()
  @Post('auth')
  authenticate(@Body() authenticateOngDto: AuthenticateOngDto) {
    return this.authenticateOng.execute(authenticateOngDto);
  }

  @Public()
  @Get('signin/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() request) {
    console.log('googleAuth()', request);
  }

  @Public()
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  authenticateGoogleCallback(@Req() request) {
    return this.authenticateGoogle.execute({ ...request.user });
  }
}
