'use client';

import type { ReactNode } from 'react';
import { Loader2, Inbox } from 'lucide-react';

export const STATUS_META: Record<string, { label: string; cls: string }> = {
  NEW: { label: 'Pending', cls: 'bg-[#e9f4f2] text-teal-dark ring-teal/25' },
  READ: { label: 'Confirmed', cls: 'bg-navy/5 text-navy ring-navy/20' },
  REPLIED: { label: 'In Progress', cls: 'bg-teal/10 text-teal-dark ring-teal/25' },
  ARCHIVED: { label: 'Completed', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
};

export function statusLabel(status: string) {
  const s = STATUS_META[status] || { label: status || 'Unknown', cls: 'bg-slate-100 text-slate-600 ring-slate-200' };
  return s;
}

export function StatusBadge({ status }: { status: string }) {
  const { label, cls } = statusLabel(status);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>
      {label}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  icon,
  hint,
  accent = 'teal',
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  hint?: string;
  accent?: 'teal' | 'navy';
}) {
  const iconBg = accent === 'teal' ? 'bg-teal/10 text-teal-dark' : 'bg-navy text-white';
  return (
    <div className="group rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-premium">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-teal/40 transition-colors group-hover:bg-teal" />
      </div>
      <div className="mt-4 font-display text-3xl font-bold tracking-tight text-navy">{value}</div>
      <div className="mt-1 text-sm font-medium text-slate">{label}</div>
      {hint && <div className="mt-0.5 text-xs text-slate/60">{hint}</div>}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-dark">
          Workshop Console
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white p-10 text-slate">
      <Loader2 className="h-5 w-5 animate-spin text-teal" />
      <span className="text-sm">{message}</span>
    </div>
  );
}

export function EmptyState({ title = 'No records found', message }: { title?: string; message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-beige-dark bg-white p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
        <Inbox className="h-7 w-7 text-teal" />
      </div>
      <p className="mt-4 font-display text-base font-semibold text-navy">{title}</p>
      {message && <p className="mt-1 max-w-sm text-sm text-slate">{message}</p>}
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

export function SectionCard({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-line bg-white shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-navy">{title}</h2>
        </div>
      )}
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function formatDate(dateIso: string | Date) {
  if (!dateIso) return '—';
  const d = new Date(dateIso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateTime(dateIso: string | Date) {
  if (!dateIso) return '—';
  const d = new Date(dateIso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
