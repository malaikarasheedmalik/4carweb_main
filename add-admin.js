const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const passwordHash = '$2b$10$EDa7N5lwNMU7yJUgvKFQhuVvGzbqEt.dSqxdWFoDq.EC7zhWVvI4i';
  const user = await prisma.user.create({
    data: {
      name: 'malaika',
      email: 'malaika',
      passwordHash: passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('Admin user created:', user.id, user.email, user.role);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.log('User may already exist or error:', e.message);
    prisma.$disconnect();
  });