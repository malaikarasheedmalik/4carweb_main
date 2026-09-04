'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import type { TeamMember } from '@/lib/nexora-data';
import { fadeUp } from '@/lib/nexora-animations';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-2xl border border-line bg-white shadow-premium transition-shadow hover:shadow-premium-lg"
    >
      <div className="relative h-80 overflow-hidden">
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        <a
          href={member.linkedin}
          aria-label={`${member.name} on LinkedIn`}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-teal hover:text-white"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-navy">{member.name}</h3>
        <p className="text-sm font-semibold text-teal">{member.role}</p>
        <p className="mt-1 text-xs text-slate">{member.specialization}</p>
      </div>
    </motion.div>
  );
}
