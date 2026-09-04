import { NextResponse } from 'next/server';
import { COOKIE } from '@/lib/auth';
export async function POST() { const response = NextResponse.json({ success: true, data: null }); response.cookies.set(COOKIE, '', { httpOnly: true, expires: new Date(0), path: '/' }); return response; }
