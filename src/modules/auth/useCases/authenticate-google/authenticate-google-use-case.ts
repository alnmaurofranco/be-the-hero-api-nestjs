import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateOngGoogle } from '../../dtos/authenticate-ong-google.dto';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { AuthConfiguration } from '@config/auth.config';

type AuthenticateGoogleUseCaseRequest = AuthenticateOngGoogle;

type AuthenticateGoogleUseCaseResponse = {
  accessToken: string;
} | void;

@Injectable()
export class AuthenticateGoogleUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    name,
    email,
    avatar,
  }: AuthenticateGoogleUseCaseRequest): Promise<AuthenticateGoogleUseCaseResponse> {
    const empty = '';
    const ongAlreadyExists = await this.ongsRepository.findByEmail(email);

    const { accessTokenSecretKey, accessTokenExpiresIn } = AuthConfiguration();

    const ongHasProviderGoogle = ongAlreadyExists?.hasProvider === 'GOOGLE';

    if (ongAlreadyExists && ongHasProviderGoogle) {
      const accessToken = await this.jwtService.signAsync(
        {},
        {
          secret: accessTokenSecretKey,
          subject: ongAlreadyExists.id,
          expiresIn: accessTokenExpiresIn,
        },
      );

      return { accessToken };
    }

    try {
      await this.ongsRepository.create({
        name,
        email,
        city: empty,
        uf: empty,
        whatsapp: empty,
        password: empty,
        avatar,
        hasProvider: 'GOOGLE',
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
