import { db } from '@/lib/db'; import { fail, ok } from '@/lib/validation';
export const dynamic = 'force-dynamic';
export async function GET(_req: Request, { params }: { params: { slug: string } }) { try { const project = await db.project.findFirst({ where: { slug: params.slug, published: true } }); return project ? ok(project) : fail('Project not found', 404); } catch { return fail('Unable to load project', 500); } }
