'use client';

import { team, business } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Stagger, StaggerItem } from '@/components/reveal';
import { TeamCard } from '@/components/team-card';
import { CtaBanner } from '@/components/cta-banner';
import { GradientText } from '@/components/gradient-text';
import { FloatingOrbs } from '@/components/floating-orbs';

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Meet Our Team"
        subtitle="Get to know the experienced technicians and service advisors who keep FixPoint Garage running smoothly."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Team' }]}
      />

      <section className="relative bg-white py-20 lg:py-28">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.05)']} className="opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="The people"
            title={
              <>
                Skilled technicians,{' '}
                <GradientText>honest advice</GradientText>
              </>
            }
            subtitle="Our team brings practical experience, factory-level training and a genuine commitment to getting you safely back on the road."
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" scale>
            {team.map((m) => (
              <StaggerItem key={m.name} variant="card">
                <TeamCard member={m} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
