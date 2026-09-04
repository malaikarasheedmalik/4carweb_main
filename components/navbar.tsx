'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Phone, ArrowUpRight } from 'lucide-react';
import { nav, business } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-burgundy text-offwhite shadow-warm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6">
          <span className="hidden items-center gap-2 sm:flex">
            <Phone className="h-3.5 w-3.5 text-beige" />
            {business.phone}
          </span>
          <span className="hidden sm:inline text-beige/80">
            Open Mon–Fri 7:30–6 · Sat 8–4
          </span>
          <span className="sm:hidden text-beige/80">
            {business.phone}
          </span>
        </div>
      </div>

      <div className="bg-offwhite/95 backdrop-blur border-b border-beige">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-burgundy text-offwhite transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              <Wrench className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold text-burgundy">
                FixPoint
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                Garage
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-burgundy'
                      : 'text-warmgray hover:text-burgundy'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-terracotta"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-offwhite shadow-sm transition-all duration-300 hover:bg-terracotta-dark hover:shadow-warm hover:scale-105 active:scale-95"
            >
              Book a Service
              <span className="hidden lg:inline transition-transform duration-300 group-hover:translate-x-1"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-burgundy lg:hidden"
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
            className="overflow-hidden bg-offwhite border-b border-beige lg:hidden"
          >
            <ul className="flex flex-col px-4 py-3 sm:px-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-3 text-base font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-cream text-burgundy'
                        : 'text-warmgray hover:bg-cream hover:text-burgundy'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-terracotta px-3 py-3 text-center text-base font-semibold text-offwhite"
                >
                  Book a Service
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
