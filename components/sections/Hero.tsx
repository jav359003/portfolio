'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { portfolio } from '@/content/portfolio';
import { Aurora } from '../Aurora';
import { Icon } from '../ui/Icon';
import { Counter } from '../ui/Counter';
import { Reveal } from '../ui/Reveal';

function Rotator() {
  const items = portfolio.rotating;
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 2800);
    return () => clearInterval(t);
  }, [items.length, reduced]);

  return (
    <span className="relative inline-flex h-6 items-center overflow-hidden align-middle">
      <motion.span
        key={i}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[12px] tracking-tight text-accent sm:text-[13px]"
      >
        {items[i]}
      </motion.span>
    </span>
  );
}

/** Headshot with a monogram fallback so the page never looks broken pre-upload. */
function Headshot() {
  const [failed, setFailed] = useState(!portfolio.headshot);

  return (
    <div className="relative mx-auto w-fit lg:mx-0">
      <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent/40 to-accent2/40 blur-2xl" />
      <div className="glass relative h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40">
        {failed ? (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/20 to-accent2/20">
            <span className="font-mono text-2xl font-bold tracking-tight">{portfolio.initials}</span>
          </div>
        ) : (
          <Image
            src={portfolio.headshot}
            alt={`${portfolio.name}, headshot`}
            width={320}
            height={320}
            priority
            sizes="160px"
            // Slight zoom + high focal point keeps the face centered in the circle.
            className="h-full w-full scale-[1.12] object-cover object-[center_28%]"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="glass absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] text-muted">
        {/* TODO: drop headshot.jpg in /public to replace the monogram */}
        {portfolio.location.split(' · ')[0]}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <Aurora dense />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal>
              <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] tracking-tight text-muted">
                  {portfolio.availability}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-display font-semibold text-balance">
                {portfolio.headline.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="grad-text">{portfolio.headline.split(' ').slice(-2).join(' ')}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="font-medium text-fg">{portfolio.title}</span>
                <span className="text-faint">·</span>
                <span>{portfolio.subtitle}</span>
                <span className="text-faint">·</span>
                <Rotator />
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {portfolio.valueProp}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-2.5">
                <a href={portfolio.resume} download className="btn-primary">
                  <Icon name="download" size={15} /> Download résumé
                </a>
                <a href="#projects" className="btn-ghost">
                  View projects <Icon name="arrow-right" size={15} />
                </a>
                {portfolio.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === 'mail' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="btn-ghost !px-3"
                  >
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 font-mono text-[11px] text-faint">
                Press <span className="kbd">⌘K</span> to jump anywhere · <span className="kbd">?</span> for shortcuts
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Headshot />
          </Reveal>
        </div>

        {/* ------------------------------------------------ 10-second recruiter row */}
        <Reveal delay={0.34}>
          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.whyHire.map((w) => (
              <div key={w.label} className="card card-hover group p-5">
                <div className="text-2xl font-semibold tracking-tight">
                  <span className="grad-text">{w.metric}</span>
                </div>
                <p className="mt-1 text-sm font-medium">{w.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{w.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------------------ stats strip */}
        <Reveal delay={0.4}>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line/10 bg-line/[0.04] sm:grid-cols-3 lg:grid-cols-6">
            {portfolio.stats.map((s) => (
              <div key={s.label} className="group bg-bg/40 p-5 backdrop-blur-sm transition-colors hover:bg-line/[0.05]">
                <dd className="text-xl font-semibold tracking-tight sm:text-2xl">
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-1 text-[12px] font-medium text-muted">{s.label}</dt>
                <p className="mt-2 text-[11px] leading-snug text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.hint}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ------------------------------------------------------------ tech ticker */}
        <div className="mask-fade-x relative mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee gap-2.5 hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-2.5" aria-hidden={dup === 1}>
                {portfolio.skills
                  .flatMap((g) => g.skills.map((s) => s.name))
                  .slice(0, 34)
                  .map((name) => (
                    <span key={`${dup}-${name}`} className="chip whitespace-nowrap">
                      {name}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
