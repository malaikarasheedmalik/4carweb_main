'use client';

import Link from 'next/link';
import { Building2, Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { business, footerLinks } from '@/lib/nexora-data';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const socials = [
    { icon: Linkedin, href: business.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: business.social.twitter, label: 'Twitter' },
    { icon: Facebook, href: business.social.facebook, label: 'Facebook' },
    { icon: Instagram, href: business.social.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 rounded-3xl bg-navy-light p-8 lg:grid-cols-2 lg:items-center lg:p-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Stay ahead in your career
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Get hiring insights, career advice and new job alerts — straight to your inbox, twice a month.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              {!subscribed && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        {/* Main footer */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-white">
                <Building2 className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-bold text-white">NEXORA</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-teal font-semibold">TALENT</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-sm">
              {business.description}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-teal"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-teal">
                  {heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <a href={business.phoneHref} className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
            <Phone className="h-4 w-4 text-teal" /> {business.phone}
          </a>
          <a href={business.emailHref} className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
            <Mail className="h-4 w-4 text-teal" /> {business.email}
          </a>
          <p className="flex items-center gap-3 text-sm text-white/70">
            <MapPin className="h-4 w-4 text-teal" /> {business.address}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} {business.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link href="/" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
