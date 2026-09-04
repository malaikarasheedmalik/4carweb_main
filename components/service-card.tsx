'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Service } from '@/lib/data';
import { fadeUp } from '@/lib/animations';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] ?? Icons.Wrench;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-beige bg-offwhite shadow-warm hover:shadow-card-hover-teal transition-shadow duration-500"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110 group-hover:rotate-1"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/70 via-burgundy/10 to-transparent transition-opacity duration-300 group-hover:from-burgundy/80" />
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-offwhite/95 text-terracotta shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="h-5 w-5" />
        </span>
        <span className="absolute bottom-3 right-3 translate-y-0 rounded-full bg-offwhite/90 px-3 py-1 text-xs font-semibold text-burgundy opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1">
          from ${service.priceFrom}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-burgundy group-hover:text-terracotta transition-colors duration-300">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-warmgray">{service.short}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
        >
          Learn more
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-rotate-6" />
        </Link>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-terracotta to-teal transition-transform duration-500 ease-smooth group-hover:scale-x-100" />
    </motion.div>
  );
}
