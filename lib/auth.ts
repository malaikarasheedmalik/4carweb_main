import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { db } from './db';
export const COOKIE = 'fixpoint_admin';
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET || 'development-secret-change-me');
export async function createSession(user: { id: string; role: string }) { return new SignJWT({ role: user.role }).setProtectedHeader({ alg: 'HS256' }).setSubject(user.id).setIssuedAt().setExpirationTime('8h').sign(secret()); }
export async function getSession() { const token = cookies().get(COOKIE)?.value; if (!token) return null; try { const { payload } = await jwtVerify(token, secret()); return payload.sub ? db.user.findFirst({ where: { id: payload.sub, isActive: true }, select: { id: true, name: true, email: true, role: true } }) : null; } catch { return null; } }
export async function requireUser(role?: 'ADMIN' | 'EDITOR') { const user = await getSession(); if (!user || (role === 'ADMIN' && user.role !== 'ADMIN')) return null; return user; }
