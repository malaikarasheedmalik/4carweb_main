'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Stat = { label: string; value: string };

export function RotatingStats({ stats }: { stats: Stat[] }) {
  const [items, setItems] = useState(stats);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setItems((current) => [current[current.length - 1], ...current.slice(0, -1)]);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((stat) => (
        <motion.div
          layout
          key={stat.label}
          transition={{ layout: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
        >
          <p className="font-display text-2xl font-bold text-beige sm:text-3xl">{stat.value}</p>
          <p className="mt-1 text-xs text-white/60">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
