'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, RotateCcw, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  LoadingState,
  ErrorNote,
  EmptyState,
  SectionCard,
  formatDateTime,
  statusLabel,
} from '@/components/car-console-ui';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'NEW', label: 'Pending' },
  { value: 'READ', label: 'Confirmed' },
  { value: 'REPLIED', label: 'In Progress' },
  { value: 'ARCHIVED', label: 'Completed' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name', label: 'Customer name' },
];

type Appt = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  notes: string;
  status: string;
  createdAt: string;
};

type Meta = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  statusCounts: { status: string; count: number }[];
};

export default function AppointmentsPage() {
  const [rows, setRows] = useState<Appt[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Appt | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (search) params.set('search', search);
      if (startDate) params.set('startDate', startDate);
      if (endDate) params.set('endDate', endDate);
      params.set('sort', sort);
      params.set('page', String(page));

      const res = await fetch(`/api/car-console/appointments?${params.toString()}`, { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || 'Unable to load appointments');
      } else {
        setRows(json.data);
        setMeta(json.meta);
      }
    } catch {
      setError('Unable to load appointments');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, startDate, endDate, sort, page]);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetFilters = () => {
    setStatusFilter('');
    setSearch('');
    setSearchInput('');
    setStartDate('');
    setEndDate('');
    setSort('newest');
    setPage(1);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await fetch('/api/car-console/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setFeedback({ type: 'error', msg: json.error || 'Failed to update status' });
      } else {
        setFeedback({ type: 'success', msg: 'Appointment updated successfully' });
        fetchData();
      }
    } catch {
      setFeedback({ type: 'error', msg: 'Failed to update status' });
    } finally {
      setUpdatingId(null);
    }
  };

  const gotoPage = (p: number) => {
    if (p < 1 || (meta && p > meta.totalPages)) return;
    setPage(p);
  };

  return (
    <div>
      <PageHeader title="Appointments" subtitle="Manage all booking requests from your workshop." />

      {feedback && (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-red-300 bg-red-50 text-red-700'
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Filters */}
      <div className="mb-5 rounded-2xl border border-line bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="relative lg:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Search</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name, phone, email, or service"
                className="w-full rounded-lg border border-line bg-white py-2 pl-10 pr-3 text-sm text-navy placeholder:text-slate focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">From</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">To</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-navy hover:bg-ice"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      {meta && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {meta.statusCounts.length > 0 && meta.statusCounts.map((s) => (
            <span key={s.status} className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-line">
              {statusLabel(s.status).label}: <span className="font-semibold text-slate-700">{s.count}</span>
            </span>
          ))}
        </div>
      )}

      {loading ? (
        <LoadingState message="Loading appointments…" />
      ) : error ? (
        <ErrorNote message={error} />
      ) : rows.length === 0 ? (
        <EmptyState title="No appointments found" message="Try adjusting your search or filters." />
      ) : (
        <SectionCard>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-line text-sm">
              <thead className="bg-ice">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Contact</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Service</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Received</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((a) => (
                  <tr key={a.id} className="hover:bg-ice/60">
                    <td className="whitespace-nowrap px-5 py-3">
                      <div className="font-semibold text-navy">{a.name}</div>
                      <div className="text-xs text-slate">{a.id.slice(-6)}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-slate">{a.phone || '—'}</div>
                      <div className="text-xs text-slate">{a.email}</div>
                    </td>
                    <td className="px-5 py-3 text-slate">{a.service}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-500">{formatDateTime(a.createdAt)}</td>
                    <td className="px-5 py-3"><StatusBadge status={a.status} /></td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <button
                        onClick={() => setDetail(a)}
                        className="rounded-lg p-1.5 text-slate hover:bg-ice hover:text-slate"
                        title="View details"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                      {updatingId === a.id ? (
                        <span className="ml-1 text-xs text-slate">Updating…</span>
                      ) : (
                        <>
                          {a.status !== 'READ' && (
                            <button
                              onClick={() => updateStatus(a.id, 'READ')}
                              className="ml-1 rounded-lg bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-200"
                            >
                              Confirm
                            </button>
                          )}
                          {a.status !== 'REPLIED' && (
                            <button
                              onClick={() => updateStatus(a.id, 'REPLIED')}
                              className="ml-1 rounded-lg bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 hover:bg-violet-200"
                            >
                              In Progress
                            </button>
                          )}
                          {a.status !== 'ARCHIVED' && (
                            <button
                              onClick={() => updateStatus(a.id, 'ARCHIVED')}
                              className="ml-1 rounded-lg bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
                            >
                              Completed
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-line px-5 py-3">
              <div className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">{meta.total === 0 ? 0 : (meta.page - 1) * meta.pageSize + 1}</span>–
                <span className="font-medium text-slate-700">{Math.min(meta.page * meta.pageSize, meta.total)}</span> of{' '}
                <span className="font-medium text-slate-700">{meta.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => gotoPage(page - 1)}
                  disabled={page <= 1}
                  className="rounded-lg border border-line p-2 text-navy hover:bg-ice disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-slate">Page {page} / {meta.totalPages}</span>
                <button
                  onClick={() => gotoPage(page + 1)}
                  disabled={page >= meta.totalPages}
                  className="rounded-lg border border-line p-2 text-navy hover:bg-ice disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </SectionCard>
      )}

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetail(null)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-navy">Appointment details</h3>
              <button onClick={() => setDetail(null)} className="rounded-lg p-1 text-slate hover:bg-ice">
                <RotateCcw className="h-4 w-4 rotate-45" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Customer</p>
                <p className="text-navy">{detail.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Status</p>
                <p><StatusBadge status={detail.status} /></p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Phone</p>
                <p className="text-navy">{detail.phone || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Email</p>
                <p className="text-navy">{detail.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Service</p>
                <p className="text-navy">{detail.service}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate">Received</p>
                <p className="text-navy">{formatDateTime(detail.createdAt)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold uppercase text-slate">Record ID</p>
                <p className="break-all text-slate">{detail.id}</p>
              </div>
              {detail.notes && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase text-slate">Message / Notes</p>
                  <p className="whitespace-pre-wrap text-slate-700">{detail.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setDetail(null)}
                className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
