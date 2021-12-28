import { Prisma } from '@prisma/client';

export class Incident {
  id?: string;
  title: string;
  description: string;
  value: number | string | Prisma.Decimal;
  ongId: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor({ title, description, value, ongId }: Incident) {
    return Object.assign(this, { title, description, value, ongId });
  }

  static create({ title, description, value, ongId }: Incident) {
    const incident = new Incident({ title, description, value, ongId });

    return incident;
  }
}
