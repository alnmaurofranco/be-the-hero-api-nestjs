import { PartialType } from '@nestjs/mapped-types';
import { CreateOngDto } from './create-ong.dto';

export class UpdateOngDto extends PartialType(CreateOngDto) {}
