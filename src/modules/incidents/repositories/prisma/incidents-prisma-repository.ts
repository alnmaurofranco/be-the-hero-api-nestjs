import { Injectable } from '@nestjs/common';
import { Incident } from '@modules/incidents/domain/incident';
import { CreateIncidentDto } from '@modules/incidents/dtos/create-incident.dto';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { PrismaService } from '@infra/prisma/prisma.service';
import { IncidentWithDetails } from '@modules/incidents/dtos/incident-with-details.dto';

@Injectable()
export class IncidentsPrismaRepository implements IIncidentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private repository = this.prisma.incident;

  async totalIncidents(): Promise<number> {
    return await this.repository.count();
  }

  async findAll(): Promise<Incident[]> {
    return await this.repository.findMany();
  }

  async findAllByFinished(): Promise<Incident[]> {
    return await this.repository.findMany({
      where: {
        isFinished: {
          equals: true,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findAllWithOng(
    offset: number,
    limit: number,
  ): Promise<IncidentWithDetails[]> {
    const incidents = await this.repository.findMany({
      include: {
        ong: true,
      },
      take: limit,
      skip: offset,
    });

    return incidents;
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
      data,
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
