import { db } from '@/lib/db'; import { ok, fail } from '@/lib/validation';
export async function GET() { try { return ok(await db.service.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })); } catch { return fail('Unable to load services', 500); } }
