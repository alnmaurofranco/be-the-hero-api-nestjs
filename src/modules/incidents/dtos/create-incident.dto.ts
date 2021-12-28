import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateIncidentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number | string;

  ongId: string;
}
