'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/nexora-animations';

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  options?: string[];
  full?: boolean;
};

type FormProps = {
  fields: Field[];
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  className?: string;
};

export function ContactForm({
  fields,
  submitLabel = 'Send Message',
  successTitle = 'Message sent!',
  successMessage = "Thank you. We've received your message and will get back to you shortly.",
  className,
}: FormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [values, setValues] = useState<Record<string, string>>({});

  const update = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1100);
  };

  const inputCls =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/40 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy';

  if (status === 'success') {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className={`flex flex-col items-center rounded-2xl border border-line bg-white p-8 text-center shadow-premium ${className ?? ''}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-navy">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate">{successMessage}</p>
        <button
          onClick={() => {
            setStatus('idle');
            setValues({});
          }}
          className="mt-6 rounded-xl border border-line bg-ice px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-line bg-white p-6 shadow-premium sm:p-8 ${className ?? ''}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.full || f.textarea ? 'sm:col-span-2' : ''}>
            <label className={labelCls} htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
            {f.textarea ? (
              <textarea
                id={f.name}
                rows={5}
                required={f.required}
                value={values[f.name] ?? ''}
                onChange={(e) => update(f.name, e.target.value)}
                className={inputCls}
                placeholder={f.placeholder}
              />
            ) : f.options ? (
              <select
                id={f.name}
                required={f.required}
                value={values[f.name] ?? ''}
                onChange={(e) => update(f.name, e.target.value)}
                className={inputCls}
              >
                <option value="">{f.placeholder ?? 'Select…'}</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                type={f.type ?? 'text'}
                required={f.required}
                value={values[f.name] ?? ''}
                onChange={(e) => update(f.name, e.target.value)}
                className={inputCls}
                placeholder={f.placeholder}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-dark hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {submitLabel}
          </>
        )}
      </button>
    </motion.form>
  );
}
