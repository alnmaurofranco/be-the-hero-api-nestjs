import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { IOngsRepository, OngOmitPassword } from '../ongs-repository.interface';
import { Ong } from '@modules/ongs/domain/ong';
import { CreateOngDto } from '@modules/ongs/dtos/create-ong.dto';
import { OngWithDetails } from '@modules/ongs/dtos/ong-with-details.dto';

@Injectable()
export class OngsPrismaRepository implements IOngsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private repository = this.prisma.ong;

  async findAllOmitPassword(): Promise<OngOmitPassword[]> {
    const ongs = (await this.repository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        city: true,
        uf: true,
        whatsapp: true,
        createdAt: true,
        updatedAt: true,
      },
    })) as Omit<Ong, 'password'>[];

    return ongs;
  }

  async findById(id: string): Promise<Ong> {
    const ongExists = await this.repository.findUnique({
      where: {
        id,
      },
    });

    if (!ongExists) return null;

    return ongExists;
  }

  async findByIdOmitPassword(id: string): Promise<OngOmitPassword> {
    const ongExists = await this.repository.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        password: false,
        city: true,
        whatsapp: true,
        uf: true,
        avatar: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!ongExists) return null;

    return ongExists;
  }

  async findByIdWithDetails(id: string): Promise<OngWithDetails> {
    const ongExists = await this.repository.findUnique({
      where: {
        id,
      },
      include: {
        incidents: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!ongExists) return null;

    return ongExists;
  }

  async findByEmail(email: string): Promise<Ong> {
    const ongExists = await this.repository.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!ongExists) return null;

    return ongExists;
  }

  async create(createOngDto: CreateOngDto): Promise<void> {
    await this.repository.create({
      data: createOngDto,
    });
  }
}
