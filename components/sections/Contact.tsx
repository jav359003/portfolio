'use client';

import { useState } from 'react';
import { portfolio } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { Aurora } from '../Aurora';

type State = 'idle' | 'sending' | 'sent' | 'error';

export function ContactSection() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const endpoint = portfolio.contact.formEndpoint;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      message: String(data.get('message') || ''),
      website: String(data.get('website') || ''), // honeypot
    };

    // Hands off to the user's mail client, used when the API route reports that
    // no mail provider is configured yet.
    const mailtoHandoff = () => {
      const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
      const lines = [
        payload.message,
        '',
        `From ${payload.name} (${payload.email})${payload.company ? `, ${payload.company}` : ''}`,
      ].join('\n');
      window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    };

    setState('sending');
    setError('');

    try {
      // A configured third-party endpoint (Formspree, Basin, Web3Forms) wins if set.
      let res: Response;
      if (endpoint) {
        // Formspree and friends read the honeypot as _gotcha, and want JSON back.
        data.set('_gotcha', payload.website);
        data.delete('website');
        data.set('_subject', `Portfolio message from ${payload.name}`);
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        });
      } else {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.status === 503) {
        mailtoHandoff();
        setState('sent');
        return;
      }
      if (!res.ok) {
        // Our own route returns { error }, Formspree returns { errors: [{ message }] }.
        const detail = await res.json().catch(() => null);
        const message =
          detail?.error ||
          detail?.errors?.map((x: { message?: string }) => x.message).filter(Boolean).join(' ') ||
          'Something went wrong. Email me directly instead.';
        setError(message);
        setState('error');
        return;
      }

      form.reset();
      setState('sent');
    } catch {
      setError('Network error. Email me directly instead.');
      setState('error');
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28">
      <Aurora />
      <Section
        id="contact-inner"
        eyebrow="Contact"
        title={
          <>
            {portfolio.contact.heading} <span className="grad-text">I reply within a day.</span>
          </>
        }
        lede={portfolio.contact.body}
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          {/* Direct channels come first. A recruiter should not need the form. */}
          <Reveal className="grid content-start gap-3">
            {[
              { icon: 'mail' as const, label: 'Email', value: portfolio.email, href: `mailto:${portfolio.email}` },
              { icon: 'phone' as const, label: 'Phone', value: portfolio.phone, href: `tel:${portfolio.phone.replace(/\D/g, '')}` },
              ...portfolio.socials
                .filter((s) => s.icon !== 'mail')
                .map((s) => ({ icon: s.icon, label: s.label, value: s.handle, href: s.href })),
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card card-hover group flex items-center gap-4 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-line/[0.06] text-muted transition-colors group-hover:text-accent">
                  <Icon name={c.icon} size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-faint">{c.label}</span>
                  <span className="block truncate text-sm">{c.value}</span>
                </span>
                <Icon name="arrow-right" size={15} className="shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-fg" />
              </a>
            ))}

            <div className="mt-1 grid grid-cols-2 gap-3">
              <a href={portfolio.resume} download className="btn-primary">
                <Icon name="download" size={15} /> Résumé
              </a>
              <button
                onClick={async () => {
                  await navigator.clipboard?.writeText(portfolio.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="btn-ghost"
              >
                {copied ? (
                  <>
                    <Icon name="check" size={15} /> Copied
                  </>
                ) : (
                  'Copy email'
                )}
              </button>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-[12px] text-muted">Name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="rounded-xl border border-line/12 bg-line/[0.04] px-3.5 py-2.5 text-sm outline-none transition focus:border-accent/50"
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-[12px] text-muted">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="rounded-xl border border-line/12 bg-line/[0.04] px-3.5 py-2.5 text-sm outline-none transition focus:border-accent/50"
                  />
                </label>
              </div>
              <label className="grid gap-1.5">
                <span className="text-[12px] text-muted">Company / team</span>
                <input
                  name="company"
                  autoComplete="organization"
                  className="rounded-xl border border-line/12 bg-line/[0.04] px-3.5 py-2.5 text-sm outline-none transition focus:border-accent/50"
                />
              </label>
              {/* Honeypot: hidden from people, catches naive bots. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <label className="grid gap-1.5">
                <span className="text-[12px] text-muted">What are you building?</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="resize-none rounded-xl border border-line/12 bg-line/[0.04] px-3.5 py-2.5 text-sm outline-none transition focus:border-accent/50"
                />
              </label>

              {/* Honeypot: hidden from humans and screen readers, catnip for bots. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={state === 'sending'} className="btn-primary disabled:opacity-60">
                  {state === 'sending' ? 'Sending…' : 'Send message'}
                  <Icon name="arrow-right" size={15} />
                </button>
                <span aria-live="polite" className="text-[12px] text-muted">
                  {state === 'sent' ? 'Thanks, I will be in touch.' : null}
                  {state === 'error' ? (
                    <>
                      {error} Email me at{' '}
                      <a href={`mailto:${portfolio.email}`} className="underline">
                        {portfolio.email}
                      </a>{' '}
                      instead.
                    </>
                  ) : null}
                </span>
              </div>
              {!endpoint ? (
                <p className="font-mono text-[11px] text-faint">
                  {/* Set NEXT_PUBLIC_FORMSPREE_ID in .env.local to send through Formspree. */}
                  Submitting opens your mail client.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </Section>
    </section>
  );
}
