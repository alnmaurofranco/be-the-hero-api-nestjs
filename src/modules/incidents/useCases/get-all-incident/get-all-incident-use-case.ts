import { IncidentWithDetails } from '@modules/incidents/dtos/incident-with-details.dto';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { GetAllIncidentException } from './get-all-incident-exception';
import { IncidentWithDetailsMapper } from '../../mappers/incident-with-details-mapper';

type GetAllIncidentUseCaseRequest = {
  pagination: number;
};

type GetAllIncidentUseCaseResponse = IncidentWithDetails[];

@Injectable()
export class GetAllIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    pagination,
  }: GetAllIncidentUseCaseRequest): Promise<GetAllIncidentUseCaseResponse> {
    const limit = 5;

    const listAllIncidentsExists =
      await this.incidentsRepository.findAllWithOng(
        (pagination - 1) * limit,
        limit,
      );

    if (listAllIncidentsExists.length <= 0) {
      throw new GetAllIncidentException.EmptyListIncidentError();
    }

    return IncidentWithDetailsMapper.toDto(listAllIncidentsExists);
  }
}
