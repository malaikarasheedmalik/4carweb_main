'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  FileBarChart,
  Wallet,
  CheckCheck,
  Wrench,
  Clock,
  Users,
  CalendarClock,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { PageHeader, KpiCard, LoadingState, ErrorNote, SectionCard, StatusBadge, formatDateTime } from '@/components/car-console-ui';

type DashboardData = {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  inProgressRepairs: number;
  completedRepairs: number;
  totalCustomers: number;
  recentAppointments: any[];
  appointmentsByStatus: { status: string; count: number }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/car-console/dashboard', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Unable to load dashboard');
      } else {
        setData(json.data);
      }
    } catch {
      setError('Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingState message="Loading dashboard…" />;
  if (error) {
    return (
      <div className="space-y-4">
        <PageHeader title="Dashboard" subtitle="Workshop overview" />
        <ErrorNote message={error} />
        <button onClick={load} className="rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-dark">
          Retry
        </button>
      </div>
    );
  }

  const d = data!;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statusOverviewLabels: Record<string, string> = {
    NEW: 'Pending',
    READ: 'Confirmed',
    REPLIED: 'In Progress',
    ARCHIVED: 'Completed',
  };

  const statusColor: Record<string, string> = {
    NEW: 'bg-amber-500',
    READ: 'bg-navy',
    REPLIED: 'bg-teal',
    ARCHIVED: 'bg-emerald-500',
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back. Here's what's happening at your workshop today — ${today}.`}
      />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Appointments" value={d.totalAppointments} icon={<Wallet className="h-5 w-5" />} hint="All-time bookings" />
        <KpiCard label="Today's Appointments" value={d.todayAppointments} icon={<CalendarClock className="h-5 w-5" />} hint="Scheduled for today" />
        <KpiCard label="Pending" value={d.pendingAppointments} icon={<Clock className="h-5 w-5" />} hint="Awaiting confirmation" />
        <KpiCard label="Confirmed" value={d.confirmedAppointments} icon={<CheckCheck className="h-5 w-5" />} hint="Confirmed bookings" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="In Progress" value={d.inProgressRepairs} icon={<Wrench className="h-5 w-5" />} hint="Repairs underway" accent="navy" />
        <KpiCard label="Completed" value={d.completedRepairs} icon={<CheckCheck className="h-5 w-5" />} hint="Completed repairs" />
        <KpiCard label="Total Customers" value={d.totalCustomers} icon={<Users className="h-5 w-5" />} hint="Unique contacts" />
        <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-sm">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal/20 blur-3xl" />
          <p className="relative text-sm font-semibold uppercase tracking-wide text-teal">Quick actions</p>
          <div className="relative mt-3 flex flex-col gap-2">
            <Link href="/car-console/appointments" className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/20 hover:text-teal">
              <Wrench className="h-4 w-4 text-teal" /> View appointments
            </Link>
            <Link href="/car-console/calendar" className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/20 hover:text-teal">
              <CalendarDays className="h-4 w-4 text-teal" /> Open calendar
            </Link>
            <Link href="/car-console/reports" className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/20 hover:text-teal">
              <FileBarChart className="h-4 w-4 text-teal" /> View reports
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent appointments */}
        <SectionCard title="Recent appointments" className="lg:col-span-2">
          {d.recentAppointments.length === 0 ? (
            <div className="p-6 text-sm text-slate">No appointments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-line text-sm">
                <thead className="bg-ice">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold uppercase tracking-wide text-slate text-xs">Customer</th>
                    <th className="px-5 py-3 text-left font-semibold uppercase tracking-wide text-slate text-xs">Service</th>
                    <th className="px-5 py-3 text-left font-semibold uppercase tracking-wide text-slate text-xs">Received</th>
                    <th className="px-5 py-3 text-left font-semibold uppercase tracking-wide text-slate text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {d.recentAppointments.map((a) => (
                    <tr key={a.id} className="hover:bg-ice/60">
                      <td className="whitespace-nowrap px-5 py-3 font-semibold text-navy">{a.name}</td>
                      <td className="px-5 py-3 text-slate">{a.service}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-slate">{formatDateTime(a.createdAt)}</td>
                      <td className="px-5 py-3"><StatusBadge status={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="border-t border-line px-5 py-3">
            <Link href="/car-console/appointments" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-dark hover:text-teal">
              View all appointments <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionCard>

        {/* Status overview */}
        <SectionCard title="Status overview">
          {d.appointmentsByStatus.length === 0 ? (
            <div className="p-6 text-sm text-slate">No status data yet.</div>
          ) : (
            <div className="space-y-3 p-5">
              {d.appointmentsByStatus.map((s) => (
                <div key={s.status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy">{statusOverviewLabels[s.status] || s.status}</span>
                    <span className="text-slate">{s.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-ice">
                    <div
                      className={`h-full rounded-full ${statusColor[s.status] || 'bg-slate-400'}`}
                      style={{
                        width: `${d.totalAppointments ? Math.max(4, (s.count / d.totalAppointments) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              {d.recentAppointments.length === 0 && (
                <p className="pt-2 text-xs text-slate/70">Data appears once bookings are received.</p>
              )}
              <div className="pt-2">
                <Link href="/car-console/reports" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-dark hover:text-teal">
                  Open reports <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
