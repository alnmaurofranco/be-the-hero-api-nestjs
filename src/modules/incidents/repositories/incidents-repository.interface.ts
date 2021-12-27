import { Incident } from '../domain/incident';
import { CreateIncidentDto } from '../dtos/create-incident.dto';

export interface IIncidentsRepository {
  findAll(): Promise<Incident[]>;
  findById(id: string): Promise<Incident>;
  create(createIncidentDto: CreateIncidentDto): Promise<Incident>;
  save(incident: Incident): Promise<void>;
  delete(incident: Incident): Promise<void>;
}
