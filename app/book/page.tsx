'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Phone, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { business, services } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { BookingForm } from '@/components/booking-form';
import { Reveal, Stagger, StaggerItem } from '@/components/reveal';

function BookingContent() {
  const params = useSearchParams();
  const serviceSlug = params.get('service') ?? '';
  const validService = services.find((s) => s.slug === serviceSlug)?.slug;

  const assurances = [
    { icon: ShieldCheck, title: 'No payment to book', text: 'Free to request — pay only after approval.' },
    { icon: Clock, title: 'Fast confirmation', text: 'We call you back within one business day.' },
    { icon: Calendar, title: 'Pick your time', text: "Tell us what works and we'll do our best to fit it." },
  ];

  return (
    <>
      <PageHeader
        title="Book a Service"
        subtitle="Tell us about your car and a time that suits you. We'll confirm your appointment by phone within one business day — no payment needed to book."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Book a Service' }]}
      />

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* ASSURANCES */}
          <Stagger className="grid gap-4 sm:grid-cols-3" fast>
            {assurances.map((a) => (
              <StaggerItem key={a.title}>
                <div className="flex items-start gap-3 rounded-xl border border-beige bg-offwhite p-4 shadow-warm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beige/40 text-terracotta">
                    <a.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">{a.title}</p>
                    <p className="text-xs text-warmgray">{a.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* FORM */}
          <div className="mt-10">
            <BookingForm defaultService={validService} />
          </div>

          {/* ALT CONTACT */}
          <Reveal variant="up" delay={0.1}>
            <div className="mt-10 rounded-2xl bg-burgundy p-6 text-offwhite sm:p-8">
              <h3 className="font-display text-lg font-bold">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-offwhite/80">
                Give us a call and we'll book you in over the phone — it takes about two minutes.
              </p>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-beige transition-colors hover:text-terracotta"
                >
                  <Phone className="h-5 w-5" />
                  {business.phone}
                </a>
                <span className="flex items-center gap-2 text-sm text-offwhite/80">
                  <MapPin className="h-4 w-4 text-beige" />
                  {business.address}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookingContent />
    </Suspense>
  );
}
