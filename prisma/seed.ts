import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import data from '../src/data/fixpoint-data.json';

const prisma = new PrismaClient();

type SeedContact = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
};

function daysAgo(days: number, hour = 10, minute = 30) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

function buildSampleBookings(): SeedContact[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const at = (hours: number, minutes = 0) => {
    const d = new Date(today);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  return [
    // Today — active / in-progress work
    { name: 'Ahmed Raza', email: 'ahmed.raza@gmail.com', phone: '+92 300 111 2233', subject: 'General Service', message: 'Car is due for the regular 10,000 km service. Please check brakes too.', status: 'REPLIED', createdAt: at(9, 10), updatedAt: at(9, 10) },
    { name: 'Sana Malik', email: 'sana.malik@yahoo.com', phone: '+92 321 222 3344', subject: 'Oil Change', message: 'Need a synthetic oil change and filter replacement.', status: 'NEW', createdAt: at(9, 45), updatedAt: at(9, 45) },
    { name: 'Bilal Hussain', email: 'bilal.h@gmail.com', phone: '+92 333 555 6677', subject: 'Brake Repair', message: 'Squeaking noise when braking. Front pads need inspection.', status: 'READ', createdAt: at(10, 20), updatedAt: at(10, 20) },
    { name: 'Fatima Noor', email: 'fatima.noor@outlook.com', phone: '+92 345 777 8899', subject: 'AC Service', message: 'AC not cooling well, needs regas and filter cleaning.', status: 'NEW', createdAt: at(11, 5), updatedAt: at(11, 5) },

    // Recently completed / archived
    { name: 'Usman Ali', email: 'usman.ali@gmail.com', phone: '+92 300 111 4455', subject: 'Engine Repair', message: 'Engine overheating, water pump replaced. All done, running smooth now.', status: 'ARCHIVED', createdAt: daysAgo(1, 14), updatedAt: daysAgo(1, 14) },
    { name: 'Hira Shah', email: 'hira.shah@gmail.com', phone: '+92 321 333 5566', subject: 'Battery Replacement', message: 'Battery was dead, replaced with new one. Completed.', status: 'ARCHIVED', createdAt: daysAgo(2, 11), updatedAt: daysAgo(2, 11) },
    { name: 'Imran Khan', email: 'imran.k@gmail.com', phone: '+92 333 999 1122', subject: 'Tyre Replacement', message: 'Two front tyres replaced and wheel alignment done. All good.', status: 'ARCHIVED', createdAt: daysAgo(3, 15), updatedAt: daysAgo(3, 15) },
    { name: 'Zainab Fatima', email: 'zainab.f@gmail.com', phone: '+92 345 444 7788', subject: 'Wheel Alignment', message: 'Steering pulling to the left. Alignment and balancing done.', status: 'ARCHIVED', createdAt: daysAgo(4, 12), updatedAt: daysAgo(4, 12) },
    { name: 'Hamza Yousaf', email: 'hamza.y@gmail.com', phone: '+92 300 222 8899', subject: 'Clutch Repair', message: 'Clutch plate replaced. Completed and tested.', status: 'ARCHIVED', createdAt: daysAgo(5, 10), updatedAt: daysAgo(5, 10) },

    // In progress / confirmed recently
    { name: 'Ayesha Siddiqui', email: 'ayesha.s@gmail.com', phone: '+92 321 555 9900', subject: 'Transmission Service', message: 'Automatic gearbox service, fluid flush requested.', status: 'REPLIED', createdAt: daysAgo(6, 9), updatedAt: daysAgo(6, 9) },
    { name: 'Fahad Malik', email: 'fahad.m@gmail.com', phone: '+92 333 666 2233', subject: 'Suspension Check', message: 'Bumpy ride, need suspension inspection and shock absorber check.', status: 'REPLIED', createdAt: daysAgo(7, 13), updatedAt: daysAgo(7, 13) },
    { name: 'Maryam Khan', email: 'maryam.k@gmail.com', phone: '+92 345 222 6655', subject: 'Exhaust Repair', message: 'Loud noise from exhaust. Confirmed booking for inspection.', status: 'READ', createdAt: daysAgo(8, 11), updatedAt: daysAgo(8, 11) },
    { name: 'Omar Sheikh', email: 'omar.s@gmail.com', phone: '+92 300 888 7766', subject: 'General Service', message: 'Annual maintenance check-up booked.', status: 'READ', createdAt: daysAgo(9, 10), updatedAt: daysAgo(9, 10) },
    { name: 'Nida Abbas', email: 'nida.a@gmail.com', phone: '+92 321 777 4433', subject: 'Car Detailing', message: 'Full interior and exterior detailing requested.', status: 'REPLIED', createdAt: daysAgo(10, 12), updatedAt: daysAgo(10, 12) },

    // Older, various statuses
    { name: 'Salman Butt', email: 'salman.b@gmail.com', phone: '+92 333 444 1122', subject: 'Oil Change', message: 'Regular oil change with engine flush.', status: 'ARCHIVED', createdAt: daysAgo(12, 9), updatedAt: daysAgo(12, 9) },
    { name: 'Rabia Tariq', email: 'rabia.t@gmail.com', phone: '+92 345 666 9900', subject: 'Headlight Upgrade', message: 'Want LED headlight upgrade for better night visibility.', status: 'NEW', createdAt: daysAgo(6, 16), updatedAt: daysAgo(6, 16) },
    { name: 'Taimoor Afzal', email: 'taimoor.a@gmail.com', phone: '+92 300 555 6677', subject: 'Brake Repair', message: 'Rear brake pads and discs replacement.', status: 'ARCHIVED', createdAt: daysAgo(14, 11), updatedAt: daysAgo(14, 11) },
    { name: 'Khadija Bano', email: 'khadija.b@gmail.com', phone: '+92 321 444 8899', subject: 'AC Service', message: 'AC compressor making noise, needs diagnosis.', status: 'READ', createdAt: daysAgo(7, 15), updatedAt: daysAgo(7, 15) },
    { name: 'Waleed Iqbal', email: 'waleed.i@gmail.com', phone: '+92 333 222 7766', subject: 'Battery Replacement', message: 'Battery warning light, check and replace if needed.', status: 'ARCHIVED', createdAt: daysAgo(16, 10), updatedAt: daysAgo(16, 10) },
    { name: 'Mahnoor Zaidi', email: 'mahnoor.z@gmail.com', phone: '+92 345 111 3344', subject: 'General Service', message: 'Full service plus coolant top-up.', status: 'REPLIED', createdAt: daysAgo(11, 13), updatedAt: daysAgo(11, 13) },
    { name: 'Adnan Baig', email: 'adnan.b@gmail.com', phone: '+92 300 999 5566', subject: 'Transmission Service', message: 'Manual gearbox oil change.', status: 'ARCHIVED', createdAt: daysAgo(18, 11), updatedAt: daysAgo(18, 11) },
    { name: 'Shaista Rahim', email: 'shaista.r@gmail.com', phone: '+92 321 888 6677', subject: 'Tyre Replacement', message: 'Need all four tyres, prefer all-season.', status: 'NEW', createdAt: daysAgo(4, 16), updatedAt: daysAgo(4, 16) },
    { name: 'Ehsan Qureshi', email: 'ehsan.q@gmail.com', phone: '+92 333 555 9900', subject: 'Car Detailing', message: 'Quick exterior wash and polish package.', status: 'READ', createdAt: daysAgo(13, 12), updatedAt: daysAgo(13, 12) },
    { name: 'Alina Saeed', email: 'alina.s@gmail.com', phone: '+92 345 333 8866', subject: 'Engine Repair', message: 'Timing belt replacement quote request.', status: 'NEW', createdAt: daysAgo(2, 17), updatedAt: daysAgo(2, 17) },
  ];
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');

  // Admin user
  await prisma.user.upsert({
    where: { email },
    update: { name: 'Administrator', passwordHash: await bcrypt.hash(password, 12), role: 'ADMIN', isActive: true },
    create: { email, name: 'Administrator', passwordHash: await bcrypt.hash(password, 12), role: 'ADMIN' },
  });

  // Services
  for (const s of data.services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: { title: s.title, slug: s.slug, description: s.description, icon: s.icon, published: true, featured: true },
    });
  }

  // Testimonials (sample)
  for (const t of data.testimonials) {
    await prisma.testimonial.create({ data: { name: t.name, role: t.vehicle, message: t.quote, rating: t.rating, published: true } }).catch(() => undefined);
  }

  // Sample bookings (ContactMessage => appointments)
  const bookings = buildSampleBookings();
  for (const b of bookings) {
    await prisma.contactMessage.create({
      data: {
        name: b.name,
        email: b.email,
        phone: b.phone,
        subject: b.subject,
        message: b.message,
        status: b.status,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      },
    });
  }

  console.log(`Seeded ${bookings.length} sample bookings.`);
}

main().finally(() => prisma.$disconnect());
