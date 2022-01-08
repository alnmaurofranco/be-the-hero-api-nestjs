import { IncidentWithDetails } from '../dtos/incident-with-details.dto';
import { Incident } from '@modules/incidents/domain/incident';
import { Ong } from '@modules/ongs/domain/ong';

type PersistenceRaw = (Omit<Incident, 'ongId'> & {
  ong: Omit<Ong, 'password'>;
})[];

export class IncidentWithDetailsMapper {
  static toDto(raw: PersistenceRaw): IncidentWithDetails[] {
    return raw.map((incident) => ({
      id: incident.id,
      title: incident.title,
      description: incident.description,
      value: incident.value,
      ong: {
        id: incident.ong.id,
        name: incident.ong.name,
        email: incident.ong.email,
        whatsapp: incident.ong.whatsapp,
        city: incident.ong.city,
        uf: incident.ong.uf,
      },
      isFinished: incident.isFinished,
      createdAt: incident.createdAt,
      updatedAt: incident.updatedAt,
    }));
  }
}
