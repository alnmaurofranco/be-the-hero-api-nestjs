import { OngsModule } from '@modules/ongs/ongs.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './http/controller/auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthenticateGoogleUseCase } from './useCases/authenticate-google/authenticate-google-use-case';
import { AuthenticateOngUseCase } from './useCases/authenticate-ong/authenticate-ong-use-case';

@Module({
  imports: [
    OngsModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthenticateOngUseCase,
    AuthenticateGoogleUseCase,
    AccessTokenStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
