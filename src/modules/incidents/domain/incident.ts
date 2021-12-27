import { Prisma } from '@prisma/client';

export class Incident {
  id?: string;
  title: string;
  description: string;
  value: number | string | Prisma.Decimal;
  //ong_id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  private constructor({ title, description, value }: Incident) {
    return Object.assign(this, { title, description, value });
  }
}
