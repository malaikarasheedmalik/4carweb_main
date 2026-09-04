'use client';

import { services } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Stagger, StaggerItem } from '@/components/reveal';
import { ServiceCard } from '@/components/service-card';
import { CtaBanner } from '@/components/cta-banner';
import { FloatingOrbs } from '@/components/floating-orbs';
import { TiltCard } from '@/components/tilt-card';
import { GradientText } from '@/components/gradient-text';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Car Repair Services"
        subtitle="Reliable maintenance and repairs for all makes and models, carried out by certified technicians with transparent pricing."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="relative bg-white py-20 lg:py-28">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.05)']} className="opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our workshop"
            title={
              <>
                Everything your car <GradientText>needs</GradientText>
              </>
            }
            subtitle="From routine servicing to complex repairs, we diagnose the issue properly and fix it right the first time."
          />
          <Stagger className="mt-12 grid gap-6 lg:grid-cols-2" wave>
            {services.map((s) => (
              <StaggerItem key={s.slug} variant="card">
                <TiltCard>
                  <ServiceCard service={s} />
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
