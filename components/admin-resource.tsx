'use client';
import { useEffect, useState } from 'react';

const fields: Record<string, string[]> = {
  projects: ['title', 'slug', 'shortDescription', 'description', 'category', 'client', 'image', 'projectUrl'],
  services: ['title', 'slug', 'description', 'icon'],
  testimonials: ['name', 'role', 'company', 'message', 'image', 'rating'],
};

export function AdminResource({ resource, title }: { resource: string; title: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>({ rating: 5 });
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState('');
  const load = () => fetch(`/api/admin/${resource}`).then((r) => r.json()).then((r) => setItems(r.data || []));
  useEffect(() => { void load(); }, [resource]);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/admin/${resource}${editing ? `/${editing}` : ''}`, { method: editing ? 'PUT' : 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...form, rating: Number(form.rating), published: Boolean(form.published), featured: Boolean(form.featured) }) });
    const json = await res.json();
    if (!res.ok) return setError(json.error || 'Unable to save');
    setForm({ rating: 5 }); setEditing(null); setError(''); void load();
  }
  async function remove(id: string) { if (!confirm('Delete this record?')) return; await fetch(`/api/admin/${resource}/${id}`, { method: 'DELETE' }); void load(); }
  return <><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#886b60]">Content</p><h1 className="mt-2 font-display text-4xl font-bold text-[#3c2521]">{title}</h1></div><button onClick={() => { setEditing(null); setForm({ rating: 5 }); }} className="rounded-lg bg-[#6a4b40] px-4 py-2.5 text-sm font-semibold text-white">Add {title.slice(0, -1)}</button></header><div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]"><div className="rounded-2xl border border-[#d9ccc7] bg-white p-5"><div className="divide-y divide-[#eee6e2]">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 py-4"><div><p className="font-semibold text-[#3c2521]">{item.title || item.name}</p><p className="text-xs text-[#886b60]">{item.slug || item.email || item.status || `${item.rating}/5`}</p></div><div className="flex gap-3 text-sm"><button onClick={() => { setEditing(item.id); setForm(item); }} className="font-semibold text-[#6a4b40]">Edit</button><button onClick={() => remove(item.id)} className="font-semibold text-red-700">Delete</button></div></div>)}{!items.length && <p className="py-10 text-center text-sm text-[#886b60]">No records yet.</p>}</div></div><form onSubmit={save} className="rounded-2xl border border-[#d9ccc7] bg-white p-5"><h2 className="font-display text-xl font-bold text-[#3c2521]">{editing ? 'Edit record' : 'New record'}</h2>{error && <p className="mt-3 text-sm text-red-700">{error}</p>}{(fields[resource] || []).map((field) => <label key={field} className="mt-4 block text-xs font-semibold uppercase tracking-wide text-[#6a4b40]">{field}<textarea rows={field === 'description' || field === 'message' ? 3 : 1} className="mt-1 w-full rounded-lg border border-[#b6a69f] px-3 py-2 text-sm font-normal normal-case" value={form[field] || ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required={['title', 'slug', 'description', 'name', 'message'].includes(field)} /></label>)}<label className="mt-4 flex gap-2 text-sm text-[#6a4b40]"><input type="checkbox" checked={Boolean(form.published)} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label><label className="mt-2 flex gap-2 text-sm text-[#6a4b40]"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label><button className="mt-5 w-full rounded-lg bg-[#3c2521] py-3 text-sm font-semibold text-white">Save changes</button></form></div></>;
}
