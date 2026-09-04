import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { carConsoleGuard } from '@/lib/car-console-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'all'; // all | today | upcoming | pending | confirmed | inprogress | completed
    const date = searchParams.get('date') || '';

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    let where: any = {};

    if (date) {
      const target = new Date(date);
      const s = new Date(target.getFullYear(), target.getMonth(), target.getDate(), 0, 0, 0, 0);
      const e = new Date(target.getFullYear(), target.getMonth(), target.getDate(), 23, 59, 59, 999);
      where.createdAt = { gte: s, lte: e };
    } else {
      switch (mode) {
        case 'today':
          where.createdAt = { gte: startOfToday, lt: startOfTomorrow };
          break;
        case 'upcoming':
          where.createdAt = { gte: startOfTomorrow };
          break;
        case 'pending':
          where.status = 'NEW';
          break;
        case 'confirmed':
          where.status = 'READ';
          break;
        case 'inprogress':
          where.status = 'REPLIED';
          break;
        case 'completed':
          where.status = 'ARCHIVED';
          break;
        default:
          break;
      }
    }

    const items = await db.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    const events = items.map((item) => ({
      id: item.id,
      title: `${item.name} — ${item.subject || 'Service'}`,
      start: item.createdAt,
      status: item.status,
      customer: item.name,
      email: item.email,
      phone: item.phone,
      service: item.subject || 'General service',
      notes: item.message,
      createdAt: item.createdAt,
    }));

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to load calendar' },
      { status: 500 }
    );
  }
}
