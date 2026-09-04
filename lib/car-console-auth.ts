import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

export const CAR_CONSOLE_COOKIE = 'car-console-admin';

function secret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || process.env.CAR_CONSOLE_SECRET || 'development-secret-change-me');
}

export async function createCarConsoleSession(username: string) {
  return new SignJWT({ role: 'ADMIN', username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret());
}

export async function verifyCarConsoleSession() {
  const token = cookies().get(CAR_CONSOLE_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export async function getCarConsoleSession() {
  const payload = await verifyCarConsoleSession();
  if (!payload || payload.role !== 'ADMIN') return null;
  return { username: payload.username as string, role: payload.role as string };
}

export async function isCarConsoleAuthenticated() {
  const session = await getCarConsoleSession();
  return session !== null;
}
