import { Injectable, Inject } from '@nestjs/common';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { ProfileOngException } from './profile-ong-exception';
import { OngWithDetails } from '../../dtos/ong-with-details.dto';
import { OngWithDetailsMapper } from '../../mappers/ong-with-details-mapper';

type ProfileOngUseCaseResponse = OngWithDetails;

type ProfileOngUseCaseRequest = {
  ong_id: string;
};

@Injectable()
export class ProfileOngUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
  ) {}

  async execute({
    ong_id,
  }: ProfileOngUseCaseRequest): Promise<ProfileOngUseCaseResponse> {
    const ongExists = await this.ongsRepository.findByIdWithDetails(ong_id);

    if (!ongExists) {
      throw new ProfileOngException.NotFoundOngError();
    }

    return OngWithDetailsMapper.toDto(ongExists);
  }
}
