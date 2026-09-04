'use client';

import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { business } from '@/lib/data';
import { Reveal } from '@/components/reveal';

export function LocationMap() {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="up">
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Find Us
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-burgundy sm:text-4xl">
                Visit FixPoint Garage
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-warmgray">
                Drop by the workshop or give us a call — we're easy to find on Maple Street
                with parking right out front.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beige/40 text-terracotta">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">Address</p>
                    <p className="text-sm text-warmgray">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beige/40 text-terracotta">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">Opening Hours</p>
                    <ul className="mt-1 space-y-0.5 text-sm text-warmgray">
                      {business.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-6">
                          <span>{h.day}</span>
                          <span>{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-beige/40 text-terracotta">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">Phone</p>
                    <a href={business.phoneHref} className="text-sm text-warmgray transition-colors hover:text-terracotta">
                      {business.phone}
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-offwhite shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-beige shadow-warm">
              <div className="h-72 w-full lg:h-full lg:min-h-[360px]">
                <iframe
                  title="FixPoint Garage location map"
                  src={business.mapsEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
