import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { carConsoleGuard } from '@/lib/car-console-guard';

export const dynamic = 'force-dynamic';

export async function GET() {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const [
      totalAppointments,
      todayAppointments,
      pendingAppointments,
      confirmedAppointments,
      inProgressRepairs,
      completedRepairs,
      totalCustomers,
      recentAppointments,
      appointmentsByStatus,
    ] = await Promise.all([
      db.contactMessage.count(),
      db.contactMessage.count({ where: { createdAt: { gte: startOfToday, lte: endOfToday } } }),
      db.contactMessage.count({ where: { status: 'NEW' } }),
      db.contactMessage.count({ where: { status: 'READ' } }),
      db.contactMessage.count({ where: { status: 'REPLIED' } }),
      db.contactMessage.count({ where: { status: 'ARCHIVED' } }),
      db.contactMessage
        .findMany({ select: { email: true }, distinct: ['email'] })
        .then((rows) => rows.length),
      db.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
      db.contactMessage.groupBy({ by: ['status'], _count: { _all: true } }),
    ]);

    const statusOverview = appointmentsByStatus.map((s) => ({
      status: s.status,
      count: s._count._all,
    }));

    const recent = recentAppointments.map((r) => ({
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
      data: {
        totalAppointments,
        todayAppointments,
        pendingAppointments,
        confirmedAppointments,
        inProgressRepairs,
        completedRepairs,
        totalCustomers,
        recentAppointments: recent,
        appointmentsByStatus: statusOverview,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to load dashboard' },
      { status: 500 }
    );
  }
}
