import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

const prisma = new PrismaService();

async function ExecuteScript() {
  const password = await hash('D#Byh1l!$rqw', 9);

  const ong_admin = await prisma.ong.create({
    data: {
      name: 'Admin',
      email: 'admin@bethehero.com',
      password,
      whatsapp: '1187670044',
      city: 'São Paulo',
      uf: 'SP',
      avatar: null,
      isAdmin: true,
    },
  });

  console.dir(ong_admin, { depth: null });
}

ExecuteScript()
  .then(() => console.log(`✅ well done`))
  .catch((err) => console.log(`❌ ${err}`));
