import { Ong } from '../domain/ong';
import { CreateOngDto } from '../dtos/create-ong.dto';
import { OngWithDetails } from '../dtos/ong-with-details.dto';

export type OngOmitPassword = Omit<Ong, 'password'>;

export interface IOngsRepository {
  findAllOmitPassword(): Promise<OngOmitPassword[]>;
  findById(id: string): Promise<Ong>;
  findByIdWithDetails(id: string): Promise<OngWithDetails>;
  findByIdOmitPassword(id: string): Promise<OngOmitPassword>;
  findByEmail(email: string): Promise<Ong>;
  create(createOngDto: CreateOngDto): Promise<void>;
}
