export class CreateOngDto {
  name: string;
  email: string;
  password: string;
  whatsapp: string;
  city: string;
  uf: string;
  avatar?: string;
  hasProvider?: 'FACEBOOK' | 'GOOGLE';
}
