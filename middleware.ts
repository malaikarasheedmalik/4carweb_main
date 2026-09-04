import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

function carConsoleSecret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || process.env.CAR_CONSOLE_SECRET || 'development-secret-change-me'
  );
}

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  // Protect /admin routes
  if (pathName.startsWith('/admin')) {
    if (pathName === '/admin/login') return NextResponse.next();

    const token = req.cookies.get('fixpoint_admin')?.value;
    if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET || 'development-secret-change-me'));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Protect /car-console routes
  if (pathName.startsWith('/car-console')) {
    // The login page itself and the root /car-console page are always accessible
    if (pathName === '/car-console' || pathName === '/car-console/login') return NextResponse.next();

    const token = req.cookies.get('car-console-admin')?.value;
    if (!token) return NextResponse.redirect(new URL('/car-console', req.url));

    try {
      await jwtVerify(token, carConsoleSecret());
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/car-console', req.url));
      response.cookies.set('car-console-admin', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/car-console/:path*',
  ],
};
