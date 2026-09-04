'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench } from 'lucide-react';
import Link from 'next/link';
import { business, images } from '@/lib/data';
import { fadeUp, viewportOnce, iconBounce } from '@/lib/animations';
import { LineLoop } from '@/components/line-loop';
import { ParticleBackground } from '@/components/particle-background';
import { MagneticButton } from '@/components/magnetic-button';

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images.ctaBg}
          alt={images.ctaAlt}
          fill
          priority={false}
          className="object-cover"
          sizes="100vw"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={images.ctaBg}
          className="cta-video absolute inset-0 h-full w-full object-cover opacity-60"
          aria-hidden="true"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fire-flames-burning-in-the-dark-4079-large.mp4" type="video/mp4" />
        </video>
        <div className="cta-flame-overlay absolute inset-0" />
      </div>
      <ParticleBackground count={12} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="inline-flex items-center gap-2 rounded-full bg-offwhite/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-beige backdrop-blur"
        >
          <Wrench className="h-3.5 w-3.5 animate-spin-slow" />
          {business.tagline}
        </motion.span>
        <div className="mt-5">
          <LineLoop lines={[
            { text: 'Ready to get your car back to its best?', className: 'font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl text-balance' },
            { text: "Book online in under two minutes, or call us — we'll have you sorted with an honest quote and a time that works.", className: 'mx-auto mt-4 max-w-xl text-base text-offwhite/80 sm:text-lg' },
          ]} />
        </div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.24 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton href="/book" className="rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite shadow-md shadow-terracotta/30">
            <span className="flex items-center gap-2">
              Book a Service
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </MagneticButton>
          <MagneticButton href={business.phoneHref} className="rounded-lg border border-offwhite/30 bg-offwhite/5 px-6 py-3 text-sm font-semibold text-offwhite backdrop-blur">
            <span className="flex items-center gap-2">Call {business.phone}</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
