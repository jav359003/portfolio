'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { portfolio } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Reveal, RevealGroup, revealChild } from '../ui/Reveal';
import { Icon } from '../ui/Icon';
import { cx, formatDate, hueFrom } from '@/lib/utils';

/* ------------------------------------------------------------ certifications */
function Certifications() {
  if (!portfolio.certifications.length) return null;
  return (
    <div>
      <h3 className="text-title font-semibold">Certifications</h3>
      <RevealGroup className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.certifications.map((c) => (
          <motion.a
            key={c.name}
            variants={revealChild}
            href={c.credentialUrl || undefined}
            target={c.credentialUrl ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={cx('card card-hover block p-5', !c.credentialUrl && 'cursor-default')}
          >
            <div className="flex items-start gap-3">
              {/* Provider logo placeholder. Set an image path if you have one. */}
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/10 bg-line/[0.05] font-mono text-[11px] font-bold text-muted">
                {c.initials}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold leading-snug">{c.name}</p>
                <p className="mt-1 text-[12px] text-muted">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </div>
            {c.skills?.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-faint">
              {c.credentialUrl ? (
                <>
                  Verify credential <Icon name="external" size={11} />
                </>
              ) : (
                'Credential link, add it in portfolio.ts'
              )}
            </p>
          </motion.a>
        ))}
      </RevealGroup>
    </div>
  );
}

/* -------------------------------------------------------------- achievements */
function Achievements() {
  if (!portfolio.achievements.length) return null;
  return (
    <div>
      <h3 className="text-title font-semibold">Awards, leadership & community</h3>
      <RevealGroup className="mt-5 grid gap-3 sm:grid-cols-2">
        {portfolio.achievements.map((a) => (
          <motion.div key={a.title + a.org} variants={revealChild} className="card card-hover group p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                {a.kind}
              </span>
              <span className="font-mono text-[11px] text-faint">{a.date}</span>
            </div>
            <p className="mt-3 text-sm font-semibold">{a.title}</p>
            <p className="mt-0.5 text-[12px] text-muted">{a.org}</p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{a.detail}</p>
            {a.href ? (
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-accent"
              >
                Details <Icon name="external" size={11} />
              </a>
            ) : null}
          </motion.div>
        ))}
      </RevealGroup>
    </div>
  );
}

/* --------------------------------------------------------------- testimonials */
function Testimonials() {
  const items = portfolio.testimonials;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [items.length, paused]);

  if (!items.length) return null;
  const t = items[i];
  const hue = hueFrom(t.name);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h3 className="text-title font-semibold">What people say</h3>
      <div className="card mt-5 overflow-hidden p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg leading-relaxed text-balance sm:text-xl">“{t.quote}”</p>
            <footer className="mt-6 flex items-center gap-3">
              {t.avatar ? (
                <Image src={t.avatar} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-mono text-[11px] font-bold"
                  style={{ background: `hsl(${hue} 70% 55% / 0.22)` }}
                >
                  {t.initials}
                </span>
              )}
              <div>
                <p className="text-[13px] font-semibold">{t.name}</p>
                <p className="text-[12px] text-muted">
                  {t.role} · {t.company}
                </p>
              </div>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {items.length > 1 ? (
          <div className="mt-6 flex items-center gap-2">
            {items.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setI(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={idx === i}
                className={cx(
                  'h-1.5 rounded-full transition-all duration-300',
                  idx === i ? 'w-7 bg-accent' : 'w-1.5 bg-line/20 hover:bg-line/40',
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- writing */
function Writing() {
  if (!portfolio.posts.length) return null;
  return (
    <div>
      <h3 className="text-title font-semibold">Writing</h3>
      <RevealGroup className="mt-5 grid gap-3 lg:grid-cols-3">
        {portfolio.posts.map((p) => (
          <motion.a
            key={p.title}
            variants={revealChild}
            href={p.href}
            className="card card-hover group flex flex-col p-5"
          >
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[15px] font-semibold leading-snug transition-colors group-hover:text-accent">
              {p.title}
            </p>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{p.excerpt}</p>
            <p className="mt-4 font-mono text-[11px] text-faint">
              {formatDate(p.date)} · {p.readingTime}
            </p>
          </motion.a>
        ))}
      </RevealGroup>
    </div>
  );
}

export function MoreSection() {
  return (
    <Section
      id="more"
      eyebrow="Signals"
      title={
        <>
          Certifications, leadership, <span className="grad-text">and a few things I have written.</span>
        </>
      }
      lede="The supporting evidence, including credentials, community work, references, and notes on the systems above."
    >
      <div className="grid gap-14">
        <Reveal>
          <Certifications />
        </Reveal>
        <Reveal>
          <Achievements />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Writing />
        </Reveal>
      </div>
    </Section>
  );
}
