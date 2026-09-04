'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/nx/animated-counter';
import { fadeUp } from '@/lib/nexora-animations';
import type { business } from '@/lib/nexora-data';

type Stat = { label: string; value: number; suffix: string };

export function StatsSection({
  stats,
  dark = true,
}: {
  stats: Stat[];
  dark?: boolean;
}) {
  return (
    <section className={dark ? 'bg-navy text-white' : 'bg-ice text-navy'}>
      <motion.div
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="px-4 py-6 text-center"
          >
            <p className={`font-display text-4xl font-bold sm:text-5xl ${dark ? 'text-teal' : 'text-teal'}`}>
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className={`mt-2 text-sm ${dark ? 'text-white/60' : 'text-slate'}`}>{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
