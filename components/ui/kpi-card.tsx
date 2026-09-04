'use client';

import { ReactNode } from 'react';

export interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export function KpiCard({ title, value, description, Icon }: KpiCardProps) {
  const valueStr = typeof value === 'number' ? value.toString() : value;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] white/60 mb-1">{title}</p>
          <p className="font-display text-3xl font-bold text-white">{valueStr}</p>
        </div>
        <Icon className="h-6 w-6 text-terracotta" />
      </div>
      {description && (
        <p className="mt-2 text-sm white/60">{description}</p>
      )}
    </div>
  );
}