'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Info } from 'lucide-react';
import { pricing, business } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import { CtaBanner } from '@/components/cta-banner';
import { GradientText } from '@/components/gradient-text';
import { FloatingOrbs } from '@/components/floating-orbs';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Pricing"
        subtitle="Straightforward, transparent pricing on the services we do most. For anything else, we'll give you a free written quote before we start."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]}
      />

      {/* PRICING TABLES */}
      <section className="relative bg-cream py-16 lg:py-24">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.06)']} className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Stagger className="grid gap-8 lg:grid-cols-3">
            {pricing.map((cat) => (
              <StaggerItem key={cat.category}>
                <div className="h-full overflow-hidden rounded-2xl border border-beige bg-offwhite shadow-warm transition-all duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-warm-lg hover:border-terracotta/40">
                  <div className="bg-burgundy px-6 py-5 text-offwhite">
                    <h2 className="font-display text-lg font-bold">{cat.category}</h2>
                  </div>
                  <ul className="divide-y divide-beige">
                    {cat.items.map((item) => (
                      <li key={item.name} className="px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-burgundy">{item.name}</p>
                            <p className="mt-0.5 text-xs text-warmgray">{item.note}</p>
                          </div>
                          <span className="shrink-0 font-display text-base font-bold text-terracotta">
                            {item.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* NOTE */}
          <Reveal variant="up" delay={0.1}>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-beige bg-beige/20 p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
              <p className="text-sm leading-relaxed text-warmgray">
                Prices are a guide for common vehicles and include labour. Final pricing
                depends on your make, model, and parts required — we always confirm with a
                written estimate before starting any work. No surprise charges, ever.
              </p>
            </div>
          </Reveal>

          {/* GUARANTEE BAND */}
          <Reveal variant="up" delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-burgundy px-6 py-8 text-center text-offwhite sm:flex-row sm:text-left">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-10 w-10 shrink-0 text-beige" />
                <div>
                  <h3 className="font-display text-xl font-bold">12-month workmanship guarantee</h3>
                  <p className="mt-1 text-sm text-offwhite/80">
                    On every repair we carry out. Parts carry their own manufacturer warranty too.
                  </p>
                </div>
              </div>
              <Link
                href="/book"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite transition-all hover:bg-terracotta-dark"
              >
                Book now
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
