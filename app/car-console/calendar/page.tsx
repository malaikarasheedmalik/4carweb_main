'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  PageHeader,
  StatusBadge,
  LoadingState,
  ErrorNote,
  EmptyState,
  SectionCard,
  formatDateTime,
  formatDate,
} from '@/components/car-console-ui';

const FILTERS = [
  { value: 'all', label: 'All appointments' },
  { value: 'today', label: 'Today' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

type Event = {
  id: string;
  title: string;
  start: string;
  status: string;
  customer: string;
  email: string;
  phone: string | null;
  service: string;
  notes: string;
  createdAt: string;
};

export default function CalendarPage() {
  const [rows, setRows] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [date, setDate] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filter) params.set('mode', filter);
      if (date) params.set('date', date);

      const res = await fetch(`/api/car-console/calendar?${params.toString()}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Unable to load calendar');
      } else {
        setRows(json.data);
      }
    } catch {
      setError('Unable to load calendar');
    } finally {
      setLoading(false);
    }
  }, [filter, date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <PageHeader title="Calendar" subtitle="View your workshop schedule by day or status." />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setDate('');
              }}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                filter === f.value && !date
                  ? 'bg-teal text-white'
                  : 'border border-line bg-white text-navy hover:bg-ice'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="sm:ml-auto">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setFilter('all');
            }}
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal sm:w-auto"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading calendar…" />
      ) : error ? (
        <ErrorNote message={error} />
      ) : rows.length === 0 ? (
        <EmptyState title="No appointments in this view" message="Choose another filter or date." />
      ) : (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-line bg-white p-4 text-center shadow-sm">
              <div className="font-display text-2xl font-bold text-navy">{rows.filter((r) => r.status === 'NEW').length}</div>
              <div className="text-sm text-slate-500">Pending</div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 text-center shadow-sm">
              <div className="font-display text-2xl font-bold text-navy">{rows.filter((r) => r.status === 'READ').length}</div>
              <div className="text-sm text-slate-500">Confirmed</div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 text-center shadow-sm">
              <div className="font-display text-2xl font-bold text-navy">{rows.filter((r) => r.status === 'REPLIED').length}</div>
              <div className="text-sm text-slate-500">In Progress</div>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4 text-center shadow-sm">
              <div className="font-display text-2xl font-bold text-navy">{rows.filter((r) => r.status === 'ARCHIVED').length}</div>
              <div className="text-sm text-slate-500">Completed</div>
            </div>
          </div>

          <SectionCard>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-line text-sm">
                <thead className="bg-ice">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Date & Time</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Customer</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Vehicle / Service</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-ice/60">
                      <td className="whitespace-nowrap px-5 py-3">
                        <div className="font-semibold text-navy">{formatDate(r.start)}</div>
                        <div className="text-xs text-slate">{new Date(r.start).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-semibold text-navy">{r.customer}</div>
                        <div className="text-xs text-slate">{r.phone || r.email}</div>
                      </td>
                      <td className="px-5 py-3 text-slate">{r.service}</td>
                      <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
}
