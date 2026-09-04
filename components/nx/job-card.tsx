'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, ArrowRight } from 'lucide-react';
import type { Job } from '@/lib/nexora-data';
import { fadeUp } from '@/lib/nexora-animations';

export function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-premium transition-shadow hover:shadow-premium-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
            {job.industry}
          </span>
          <h3 className="mt-3 font-display text-lg font-bold text-navy">{job.title}</h3>
          <p className="mt-1 text-sm font-medium text-slate">{job.company}</p>
        </div>
        <button
          aria-label="Save job"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-slate transition-colors hover:border-teal hover:text-teal"
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <span className="flex items-center gap-2 text-slate">
          <MapPin className="h-4 w-4 text-teal" /> {job.location}
        </span>
        <span className="flex items-center gap-2 text-slate">
          <Briefcase className="h-4 w-4 text-teal" /> {job.type}
        </span>
        <span className="flex items-center gap-2 text-slate">
          <DollarSign className="h-4 w-4 text-teal" /> {job.salary}
        </span>
        <span className="flex items-center gap-2 text-slate">
          <Clock className="h-4 w-4 text-teal" /> {job.level}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs text-slate/70">{job.posted}</span>
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-teal"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
