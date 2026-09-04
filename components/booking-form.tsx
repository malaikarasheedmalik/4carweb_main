'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Car, CheckCircle2, Loader2, User, Phone, Mail, ChevronRight } from 'lucide-react';
import { services, business } from '@/lib/data';
import { fadeUp, viewportOnce } from '@/lib/animations';

type Status = 'idle' | 'submitting' | 'success';

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: defaultService ?? '',
    date: '',
    notes: '',
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1100);
  };

  if (status === 'success') {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center rounded-2xl border border-beige bg-offwhite p-8 text-center shadow-warm"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-burgundy">Booking received!</h3>
        <p className="mt-2 max-w-sm text-sm text-warmgray">
          Thanks, {form.name || 'there'}. We've got your request for{' '}
          {form.service ? services.find((s) => s.slug === form.service)?.title : 'a service'}
          {form.date && ` on ${form.date}`}. We'll call you on {form.phone || 'your number'} to
          confirm the exact time within one business day.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', phone: '', email: '', vehicle: '', service: '', date: '', notes: '' });
          }}
          className="mt-6 rounded-lg border border-beige bg-cream px-5 py-2.5 text-sm font-semibold text-burgundy transition-colors hover:border-terracotta hover:text-terracotta"
        >
          Make another booking
        </button>
      </motion.div>
    );
  }

  const inputCls =
    'w-full rounded-lg border border-beige bg-cream px-3.5 py-2.5 text-sm text-burgundy placeholder:text-warmgray/50 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-burgundy';

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-beige bg-offwhite p-6 shadow-warm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">Full name *</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-warmgray/50" />
            <input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} className={`${inputCls} pl-9`} placeholder="Jane Doe" />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone *</label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-warmgray/50" />
            <input id="phone" required type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={`${inputCls} pl-9`} placeholder="(512) 555-0142" />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-warmgray/50" />
            <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={`${inputCls} pl-9`} placeholder="jane@email.com" />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="vehicle">Vehicle make &amp; model *</label>
          <div className="relative">
            <Car className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-warmgray/50" />
            <input id="vehicle" required value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} className={`${inputCls} pl-9`} placeholder="Toyota Camry 2021" />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="service">Service needed *</label>
          <select id="service" required value={form.service} onChange={(e) => update('service', e.target.value)} className={inputCls}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="date">Preferred date</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-warmgray/50" />
            <input id="date" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className={`${inputCls} pl-9`} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelCls} htmlFor="notes">Describe the issue / notes</label>
        <textarea id="notes" rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} className={inputCls} placeholder="Tell us what's happening with the car, any warning lights, noises, etc." />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-offwhite shadow-sm transition-all hover:bg-terracotta-dark hover:shadow-md disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request Booking
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-3 text-xs text-warmgray">
        We'll confirm by phone within one business day. No payment needed to book.
      </p>
    </motion.form>
  );
}
