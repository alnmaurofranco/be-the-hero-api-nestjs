import { OngWithDetails } from '../dtos/ong-with-details.dto';
import { Ong } from '../domain/ong';
import { Incident } from '../../incidents/domain/incident';

type PersistenceRaw = Omit<Ong, 'password'> & {
  incidents: Omit<Incident, 'ongId'>[];
};

export class OngWithDetailsMapper {
  static toDto(raw: PersistenceRaw): OngWithDetails {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      whatsapp: raw.whatsapp,
      city: raw.city,
      uf: raw.uf,
      incidents: raw.incidents.map((incident) => {
        return {
          id: incident.id,
          title: incident.title,
          description: incident.description,
          value: incident.value,
          createdAt: incident.createdAt,
          updatedAt: incident.updatedAt,
        };
      }),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
