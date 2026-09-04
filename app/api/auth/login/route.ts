import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { COOKIE, createSession } from '@/lib/auth';
import { fail, loginSchema, ok } from '@/lib/validation';
export async function POST(req: Request) { try { const parsed = loginSchema.safeParse(await req.json()); if (!parsed.success) return fail('Invalid email or password'); const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } }); if (!user || !user.isActive || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return fail('Invalid email or password', 401); const response = NextResponse.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role } } }); response.cookies.set(COOKIE, await createSession(user), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 60 * 60 * 8, path: '/' }); return response; } catch { return fail('Unable to sign in', 500); } }
