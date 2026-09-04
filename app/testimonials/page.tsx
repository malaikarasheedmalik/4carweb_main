'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials, business } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { TestimonialsGrid } from '@/components/testimonials';
import { Reveal } from '@/components/reveal';
import { CtaBanner } from '@/components/cta-banner';
import { LoopingCounter } from '@/components/looping-counter';
import { CountUp } from '@/components/count-up';
import { GradientText } from '@/components/gradient-text';
import { FloatingOrbs } from '@/components/floating-orbs';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < rating ? 'h-4 w-4 fill-terracotta text-terracotta' : 'h-4 w-4 text-beige-dark'}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const avg = (
    testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <>
      <PageHeader
        title="Customer Reviews"
        subtitle="Real feedback from the drivers who trust us with their cars. We're proud of every star."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]}
      />

      {/* RATING SUMMARY */}
      <section className="relative bg-cream py-14">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.06)']} className="opacity-40" />
        <Reveal variant="up">
          <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 md:flex-row md:justify-center md:gap-12 md:text-left">
            <div>
              <p className="font-display text-6xl font-bold text-burgundy"><CountUp to={5} decimals={1} /></p>
              <div className="mt-1 flex justify-center gap-0.5 md:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-terracotta text-terracotta" />
                ))}
              </div>
              <p className="mt-1 text-sm text-warmgray">Average from {testimonials.length} recent reviews</p>
            </div>
            <div className="hidden h-16 w-px bg-beige md:block" />
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-display text-2xl font-bold text-burgundy"><CountUp to={1800} suffix="+" /></p>
                <p className="text-xs uppercase tracking-wide text-warmgray">Reviews</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-burgundy"><CountUp to={98} suffix="%" /></p>
                <p className="text-xs uppercase tracking-wide text-warmgray">Would recommend</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-burgundy"><CountUp to={24} suffix="k+" /></p>
                <p className="text-xs uppercase tracking-wide text-warmgray">Cars serviced</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REVIEWS GRID */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            center
            eyebrow="What people say"
            title={
              <>
                Don't just take <GradientText>our word</GradientText> for it
              </>
            }
          />
          <div className="mt-12">
            <TestimonialsGrid />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
