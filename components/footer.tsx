'use client';

import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { nav, business } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-burgundy text-offwhite">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta text-offwhite transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold">FixPoint</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-beige">
                  Garage
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-offwhite/70 max-w-xs">
              {business.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group flex h-9 w-9 items-center justify-center rounded-md bg-burgundy-light text-offwhite transition-all duration-300 hover:bg-terracotta hover:scale-110 hover:-translate-y-1">
                <Facebook className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group flex h-9 w-9 items-center justify-center rounded-md bg-burgundy-light text-offwhite transition-all duration-300 hover:bg-terracotta hover:scale-110 hover:-translate-y-1">
                <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a href={business.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group flex h-9 w-9 items-center justify-center rounded-md bg-burgundy-light text-offwhite transition-all duration-300 hover:bg-terracotta hover:scale-110 hover:-translate-y-1">
                <Twitter className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a href={business.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group flex h-9 w-9 items-center justify-center rounded-md bg-burgundy-light text-offwhite transition-all duration-300 hover:bg-terracotta hover:scale-110 hover:-translate-y-1">
                <Youtube className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-beige">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href} className="transition-transform duration-300 hover:translate-x-2">
                  <Link href={item.href} className="inline-block text-sm text-offwhite/75 transition-colors hover:text-terracotta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-beige">
              Opening Hours
            </h3>
            <ul className="mt-4 space-y-2.5">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm transition-transform duration-300 hover:translate-x-2">
                  <span className="text-offwhite/75">{h.day}</span>
                  <span className="text-offwhite/90">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-beige">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-offwhite/75 transition-transform duration-300 hover:translate-x-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-terracotta">
                  {business.address}
                </a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-2">
                <a href={business.phoneHref} className="flex items-center gap-2.5 text-offwhite/75 transition-colors hover:text-terracotta">
                  <Phone className="h-4 w-4 shrink-0 text-terracotta" />
                  {business.phone}
                </a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-2">
                <a href={business.emailHref} className="flex items-center gap-2.5 text-offwhite/75 transition-colors hover:text-terracotta">
                  <Mail className="h-4 w-4 shrink-0 text-terracotta" />
                  {business.email}
                </a>
              </li>
              <li className="transition-transform duration-300 hover:translate-x-2">
                <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-offwhite/75 transition-colors hover:text-terracotta">
                  <MessageCircle className="h-4 w-4 shrink-0 text-terracotta" />
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-offwhite/15 pt-6 flex flex-col items-center justify-between gap-3 text-xs text-offwhite/60 sm:flex-row">
          <p>© {year} FixPoint Garage. All rights reserved.</p>
          <p>Licensed · ASE Certified · Family-run since {business.founded}</p>
        </div>
      </div>
    </footer>
  );
}
