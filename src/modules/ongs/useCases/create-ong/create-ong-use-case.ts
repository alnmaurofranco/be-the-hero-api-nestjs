import { Inject, Injectable } from '@nestjs/common';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { CreateOngDto } from '../../dtos/create-ong.dto';
import { hash } from 'bcryptjs';
import { CreateOngException } from './create-ong.exception';

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

    await this.ongsRepository.create({
      name,
      email,
      password: hashPassword,
      city,
      uf,
      whatsapp,
    });
  }
}
