import { Incident } from '../../incidents/domain/incident';

export class Ong {
  id?: string;
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  city: string;
  uf: string;
  incident?: Incident[];
  createdAt?: Date;
  updatedAt?: Date;

  private constructor({ name, email, password, whatsapp, city, uf }: Ong) {
    return Object.assign(this, {
      name,
      email,
      password,
      whatsapp,
      city,
      uf,
    });
  }

  public static create({
    name,
    email,
    password,
    whatsapp,
    city,
    uf,
  }: Ong): Ong {
    const ong = new Ong({
      name,
      email: email.toLowerCase(),
      password,
      whatsapp,
      city,
      uf,
    });

    return ong;
  }
}
