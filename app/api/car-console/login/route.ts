import { NextResponse } from 'next/server';
import { createCarConsoleSession, CAR_CONSOLE_COOKIE } from '@/lib/car-console-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin account is not configured' },
        { status: 500 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter your username and password' },
        { status: 401 }
      );
    }

    const enteredUser = String(username).trim();
    const enteredPass = String(password);

    if (enteredUser !== adminUsername || enteredPass !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = await createCarConsoleSession(adminUsername);

    const response = NextResponse.json({
      success: true,
      data: { username: adminUsername },
    });

    response.cookies.set(CAR_CONSOLE_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to sign in' },
      { status: 500 }
    );
  }
}
