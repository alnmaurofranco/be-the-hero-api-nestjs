import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { AuthConfiguration } from '@config/auth.config';
import { JwtService } from '@nestjs/jwt';

type AuthenticateFacebookUseCaseRequest = {
  name: string;
  email: string;
  avatar: string;
};

type AuthenticateFacebookUseCaseResponse = void | {
  accessToken: string;
};

@Injectable()
export class AuthenticateFacebookUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    name,
    email,
    avatar,
  }: AuthenticateFacebookUseCaseRequest): Promise<AuthenticateFacebookUseCaseResponse> {
    const empty = '';
    const ongAlreadyExists = await this.ongsRepository.findByEmail(email);

    const { accessTokenSecretKey, accessTokenExpiresIn } = AuthConfiguration();

    const ongHasProviderFacebook = ongAlreadyExists.hasProvider === 'FACEBOOK';

    if (ongAlreadyExists && ongHasProviderFacebook) {
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
        hasProvider: 'FACEBOOK',
      });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }
}
