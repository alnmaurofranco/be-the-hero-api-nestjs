import { AuthenticateOngDto } from '@modules/auth/dtos/authenticate-ong.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Public } from '../../helpers/public.decorator';
import { AuthenticateOngUseCase } from '../../useCases/authenticate-ong/authenticate-ong-use-case';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateGoogleUseCase } from '../../useCases/authenticate-google/authenticate-google-use-case';
import { AuthenticateFacebookUseCase } from '../../useCases/authenticate-facebook/authenticate-facebook-use-case';
import { HttpException } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(
    private readonly authenticateOng: AuthenticateOngUseCase,
    private readonly authenticateGoogle: AuthenticateGoogleUseCase,
    private readonly authenticateFacebook: AuthenticateFacebookUseCase,
  ) {}

  @Public()
  @Post('auth')
  authenticate(@Body() authenticateOngDto: AuthenticateOngDto) {
    return this.authenticateOng.execute(authenticateOngDto);
  }

  @Public()
  @Get('signin/google')
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() _request) {
    return HttpStatus.OK;
  }

  @Public()
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  authenticateGoogleCallback(@Req() request) {
    return this.authenticateGoogle.execute({ ...request.user });
  }

  @Public()
  @Get('signin/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookAuth(@Req() _request) {
    return HttpStatus.OK;
  }

  @Public()
  @UseGuards(AuthGuard('facebook'))
  @Get('auth/facebook/callback')
  async authenticateFacebookCallback(@Req() request) {
    try {
      return this.authenticateFacebook.execute({ ...request.user });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
