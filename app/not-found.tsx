'use client';

import Link from 'next/link';
import { Wrench, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-cream px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-burgundy text-offwhite">
        <Wrench className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-burgundy">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-warmgray">
        Looks like this page took a wrong turn. Let's get you back on the road.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md"
      >
        <Home className="h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
}
