import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { carConsoleGuard } from '@/lib/car-console-guard';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        const s = new Date(startDate);
        s.setHours(0, 0, 0, 0);
        where.createdAt.gte = s;
      }
      if (endDate) {
        const e = new Date(endDate);
        e.setHours(23, 59, 59, 999);
        where.createdAt.lte = e;
      }
    }

    const orderBy =
      sort === 'oldest'
        ? { createdAt: 'asc' as const }
        : sort === 'name'
        ? { name: 'asc' as const }
        : { createdAt: 'desc' as const };

    const [total, items] = await Promise.all([
      db.contactMessage.count({ where }),
      db.contactMessage.findMany({
        where,
        orderBy,
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
    ]);

    // Count by status for filter convenience
    const statusCounts = await db.contactMessage.groupBy({
      by: ['status'],
      where: {
        ...(search ? where : {}),
      },
      _count: { _all: true },
    });

    const data = items.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      service: r.subject || 'General service',
      notes: r.message,
      status: r.status,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data,
      meta: {
        total,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
        statusCounts: statusCounts.map((s) => ({ status: s.status, count: s._count._all })),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to load appointments' },
      { status: 500 }
    );
  }
}

const VALID_STATUSES = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];

export async function POST(request: Request) {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const body = await request.json();
    const { id, status } = body || {};

    if (!id || !status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Valid ID and status are required' },
        { status: 400 }
      );
    }

    // Verify the record exists before updating
    const existing = await db.contactMessage.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to update appointment' },
      { status: 500 }
    );
  }
}
