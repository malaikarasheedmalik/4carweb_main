'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Building2, ArrowRight } from 'lucide-react';
import { nav, business } from '@/lib/nexora-data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-300 ease-smooth',
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-line shadow-premium'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className={cn('font-display text-lg font-bold tracking-tight', scrolled ? 'text-navy' : 'text-navy')}>
                NEXORA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-teal font-semibold">
                TALENT
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-navy'
                      : scrolled
                        ? 'text-slate hover:text-navy'
                        : 'text-slate hover:text-navy'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-teal"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden xl:block">
            <Link
              href="/employers"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-dark hover:shadow-glow"
            >
              Hire Talent
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white border-b border-line xl:hidden"
          >
            <ul className="flex flex-col px-4 py-3 sm:px-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-3 py-3 text-base font-medium transition-colors',
                      isActive(item.href) ? 'bg-ice text-navy' : 'text-slate hover:bg-ice hover:text-navy'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/employers"
                  className="block rounded-xl bg-teal px-3 py-3 text-center text-base font-semibold text-white"
                >
                  Hire Talent
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
