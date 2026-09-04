'use client';

import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { PageHeader, StatusBadge, LoadingState, ErrorNote, EmptyState } from '@/components/car-console-ui';

type ReportsData = {
  totalAppointments: number;
  completedRepairs: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  inProgressRepairs: number;
  statusCounts: { status: string; count: number }[];
  dailyTrend: { date: string; count: number }[];
  weeklyTrend: { label: string; count: number }[];
  monthlyTrend: { label: string; count: number }[];
  popularServices: { name: string; count: number }[];
  rangeDays: number;
};

const RANGES = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
];

export default function ReportsPage() {
  const [data, setData] = useState<ReportsData | null>(null);
  const [range, setRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async (r: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/car-console/reports?range=${r}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Unable to load reports');
      } else {
        setData(json.data);
      }
    } catch {
      setError('Unable to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(range);
  }, [range]);

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Workshop performance analytics drawn from live booking data."
        actions={
          <div className="flex gap-2">
            {RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRange(r.value)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  range === r.value
                    ? 'bg-teal text-white'
                    : 'border border-line bg-white text-navy hover:bg-ice'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      {loading ? (
        <LoadingState message="Loading reports…" />
      ) : error ? (
        <ErrorNote message={error} />
      ) : !data ? (
        <EmptyState title="No report data available" />
      ) : (
        <div className="space-y-6">
          {/* Headline metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            <Metric label="Total" value={data.totalAppointments} />
            <Metric label="Pending" value={data.pendingAppointments} />
            <Metric label="Confirmed" value={data.confirmedAppointments} />
            <Metric label="In Progress" value={data.inProgressRepairs} />
            <Metric label="Completed" value={data.completedRepairs} />
            <Metric label="Range (days)" value={data.rangeDays} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartCard title="Daily appointments trend">
              {data.dailyTrend.every((d) => d.count === 0) ? (
                <ChartEmpty />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 88%)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} stroke="hsl(215 20% 35%)" />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215 20% 35%)" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(174 72% 40%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            <ChartCard title="Weekly appointments">
              {data.weeklyTrend.every((d) => d.count === 0) ? (
                <ChartEmpty />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={data.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 88%)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(215 20% 35%)" />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215 20% 35%)" />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="hsl(174 65% 33%)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartCard title="Monthly appointments">
              {data.monthlyTrend.every((d) => d.count === 0) ? (
                <ChartEmpty />
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={data.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(215 25% 88%)" />
                    <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(215 20% 35%)" />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="hsl(215 20% 35%)" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(222 47% 11%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            {/* Popular services */}
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-navy">Popular services</h2>
              {data.popularServices.length === 0 ? (
                <p className="text-sm text-slate">No service data in this range yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.popularServices.map((s) => (
                    <div key={s.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-semibold text-navy">{s.name}</span>
                        <span className="text-slate">{s.count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-ice">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal to-teal-dark"
                          style={{
                            width: `${data.totalAppointments ? (s.count / data.totalAppointments) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status breakdown */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-navy">Status breakdown (all time)</h2>
            {data.statusCounts.length === 0 ? (
              <p className="text-sm text-slate">No status data available yet.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {data.statusCounts.map((s) => (
                  <div key={s.status} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2">
                    <StatusBadge status={s.status} />
                    <span className="text-sm font-semibold text-navy">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 text-center shadow-sm">
      <div className="font-display text-2xl font-bold text-navy">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate">{label}</div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-navy">{title}</h2>
      {children}
    </div>
  );
}

function ChartEmpty() {
  return (
    <div className="flex h-[260px] items-center justify-center text-sm text-slate">
      No data in this range yet.
    </div>
  );
}
