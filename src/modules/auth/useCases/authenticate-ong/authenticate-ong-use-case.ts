import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { AuthenticateOngDto } from '../../dtos/authenticate-ong.dto';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticateOngException } from './authenticate-ong.exception';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthConfiguration } from '@config/auth.config';

type AuthenticateOngUseCaseResponse = {
  accessToken;
};

type AuthenticateOngUseCaseRequest = AuthenticateOngDto;

@Injectable()
export class AuthenticateOngUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOngUseCaseRequest): Promise<AuthenticateOngUseCaseResponse> {
    const ongEmailExists = await this.ongsRepository.findByEmail(email);

    if (!ongEmailExists) {
      throw new AuthenticateOngException.InvalidEmailOrPassword();
    }

    const comparePassword = await compare(password, ongEmailExists.password);

    if (!comparePassword) {
      throw new AuthenticateOngException.InvalidEmailOrPassword();
    }

    const { accessTokenSecretKey, accessTokenExpiresIn } = AuthConfiguration();

    const accessToken = await this.jwtService.signAsync(
      {},
      {
        subject: ongEmailExists.id,
        expiresIn: accessTokenExpiresIn,
        secret: accessTokenSecretKey,
      },
    );

    return {
      accessToken,
    };
  }
}
