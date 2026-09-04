import { NextResponse } from 'next/server';
import { CAR_CONSOLE_COOKIE } from '@/lib/car-console-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return clearSession();
}

export async function POST() {
  return clearSession();
}

function clearSession() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CAR_CONSOLE_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
