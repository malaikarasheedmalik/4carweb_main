import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { carConsoleGuard } from '@/lib/car-console-guard';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30'; // days back for trends

    const days = Math.max(1, parseInt(range, 10) || 30);
    const now = new Date();
    const since = new Date(now);
    since.setDate(since.getDate() - (days - 1));
    since.setHours(0, 0, 0, 0);

    const [todayItems, recentItems, allStatusRows, services] = await Promise.all([
      db.contactMessage.findMany({ select: { status: true } }),
      db.contactMessage.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: 'asc' } }),
      db.contactMessage.groupBy({ by: ['status'], _count: { _all: true } }),
      db.service.findMany({ select: { id: true, title: true, slug: true }, where: { published: true } }),
    ]);

    const totalAppointments = todayItems.length;
    const completedRepairs = todayItems.filter((m) => m.status === 'ARCHIVED').length;
    const pendingAppointments = todayItems.filter((m) => m.status === 'NEW').length;
    const confirmedAppointments = todayItems.filter((m) => m.status === 'READ').length;
    const inProgressRepairs = todayItems.filter((m) => m.status === 'REPLIED').length;

    const statusCounts: Record<string, number> = {};
    allStatusRows.forEach((s) => {
      statusCounts[s.status] = s._count._all;
    });

    // Daily appointment trends over the range
    const dailyBuckets: { date: string; count: number }[] = [];
    const dayMap = new Map<string, number>();
    recentItems.forEach((m) => {
      const d = m.createdAt;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dayMap.set(key, (dayMap.get(key) || 0) + 1);
    });
    for (let i = 0; i < days; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dailyBuckets.unshift({ date: key, count: dayMap.get(key) || 0 });
    }

    // Weekly breakdown (last 8 weeks)
    const weeklyBuckets: { label: string; count: number }[] = [];
    for (let w = 7; w >= 0; w--) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - w * 7);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      const count = recentItems.filter((m) => m.createdAt >= weekStart && m.createdAt <= weekEnd).length;
      weeklyBuckets.push({
        label: `${weekStart.getDate()}/${weekStart.getMonth() + 1}`,
        count,
      });
    }

    // Monthly breakdown (last 6 months)
    const monthlyBuckets: { label: string; count: number }[] = [];
    const monthMap = new Map<string, number>();
    var allMonthItems = await db.contactMessage.findMany({ select: { createdAt: true } });
    allMonthItems.forEach((m) => {
      const key = `${m.createdAt.getFullYear()}-${String(m.createdAt.getMonth() + 1).padStart(2, '0')}`;
      monthMap.set(key, (monthMap.get(key) || 0) + 1);
    });
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyBuckets.push({
        label: `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`,
        count: monthMap.get(key) || 0,
      });
    }

    // Popular services: map raw subject strings to the services list by matching title/keywords
    const subjectCounts: Record<string, number> = {};
    recentItems.forEach((m) => {
      const subj = (m.subject || (m.message && 'general') || 'General service').trim();
      if (!subj) return;
      const normalized = subj.toLowerCase();
      let matched = 'General service';
      for (const s of services) {
        if (normalized.includes(s.title.toLowerCase()) || normalized.includes(s.slug)) {
          matched = s.title;
          break;
        }
      }
      subjectCounts[matched] = (subjectCounts[matched] || 0) + 1;
    });
    const popularServices = Object.entries(subjectCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return NextResponse.json({
      success: true,
      data: {
        totalAppointments,
        completedRepairs,
        pendingAppointments,
        confirmedAppointments,
        inProgressRepairs,
        statusCounts: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
        dailyTrend: dailyBuckets,
        weeklyTrend: weeklyBuckets,
        monthlyTrend: monthlyBuckets,
        popularServices,
        rangeDays: days,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to load reports' },
      { status: 500 }
    );
  }
}
