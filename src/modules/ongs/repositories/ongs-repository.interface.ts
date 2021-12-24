import { Ong } from '../domain/ong';
import { CreateOngDto } from '../dtos/create-ong.dto';

export type OngOmitPassword = Omit<Ong, 'password'>;

export interface IOngsRepository {
  findAllOmitPassword(): Promise<OngOmitPassword[]>;
  findById(id: string): Promise<Ong>;
  findByIdOmitPassword(id: string): Promise<OngOmitPassword>;
  findByEmail(email: string): Promise<Ong>;
  create(createOngDto: CreateOngDto): Promise<void>;
}
