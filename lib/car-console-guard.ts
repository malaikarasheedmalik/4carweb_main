import { NextResponse } from 'next/server';
import { isCarConsoleAuthenticated } from './car-console-auth';

export async function carConsoleGuard() {
  if (!(await isCarConsoleAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return null;
}
