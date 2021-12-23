import { Injectable } from '@nestjs/common';
import { CreateOngDto } from './dto/create-ong.dto';
import { UpdateOngDto } from './dto/update-ong.dto';

@Injectable()
export class OngsService {
  create(createOngDto: CreateOngDto) {
    return 'This action adds a new ong';
  }

  findAll() {
    return `This action returns all ongs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ong`;
  }

  update(id: number, updateOngDto: UpdateOngDto) {
    return `This action updates a #${id} ong`;
  }

  remove(id: number) {
    return `This action removes a #${id} ong`;
  }
}
