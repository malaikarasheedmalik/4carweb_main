'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { PageHeader, ErrorNote } from '@/components/car-console-ui';

type SettingsData = {
  siteName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  workingHours: string;
};

const DEFAULT_DATA: SettingsData = {
  siteName: '',
  contactPhone: '',
  contactEmail: '',
  address: '',
  workingHours: '',
};

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/car-console/settings', { cache: 'no-store' });
      const json = await res.json();
      if (res.ok && json.success) {
        setForm({ ...DEFAULT_DATA, ...json.data });
      } else {
        setError(json.error || 'Unable to load settings');
      }
    } catch {
      setError('Unable to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const update = (k: keyof SettingsData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async (key: keyof SettingsData) => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/car-console/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: form[key] }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setFeedback({ type: 'error', msg: json.error || 'Failed to save' });
      } else {
        setFeedback({ type: 'success', msg: 'Setting saved successfully' });
      }
    } catch {
      setFeedback({ type: 'error', msg: 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-line bg-white p-12 text-slate">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal" /> Loading settings…
      </div>
    );
  }

  const fields: { key: keyof SettingsData; label: string; type?: string; textarea?: boolean; placeholder: string }[] = [
    { key: 'siteName', label: 'Business name', placeholder: 'Malaika Car Repairing Services' },
    { key: 'contactPhone', label: 'Contact phone', placeholder: '+1 (555) 123-4567' },
    { key: 'contactEmail', label: 'Contact email', placeholder: 'info@malaika-cars.com' },
    { key: 'address', label: 'Address', textarea: true, placeholder: '123 Auto Street, Car City' },
    { key: 'workingHours', label: 'Working hours', textarea: true, placeholder: 'Mon–Fri 8:00–18:00, Sat 9:00–14:00' },
  ];

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Settings"
        subtitle="Manage the business information shown across your workshop."
      />

      {error && <div className="mb-4"><ErrorNote message={error} /></div>}
      {feedback && (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-red-300 bg-red-50 text-red-700'
          }`}
        >
          {feedback.msg}
        </div>
      )}

      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-medium text-navy">{f.label}</label>
              {f.textarea ? (
                <textarea
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  rows={3}
                  placeholder={f.placeholder}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              ) : (
                <input
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm text-navy placeholder:text-slate-400 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal"
                />
              )}
              <div className="mt-1.5 flex justify-end">
                <button
                  onClick={() => save(f.key)}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-teal px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5 text-sm text-slate shadow-sm">
        These settings are stored securely in your database and are used only for business information.
        No credentials, API keys, or environment secrets are ever exposed in this area.
      </div>
    </div>
  );
}
