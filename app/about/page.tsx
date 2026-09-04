'use client';

import Link from 'next/link';
import { CheckCircle2, ChevronRight, ShieldCheck, Users, Wrench, Sparkles, Award, Star } from 'lucide-react';
import { business, images } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import { CtaBanner } from '@/components/cta-banner';
import { CinematicImage } from '@/components/cinematic-image';
import { FloatingOrbs } from '@/components/floating-orbs';
import { GradientText } from '@/components/gradient-text';
import { ParallaxWrapper } from '@/components/parallax-wrapper';
import { CountUp } from '@/components/count-up';
import { TiltCard } from '@/components/tilt-card';
import { GlowCard } from '@/components/glow-card';

const values = [
  { icon: Wrench, title: 'Skilled workmanship', text: 'Our certified technicians use professional tools and proven repair methods.' },
  { icon: ShieldCheck, title: 'Honest pricing', text: 'You receive a clear written estimate before we begin any work.' },
  { icon: Users, title: 'Local service', text: 'We build lasting relationships with drivers and families in our community.' },
  { icon: CheckCircle2, title: 'Peace of mind', text: 'Every repair is covered by our 12-month workmanship guarantee.' },
];

const milestones = [
  { value: 2009, suffix: '', label: 'Founded', icon: Award },
  { value: 15, suffix: '+', label: 'Years of service', icon: Star },
  { value: 5000, suffix: '+', label: 'Vehicles repaired', icon: Wrench },
  { value: 12, suffix: ' mo', label: 'Workmanship guarantee', icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About FixPoint Garage" subtitle="A family-run workshop helping Austin drivers stay safe, comfortable and confident on the road since 2009." animateTitle animateSubtitle breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* Our story */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <FloatingOrbs count={3} className="opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10">
            <Reveal variant="blur"><span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Our story</span></Reveal>
            <Reveal variant="dramatic" delay={0.06}><h2 className="mt-2 font-display text-3xl font-bold text-burgundy sm:text-4xl">Good repairs start with <GradientText>trust</GradientText></h2></Reveal>
            <Reveal variant="up" delay={0.12}><p className="mt-5 text-base leading-relaxed text-warmgray">FixPoint Garage was founded in {business.founded} with a simple goal: give local drivers dealership-quality care without the dealership price or pressure.</p></Reveal>
            <Reveal variant="up" delay={0.18}><p className="mt-4 text-base leading-relaxed text-warmgray">Today, our team services everything from daily commuters to family SUVs. We explain what your vehicle needs, use quality parts and stand behind our work.</p></Reveal>
            <Reveal variant="elastic" delay={0.24}>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite transition-all duration-300 hover:bg-terracotta-dark hover:scale-105 active:scale-95">
                Talk to our team
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <Reveal variant="image">
            <ParallaxWrapper speed={0.12}>
              <CinematicImage src={images.aboutStory} alt={images.aboutStoryAlt} />
            </ParallaxWrapper>
          </Reveal>
        </div>
      </section>

      {/* Milestone counters */}
      <section className="relative overflow-hidden bg-burgundy py-16 lg:py-20">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {milestones.map((m) => (
              <StaggerItem key={m.label} variant="card">
                <div className="text-center">
                  <m.icon className="mx-auto mb-3 h-8 w-8 text-beige/80" />
                  <div className="font-display text-3xl font-bold text-offwhite sm:text-4xl">
                    <CountUp to={m.value} suffix={m.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-offwhite/60">{m.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="What matters to us"
            title={
              <>
                The <GradientText>FixPoint</GradientText> difference
              </>
            }
            subtitle="Professional standards, personal service and no unnecessary work."
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title} variant="card">
                <TiltCard tiltAmount={12}>
                  <div className="value-card h-full rounded-2xl border border-beige bg-offwhite p-7 text-center shadow-warm">
                    <v.icon className="mx-auto h-8 w-8 text-terracotta icon-spin-hover" />
                    <h3 className="mt-5 font-display text-lg font-bold text-burgundy">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-warmgray">{v.text}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute inset-0 aurora-bg opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Why choose us"
            title="The FixPoint promise"
            subtitle="We treat every vehicle as if it were our own and every customer like a neighbour."
          />
          <Stagger className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {[
              { icon: Wrench, t: 'ASE-certified technicians', d: 'Professionally trained and up-to-date on the latest systems.' },
              { icon: ShieldCheck, t: '12-month guarantee', d: 'Every repair is backed in writing for your peace of mind.' },
              { icon: CheckCircle2, t: 'Transparent quotes', d: 'Clear, itemised estimates approved by you before any work.' },
              { icon: Users, t: 'Local & family-run', d: 'Proudly independent and rooted in the Austin community.' },
            ].map((item) => (
              <StaggerItem key={item.t} variant="card">
                <GlowCard>
                  <div className="flex items-start gap-4 rounded-2xl border border-beige bg-offwhite p-6 shadow-warm h-full">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-beige/40 text-terracotta">
                      <item.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-burgundy">{item.t}</p>
                      <p className="mt-1 text-sm text-warmgray">{item.d}</p>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
