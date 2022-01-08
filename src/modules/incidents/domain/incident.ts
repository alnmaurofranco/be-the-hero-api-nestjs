import { Prisma } from '@prisma/client';

export class Incident {
  id?: string;
  title: string;
  description: string;
  value: number | string | Prisma.Decimal;
  ongId: string;
  isFinished: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor({
    title,
    description,
    value,
    ongId,
    isFinished = false,
  }: Incident) {
    return Object.assign(this, {
      title,
      description,
      value,
      ongId,
      isFinished,
    });
  }

  static create({
    title,
    description,
    value,
    ongId,
    isFinished = false,
  }: Incident) {
    const incident = new Incident({
      title,
      description,
      value,
      ongId,
      isFinished,
    });

    return incident;
  }
}
