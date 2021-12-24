import { Injectable, Inject } from '@nestjs/common';
import { Ong } from '../../domain/ong';
import { IOngsRepository } from '../../repositories/ongs-repository.interface';
import { GetAllOngException } from './get-all-ong.exception';

type GetAllOngUseCaseResponse = Omit<Ong, 'password'>[];

@Injectable()
export class GetAllOngUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
  ) {}

  async execute(): Promise<GetAllOngUseCaseResponse> {
    const listAllOngExists = await this.ongsRepository.findAllOmitPassword();

    if (listAllOngExists.length <= 0) {
      throw new GetAllOngException.EmptyListOngError();
    }

    return listAllOngExists;
  }
}
