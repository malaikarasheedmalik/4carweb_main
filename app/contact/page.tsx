'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Navigation,
  Send,
  Loader2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { business } from '@/lib/data';
import { PageHeader, SectionHeading } from '@/components/section';
import { Reveal } from '@/components/reveal';
import { fadeUp, viewportOnce } from '@/lib/animations';

const socials = [
  { icon: Facebook, href: business.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: business.social.instagram, label: 'Instagram' },
  { icon: Twitter, href: business.social.twitter, label: 'Twitter' },
  { icon: Youtube, href: business.social.youtube, label: 'YouTube' },
];

type Status = 'idle' | 'submitting' | 'success';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Unable to send');
      setStatus('success');
    } catch {
      setStatus('idle');
      window.alert('We could not send your message. Please try again.');
    }
  };

  const inputCls =
    'w-full rounded-lg border border-beige bg-cream px-3.5 py-2.5 text-sm text-burgundy placeholder:text-warmgray/50 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-burgundy';

  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: business.phone,
      href: business.phoneHref,
    },
    {
      icon: Mail,
      label: 'Email',
      value: business.email,
      href: business.emailHref,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: `Chat with us on WhatsApp`,
      href: business.whatsappHref,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: business.address,
      href: business.directionsUrl,
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Questions, quotes, or just want to say hello? We're here to help — reach out any way that suits you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      {/* CONTACT INFO + FORM */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT: INFO */}
            <div>
              <SectionHeading
                eyebrow="Get in touch"
                title="We'd love to hear from you"
                subtitle="Call, email, or send a message — we usually reply within a few hours during opening times."
              />

              <div className="mt-8 space-y-5">
                {contactItems.map((c) => (
                  <Reveal key={c.label} variant="up" delay={0.05}>
                    <a
                      href={c.href}
                      target={c.label === 'Address' ? '_blank' : undefined}
                      rel={c.label === 'Address' ? 'noopener noreferrer' : undefined}
                      className="group flex items-start gap-4 rounded-xl border border-beige bg-offwhite p-5 shadow-warm transition-all hover:border-terracotta"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-beige/40 text-terracotta transition-colors group-hover:bg-terracotta group-hover:text-offwhite">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-warmgray">{c.label}</p>
                        <p className="mt-0.5 text-sm font-semibold text-burgundy">{c.value}</p>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* HOURS */}
              <Reveal variant="up" delay={0.15}>
                <div className="mt-5 rounded-xl border border-beige bg-offwhite p-5 shadow-warm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-beige/40 text-terracotta">
                      <Clock className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-wide text-warmgray">Opening Hours</p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {business.hours.map((h) => (
                      <li key={h.day} className="flex justify-between text-sm">
                        <span className="text-warmgray">{h.day}</span>
                        <span className="font-semibold text-burgundy">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* SOCIALS */}
              <Reveal variant="up" delay={0.2}>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-warmgray">Follow us</p>
                  <div className="mt-3 flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-beige bg-offwhite text-burgundy transition-all hover:border-terracotta hover:bg-terracotta hover:text-offwhite"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT: FORM */}
            <Reveal variant="up" delay={0.1}>
              {status === 'success' ? (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex h-full flex-col items-center justify-center rounded-2xl border border-beige bg-offwhite p-8 text-center shadow-warm"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-burgundy">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-warmgray">
                    Thanks, {form.name || 'there'}. We've received your message and will get back to
                    you within a few hours during opening times.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setForm({ name: '', email: '', message: '' });
                    }}
                    className="mt-6 rounded-lg border border-beige bg-cream px-5 py-2.5 text-sm font-semibold text-burgundy transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-beige bg-offwhite p-6 shadow-warm sm:p-8"
                >
                  <h2 className="font-display text-xl font-bold text-burgundy">Send us a message</h2>
                  <p className="mt-1 text-sm text-warmgray">We'll get back to you shortly.</p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className={labelCls} htmlFor="c-name">Your name *</label>
                      <input
                        id="c-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="c-email">Email *</label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        placeholder="jane@email.com"
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="c-message">Message *</label>
                      <textarea
                        id="c-message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={inputCls}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH MAP */}
      <section className="bg-offwhite pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal variant="up">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                  Find us
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-burgundy sm:text-3xl">
                  {business.address}
                </h2>
              </div>
              <a
                href={business.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-offwhite transition-all hover:bg-terracotta-dark"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-beige shadow-warm">
              <div className="h-72 w-full sm:h-80 lg:h-96">
                <iframe
                  title="FixPoint Garage location map"
                  src={business.mapsEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
