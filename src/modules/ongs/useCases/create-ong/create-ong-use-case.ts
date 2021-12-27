import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { CreateOngDto } from '../../dtos/create-ong.dto';
import { CreateOngException } from './create-ong.exception';
import { Ong } from '../../domain/ong';

type CreateOngUseCaseResponse = void;

type CreateOngUseCaseRequest = CreateOngDto;

@Injectable()
export class CreateOngUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    city,
    uf,
    whatsapp,
  }: CreateOngUseCaseRequest): Promise<CreateOngUseCaseResponse> {
    const ongAlreadyExists = await this.ongsRepository.findByEmail(email);

    if (ongAlreadyExists) {
      throw new CreateOngException.OngAlreadyExistsError();
    }

    const hashPassword = await hash(password, 9);

    const ong = Ong.create({
      name,
      email,
      password: hashPassword,
      city,
      uf,
      whatsapp,
    });

    await this.ongsRepository.create(ong);
  }
}
