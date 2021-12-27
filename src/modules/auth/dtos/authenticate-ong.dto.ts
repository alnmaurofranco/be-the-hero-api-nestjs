import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateOngDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
