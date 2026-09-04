import { db } from '@/lib/db';
import { contactSchema, fail, ok } from '@/lib/validation';
export async function POST(req: Request) { try { const parsed = contactSchema.safeParse(await req.json()); if (!parsed.success) return fail('Please check the form fields'); const message = await db.contactMessage.create({ data: parsed.data }); return ok({ id: message.id }, { status: 201 }); } catch { return fail('Unable to send your message', 500); } }
