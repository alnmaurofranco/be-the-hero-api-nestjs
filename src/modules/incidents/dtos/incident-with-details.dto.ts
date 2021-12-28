import { Prisma } from '@prisma/client';

export interface IncidentWithDetails {
  id: string;
  title: string;
  description: string;
  value: number | string | Prisma.Decimal;
  ong: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
