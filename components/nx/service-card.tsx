'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ChevronRight, Check } from 'lucide-react';
import type { Service } from '@/lib/nexora-data';
import { fadeUp } from '@/lib/nexora-animations';

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] ?? Icons.Briefcase;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-premium transition-shadow hover:shadow-premium-lg"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-teal/5 transition-all duration-500 group-hover:bg-teal/10 group-hover:scale-150" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white transition-colors group-hover:bg-teal">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="relative mt-6 font-display text-xl font-bold text-navy">{service.title}</h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate">{service.short}</p>
      <Link
        href={`/services#${service.id}`}
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-teal-dark"
      >
        Learn More
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

export function ServiceCardDetailed({ service }: { service: Service }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] ?? Icons.Briefcase;
  return (
    <motion.div
      variants={fadeUp}
      id={service.id}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-line bg-white p-8 shadow-premium scroll-mt-28"
    >
      <div className="flex items-start gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white transition-colors group-hover:bg-teal">
          <Icon className="h-7 w-7" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-navy">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">{service.description}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
