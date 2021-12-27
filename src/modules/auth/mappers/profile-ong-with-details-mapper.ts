import { ProfileOngWithDetailsDto } from '../dtos/profile-ong-with-details.dto';
import { Ong } from '../../ongs/domain/ong';

export class ProfileOngWithDetailsDtoMapper {
  static toDto(raw: Ong): ProfileOngWithDetailsDto {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      whatsapp: raw.whatsapp,
      city: raw.city,
      uf: raw.uf,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
