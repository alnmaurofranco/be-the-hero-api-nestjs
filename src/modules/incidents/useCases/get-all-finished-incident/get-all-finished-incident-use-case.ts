import { Inject, Injectable } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { Incident } from '../../domain/incident';

type GetAllFinishedIncidentUseCaseResponse = Incident[];

@Injectable()
export class GetAllFinishedIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute(): Promise<GetAllFinishedIncidentUseCaseResponse> {
    return await this.incidentsRepository.findAllByFinished();
  }
}
