import { Incident } from '../domain/incident';
import { CreateIncidentDto } from '../dtos/create-incident.dto';
import { IncidentWithDetails } from '../dtos/incident-with-details.dto';

export interface IIncidentsRepository {
  totalIncidents(): Promise<number>;
  findAll(): Promise<Incident[]>;
  findAllByFinished(): Promise<Incident[]>;
  findAllWithOng(offset: number, limit: number): Promise<IncidentWithDetails[]>;
  findById(id: string): Promise<Incident>;
  create(createIncidentDto: CreateIncidentDto): Promise<Incident>;
  save(incident: Incident): Promise<void>;
  delete(incident: Incident): Promise<void>;
}
