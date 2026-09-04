require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'malaika';
  const password = process.env.ADMIN_PASSWORD || 'malaika1970';
  const passwordHash = bcrypt.hashSync(password, 12);
  
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name: 'Administrator', passwordHash, role: 'ADMIN', isActive: true },
      create: { email, name: 'Administrator', passwordHash, role: 'ADMIN', isActive: true },
    });
    console.log('Admin user created:', user.email, user.role);
  } catch (e) {
    console.error('Error creating admin user:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();