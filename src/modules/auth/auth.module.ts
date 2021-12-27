import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './http/controller/auth.controller';
import { AuthenticateOngUseCase } from './useCases/authenticate-ong/authenticate-ong-use-case';
import { OngsModule } from '@modules/ongs/ongs.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { ProfileOngUseCase } from './useCases/profile-ong/profile-ong-use-case';

@Module({
  imports: [
    OngsModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateOngUseCase, ProfileOngUseCase, AccessTokenStrategy],
})
export class AuthModule {}
