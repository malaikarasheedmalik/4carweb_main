'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Upload, FileText, Send } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/nexora-animations';

export function ResumeUpload() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [fileName, setFileName] = useState('');

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
        className="flex flex-col items-center rounded-2xl border border-line bg-white p-8 text-center shadow-premium"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-navy">Resume uploaded!</h3>
        <p className="mt-2 max-w-sm text-sm text-slate">
          Thanks for sharing your resume. Our consultants will review it and reach out when we find roles that match your profile.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFileName('');
          }}
          className="mt-6 rounded-xl border border-line bg-ice px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
        >
          Upload another
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
      className="rounded-2xl border border-line bg-white p-6 shadow-premium sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="ru-name">Full Name *</label>
          <input id="ru-name" required className={inputCls} placeholder="Jane Doe" />
        </div>
        <div>
          <label className={labelCls} htmlFor="ru-email">Email *</label>
          <input id="ru-email" type="email" required className={inputCls} placeholder="jane@email.com" />
        </div>
        <div>
          <label className={labelCls} htmlFor="ru-phone">Phone</label>
          <input id="ru-phone" type="tel" className={inputCls} placeholder="(212) 555-0190" />
        </div>
        <div>
          <label className={labelCls} htmlFor="ru-field">Preferred Field</label>
          <select id="ru-field" className={inputCls}>
            <option value="">Select…</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelCls}>Resume / CV *</label>
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-ice px-4 py-10 text-center transition-colors hover:border-teal hover:bg-teal/5">
          {fileName ? (
            <>
              <FileText className="h-8 w-8 text-teal" />
              <p className="mt-2 text-sm font-semibold text-navy">{fileName}</p>
              <p className="mt-1 text-xs text-slate">Click to replace</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-slate" />
              <p className="mt-2 text-sm font-semibold text-navy">Click to upload your resume</p>
              <p className="mt-1 text-xs text-slate">PDF or Word, max 5MB</p>
            </>
          )}
          <input
            type="file"
            required
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-dark hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit Resume
          </>
        )}
      </button>
    </motion.form>
  );
}
