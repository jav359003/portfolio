'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { portfolio, sections } from '@/content/portfolio';
import { cx } from '@/lib/utils';
import { Icon } from './ui/Icon';
import { ThemeToggle } from './ThemeToggle';
import { PaletteHint } from './CommandPalette';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  // Empty until the observer reports one, so sub-pages show no false pill.
  const [active, setActive] = useState<string>('');
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: whichever section crosses the viewport midline is active.
  // (A zero-height root band beats intersectionRatio, which is unreliable when
  // sections are taller than the viewport.)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-[75] transition-all duration-500 ease-premium',
          scrolled ? 'py-2.5' : 'py-4',
        )}
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={cx(
              'flex items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 ease-premium',
              scrolled ? 'glass shadow-glass' : 'border border-transparent',
            )}
          >
            <Link href="/" className="group flex items-center gap-2.5 rounded-full px-2 py-1">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-mono text-[11px] font-bold text-bg">
                {portfolio.initials}
              </span>
              <span className="text-sm font-semibold tracking-tight">{portfolio.name}</span>
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cx(
                      'relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300',
                      active === s.id ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {active === s.id ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-line/[0.08]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <PaletteHint className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-muted transition hover:text-fg" />
              <ThemeToggle className="glass rounded-full p-2 text-muted transition hover:text-fg" />
              <button
                onClick={() => setMenu(true)}
                aria-label="Open menu"
                className="glass rounded-full p-2 text-muted transition hover:text-fg lg:hidden"
              >
                <Icon name="layers" size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menu ? (
          <motion.div
            className="fixed inset-0 z-[115] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            />
            <motion.div
              className="glass absolute inset-x-3 top-3 rounded-xl2 p-5"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Navigate</span>
                <button onClick={() => setMenu(false)} aria-label="Close" className="p-1 text-muted">
                  <Icon name="close" size={16} />
                </button>
              </div>
              <ul className="mt-4 grid gap-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setMenu(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-line/[0.06] hover:text-fg"
                    >
                      {s.label}
                      <Icon name="arrow-right" size={14} />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={portfolio.resume} download className="btn-ghost !text-[13px]">
                  <Icon name="download" size={14} /> Résumé
                </a>
                <a href={`mailto:${portfolio.email}`} className="btn-primary !text-[13px]">
                  Email me
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
