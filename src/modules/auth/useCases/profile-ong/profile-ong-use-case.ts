import { Injectable, Inject } from '@nestjs/common';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { ProfileOngException } from '../../useCases/profile-ong/profile-ong-exception';
import { ProfileOngWithDetailsDto } from '@modules/auth/dtos/profile-ong-with-details.dto';
import { ProfileOngWithDetailsDtoMapper } from '../../mappers/profile-ong-with-details-mapper';

type ProfileOngUseCaseResponse = ProfileOngWithDetailsDto;

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
    const ongExists = await this.ongsRepository.findById(ong_id);

    if (!ongExists) {
      throw new ProfileOngException.NotFoundOngError();
    }

    return ProfileOngWithDetailsDtoMapper.toDto(ongExists);
  }
}
