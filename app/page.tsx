import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, Clock, ShieldCheck, Star, Wrench, Sparkles, Zap, Award, Heart } from 'lucide-react';
import { business, services, images } from '@/lib/data';
import { SectionHeading } from '@/components/section';
import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import { ServiceCard } from '@/components/service-card';
import { CtaBanner } from '@/components/cta-banner';
import { TestimonialsCarousel } from '@/components/testimonials';
import { WordLoop } from '@/components/word-loop';
import { CinematicImage } from '@/components/cinematic-image';
import { RotatingStats } from '@/components/rotating-stats';
import { FloatingOrbs } from '@/components/floating-orbs';
import { ParticleBackground } from '@/components/particle-background';
import { TextScramble } from '@/components/text-scramble';
import { CountUp } from '@/components/count-up';
import { TiltCard } from '@/components/tilt-card';
import { GlowCard } from '@/components/glow-card';
import { GradientText } from '@/components/gradient-text';
import { ParallaxWrapper } from '@/components/parallax-wrapper';
import { TextRevealOnScroll } from '@/components/text-reveal-on-scroll';

const steps = [
  { n: '01', title: 'Book your visit', text: 'Tell us about your car, the issue and a time that works for you.', icon: Clock },
  { n: '02', title: 'We inspect it', text: 'Our certified technicians diagnose the problem using professional equipment.', icon: Wrench },
  { n: '03', title: 'Approve the quote', text: 'You receive a clear, itemised estimate before any repair begins.', icon: CheckCircle2 },
  { n: '04', title: 'Drive away happy', text: 'We complete the work properly, test the vehicle and keep you informed.', icon: Sparkles },
];

const trustBadges = [
  { icon: ShieldCheck, label: '12-month workmanship guarantee' },
  { icon: CheckCircle2, label: 'Certified technicians' },
  { icon: Clock, label: 'Same-day service available' },
];

const statsData = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: Award },
  { value: 4.9, suffix: '', label: 'Customer Rating', icon: Star },
  { value: 5000, suffix: '+', label: 'Cars Serviced', icon: Wrench },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Heart },
];

export default function Home() {
  return (
    <>
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[calc(100vh-44px)] overflow-hidden bg-burgundy">
        <div className="absolute inset-0">
          <Image src={images.hero} alt={images.heroAlt} fill priority className="object-cover opacity-30" sizes="100vw" />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={images.hero}
            className="hero-video absolute inset-0 h-full w-full object-cover opacity-55"
            aria-hidden="true"
          >
            <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Animated floating orbs */}
        <FloatingOrbs count={4} className="opacity-60" />

        {/* Animated particles */}
        <div className="absolute inset-0 opacity-40">
          <ParticleBackground count={20} />
        </div>

        {/* Gradient orbs with animation */}
        <div className="absolute -right-20 top-1/4 h-96 w-96 animate-float rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 animate-float-slow rounded-full bg-beige/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal variant="blur">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-beige backdrop-blur">
                <Wrench className="h-3.5 w-3.5 animate-spin-slow" />
                {business.tagline}
              </span>
            </Reveal>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
              <WordLoop className="text-beige" />
            </h1>

            <Reveal variant="dramatic" delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Complete car care from a local team you can trust. From routine maintenance to complex diagnostics, we keep your vehicle safe, efficient and road-ready.
              </p>
            </Reveal>

            <Reveal variant="elastic" delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/book"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-terracotta px-7 py-3.5 text-sm font-semibold text-offwhite shadow-lg transition-all duration-300 hover:bg-terracotta-dark hover:shadow-glow-teal hover:scale-105 active:scale-95"
                >
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
                </Link>
                <Link
                  href={business.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-offwhite/25 bg-offwhite/5 px-7 py-3.5 text-sm font-semibold text-offwhite backdrop-blur transition-all duration-300 hover:bg-offwhite/10 hover:border-offwhite/40 hover:scale-105 active:scale-95"
                >
                  Call {business.phone}
                </Link>
              </div>
            </Reveal>

            {/* Floating stats with animation */}
            <RotatingStats stats={business.stats} />
          </div>
        </div>

        {/* Trust badges strip with stagger animation */}
        <div className="relative border-t border-white/10 bg-navy/50 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-sm text-white/60 sm:px-6">
            {trustBadges.map((b, i) => (
              <span key={b.label} className="flex items-center gap-2 animate-slide-blur-in" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'both' }}>
                <b.icon className="h-4 w-4 text-beige" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRUSTED BY SECTION ═══════ */}
      <section className="relative overflow-hidden bg-offwhite py-14 lg:py-16">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="blur">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate">
              Trusted by local drivers since {business.founded}
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {trustBadges.map((p, i) => (
              <Reveal key={p.label} variant="scale" delay={i * 0.08}>
                <span className="font-display text-lg font-bold text-warmgray/70 grayscale transition-all duration-500 hover:text-burgundy hover:grayscale-0 hover:scale-110">
                  <span className="flex items-center gap-2"><p.icon className="h-4 w-4 text-terracotta" />{p.label}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES SECTION ═══════ */}
      <section className="relative bg-cream py-20 lg:py-28">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.06)', 'hsl(174 70% 48% / 0.05)']} className="opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="What we do"
            title={
              <>
                Professional care for{' '}
                <GradientText animate>every vehicle</GradientText>
              </>
            }
            subtitle="From a quick oil change to major engine work, our workshop delivers honest advice and dependable repairs for all makes and models."
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" wave>
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

      {/* ═══════ STATS COUNTER SECTION ═══════ */}
      <section className="relative overflow-hidden bg-burgundy py-16 lg:py-20">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <ParticleBackground count={15} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {statsData.map((stat) => (
              <StaggerItem key={stat.label} variant="card">
                <div className="text-center">
                  <stat.icon className="mx-auto h-8 w-8 text-beige/80 mb-3" />
                  <div className="font-display text-3xl font-bold text-offwhite sm:text-4xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-offwhite/60">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="How it works"
            title="A straightforward service experience"
            subtitle="No confusing jargon and no surprise charges. We keep you informed from check-in to collection."
          />
          <div className="how-it-works-marquee mt-14">
            <div className="how-it-works-track">
              {[...steps, ...steps].map((s, i) => (
                <div className="how-it-works-card" key={`${s.n}-${i}`}>
                  <GlowCard className="h-full">
                    <div className="relative h-full rounded-2xl border border-line bg-white p-7 shadow-premium">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-4xl font-bold text-terracotta/30">{s.n}</span>
                        <s.icon className="h-6 w-6 text-terracotta/40" />
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-burgundy">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-warmgray">{s.text}</p>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="relative bg-burgundy py-20 lg:py-28 overflow-hidden">
        <FloatingOrbs count={3} colors={['hsl(174 72% 40% / 0.1)', 'hsl(174 70% 48% / 0.08)']} className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Why drivers choose us"
            title="Your car is in capable hands"
            subtitle="We combine experienced technicians, quality parts and transparent communication to make servicing easier."
          />

          <Stagger className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {trustBadges.map((item) => (
              <StaggerItem key={item.label} variant="icon">
                <GlowCard>
                  <div className="why-card rounded-2xl border border-offwhite/15 bg-offwhite/5 p-6 text-center">
                    <div className="why-card-text">
                      <item.icon className="mx-auto h-8 w-8 text-beige" />
                      <p className="mt-4 text-sm font-semibold text-offwhite">{item.label}</p>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Customer feedback"
            title={
              <>
                Trusted by drivers{' '}
                <GradientText>across Austin</GradientText>
              </>
            }
            subtitle="Our customers come back because we take care of their cars and treat them with respect."
          />
          <div className="mt-12"><TestimonialsCarousel /></div>
        </div>
      </section>

      {/* ═══════ WHY FIXPOINT FEATURE ═══════ */}
      <section className="bg-ice py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="group/why grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="image">
              <ParallaxWrapper speed={0.15}>
                <CinematicImage src={images.aboutMain} alt={images.aboutMainAlt} className="why-feature-image transition-all duration-700 ease-out group-hover/why:scale-[0.97] group-hover/why:-rotate-1 group-hover/why:shadow-warm-lg" />
              </ParallaxWrapper>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Why FixPoint"
                title="A garage you can rely on"
                subtitle="We explain the work in plain language, use quality parts and never recommend a repair you don't need."
              />
              <Stagger className="mt-8 space-y-5" fast>
                {[
                  { icon: Wrench, t: 'Experienced technicians', d: 'Skilled hands and modern diagnostic equipment.' },
                  { icon: ShieldCheck, t: 'Workmanship guarantee', d: 'Every repair is backed by our 12-month guarantee.' },
                  { icon: Star, t: '4.9 customer rating', d: 'Thousands of drivers trust us with their vehicles.' },
                ].map((item) => (
                  <StaggerItem key={item.t} variant="list">
                    <div className="group/feature flex items-start gap-4 rounded-xl px-2 py-1 transition-all duration-300 hover:translate-x-2 hover:bg-beige/20">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-beige/40 text-terracotta transition-all duration-300 group-hover/feature:scale-110 group-hover/feature:rotate-6">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-base font-bold text-burgundy">{item.t}</p>
                        <p className="text-sm text-warmgray">{item.d}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal variant="blur" delay={0.1}>
                <Link
                  href="/about"
                  className="group/learn mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta transition-all duration-300 hover:translate-x-2 hover:text-terracotta-dark"
                >
                  Learn more about FixPoint
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/learn:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <CtaBanner />
    </>
  );
}
