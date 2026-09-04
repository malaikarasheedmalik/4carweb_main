'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
  Clock,
  Wrench,
  ArrowLeft,
  Calendar,
  Phone,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Service } from '@/lib/data';
import { services, business } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Reveal, Stagger, StaggerItem } from '@/components/reveal';
import { CtaBanner } from '@/components/cta-banner';
import { ServiceCard } from '@/components/service-card';

export function ServiceDetail({ service }: { service: Service }) {
  const Icon =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      service.icon
    ] ?? Wrench;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            <Reveal variant="image" className="lg:col-span-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-beige shadow-warm-lg">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-2">
              <Reveal variant="up">
                <div className="rounded-2xl border border-beige bg-offwhite p-6 shadow-warm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-burgundy text-offwhite">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-burgundy">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-warmgray">{service.short}</p>

                  <div className="mt-5 space-y-3 border-t border-beige pt-5">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-warmgray">
                        <Wrench className="h-4 w-4 text-terracotta" /> Starting at
                      </span>
                      <span className="font-display text-lg font-bold text-burgundy">
                        ${service.priceFrom}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-warmgray">
                        <Clock className="h-4 w-4 text-terracotta" /> Typical time
                      </span>
                      <span className="text-sm font-semibold text-burgundy">
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link
                      href={`/book?service=${service.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-terracotta px-5 py-3 text-sm font-semibold text-offwhite shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md"
                    >
                      <Calendar className="h-4 w-4" />
                      Book this service
                    </Link>
                    <a
                      href={business.phoneHref}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-beige bg-cream px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      <Phone className="h-4 w-4" />
                      Call for a quote
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading
              eyebrow="What's included"
              title={`What you get with our ${service.title.toLowerCase()}`}
            />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <StaggerItem key={f}>
                  <div className="flex items-center gap-3 rounded-xl border border-beige bg-offwhite p-4 shadow-warm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-terracotta/10 text-terracotta">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium text-burgundy">{f}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal variant="up" delay={0.1}>
            <Link
              href="/services"
              className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all services
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-offwhite py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading eyebrow="Keep exploring" title="Related services" />
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
