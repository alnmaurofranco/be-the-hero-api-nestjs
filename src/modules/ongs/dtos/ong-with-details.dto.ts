import { Prisma } from '@prisma/client';

export interface OngWithDetails {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
  incidents: Array<{
    id: string;
    title: string;
    description: string;
    value: number | string | Prisma.Decimal;
    isFinished: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
