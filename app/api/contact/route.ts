import { NextResponse } from 'next/server';
import { portfolio } from '@/content/portfolio';

/**
 * Contact form endpoint.
 *
 * Sends the submission to portfolio.email through Resend. Set RESEND_API_KEY in
 * .env.local (and in your host's environment) to turn it on. Without the key the
 * route reports itself as unconfigured and the form falls back to opening the
 * visitor's mail client, so the form is never a dead end.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

// Best-effort in-memory rate limit. Resets on cold start, which is fine here:
// it exists to blunt casual spam, not to be a security control.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 503 tells the client to fall back to mailto rather than showing an error.
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Try again later.' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000);
  // Honeypot: real people leave this empty, most bots fill every field.
  const trap = clean(body.website, 200);

  if (trap) return NextResponse.json({ ok: true }, { status: 200 });
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look valid.' }, { status: 400 });
  }

  const subject = `Portfolio message from ${name}${company ? ` (${company})` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Change this once you verify your own domain in Resend.
        from: process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: [portfolio.email],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Resend rejected the message:', res.status, detail);
      return NextResponse.json({ error: 'Could not send the message.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact route failed:', err);
    return NextResponse.json({ error: 'Could not send the message.' }, { status: 500 });
  }
}
