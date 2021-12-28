import { IncidentWithDetails } from '@modules/incidents/dtos/incident-with-details.dto';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { GetAllIncidentException } from './get-all-incident-exception';
import { IncidentWithDetailsMapper } from '../../mappers/incident-with-details-mapper';

type GetAllIncidentUseCaseResponse = IncidentWithDetails[];

@Injectable()
export class GetAllIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute(): Promise<GetAllIncidentUseCaseResponse> {
    const listAllIncidentsExists =
      await this.incidentsRepository.findAllWithOng();

    if (listAllIncidentsExists.length <= 0) {
      throw new GetAllIncidentException.EmptyListIncidentError();
    }

    return IncidentWithDetailsMapper.toDto(listAllIncidentsExists);
  }
}
