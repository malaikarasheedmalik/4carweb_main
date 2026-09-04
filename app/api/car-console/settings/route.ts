import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { carConsoleGuard } from '@/lib/car-console-guard';

export const dynamic = 'force-dynamic';

const DEFAULT_KEYS = ['siteName', 'contactPhone', 'contactEmail', 'address', 'workingHours'];

export async function GET() {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const rows = await db.siteSetting.findMany();

    const settings: Record<string, string> = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    // Fill with empty strings for known config keys so the UI is consistent
    DEFAULT_KEYS.forEach((k) => {
      if (!(k in settings)) settings[k] = '';
    });

    // Only return known safe business settings, never secrets
    const safe: Record<string, string> = {};
    DEFAULT_KEYS.forEach((k) => {
      if (k in settings) safe[k] = settings[k];
    });

    return NextResponse.json({ success: true, data: safe });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to load settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const guard = await carConsoleGuard();
  if (guard) return guard;

  try {
    const body = await request.json();
    const { key, value } = body || {};

    if (!key || !DEFAULT_KEYS.includes(key)) {
      return NextResponse.json(
        { success: false, error: 'Invalid setting key' },
        { status: 400 }
      );
    }

    const valueStr = typeof value === 'string' ? value : String(value ?? '');

    await db.siteSetting.upsert({
      where: { key },
      update: { value: valueStr },
      create: { key, value: valueStr },
    });

    return NextResponse.json({ success: true, data: { key, value: valueStr } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Unable to update settings' },
      { status: 500 }
    );
  }
}
