'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  FileBarChart,
  Settings,
  LogOut,
  Wrench,
  Menu,
  X,
  AppWindow,
} from 'lucide-react';

const links = [
  { href: '/car-console/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/car-console/appointments', label: 'Appointments', icon: AppWindow },
  { href: '/car-console/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/car-console/reports', label: 'Reports', icon: FileBarChart },
  { href: '/car-console/settings', label: 'Settings', icon: Settings },
];

const NAV_LABEL = 'Malaika';
const NAV_SUB = 'Workshop Console';

export function CarConsoleShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isLogin = path === '/car-console' || path === '/car-console/login';

  const logout = async () => {
    try {
      await fetch('/api/car-console/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.replace('/car-console');
    router.refresh();
  };

  if (isLogin) {
    return <>{children}</>;
  }

  const navContent = (
    <>
      <div className="flex items-center justify-between px-2">
        <Link href="/car-console/dashboard" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal text-white shadow-lg shadow-teal/30">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-bold text-white">{NAV_LABEL}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-teal">
              {NAV_SUB}
            </span>
          </span>
        </Link>
        <button
          className="rounded-md p-1.5 text-slate-300 hover:text-white lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 space-y-1.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== '/car-console/dashboard' && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-teal text-white shadow-lg shadow-teal/25'
                  : 'text-slate-300/90 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300/90 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-offwhite text-navy lg:flex">
      {/* Desktop sidebar */}
      <aside className="relative sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-hidden bg-navy px-4 py-6 lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
        <div className="relative flex h-full flex-col">{navContent}</div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col overflow-hidden bg-navy px-4 py-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
            <div className="relative flex h-full flex-col">{navContent}</div>
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-offwhite/90 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-white">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold text-navy">{NAV_LABEL}</span>
          </div>
          <button
            className="rounded-md border border-line p-2 text-navy hover:bg-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <main className="overflow-x-hidden p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
