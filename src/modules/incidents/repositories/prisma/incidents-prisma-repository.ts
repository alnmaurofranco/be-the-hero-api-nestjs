import { Injectable } from '@nestjs/common';
import { Incident } from '@modules/incidents/domain/incident';
import { CreateIncidentDto } from '@modules/incidents/dtos/create-incident.dto';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { PrismaService } from '@infra/prisma/prisma.service';

@Injectable()
export class IncidentsPrismaRepository implements IIncidentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private repository = this.prisma.incident;

  async findAll(): Promise<Incident[]> {
    return await this.repository.findMany();
  }

  async findById(id: string): Promise<Incident> {
    const incident = await this.repository.findUnique({
      where: { id },
    });

    if (!incident) return null;

    return incident;
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const data = createIncidentDto;

    const incident = await this.repository.create({
      data: {
        title: data.title,
        description: data.description,
        value: Number(data.value),
        ongId: '1',
      },
    });

    return incident;
  }

  async save(incident: Incident): Promise<void> {
    const data = incident;

    await this.repository.update({
      where: {
        id: incident.id,
      },
      data,
    });
  }

  async delete(incident: Incident): Promise<void> {
    await this.repository.delete({
      where: {
        id: incident.id,
      },
    });
  }
}