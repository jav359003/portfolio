'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { portfolio, sections } from '@/content/portfolio';
import { Icon } from './ui/Icon';
import { useTheme } from './ThemeToggle';
import { cx } from '@/lib/utils';

type Command = {
  id: string;
  label: string;
  group: 'Navigate' | 'Projects' | 'Links' | 'Actions';
  hint?: string;
  run: () => void;
};

/**
 * ⌘K / Ctrl+K palette. Also owns the global single-key shortcuts:
 *   G for GitHub, L for LinkedIn, E for Email, R for Résumé, T for Theme, ? for Help
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [help, setHelp] = useState(false);
  const { toggle } = useTheme();

  const go = useCallback((hash: string) => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = sections.map((s) => ({
      id: `nav-${s.id}`,
      label: s.label,
      group: 'Navigate',
      hint: `#${s.id}`,
      run: () => go(s.id),
    }));

    const projects: Command[] = portfolio.projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: p.title,
      group: 'Projects',
      hint: 'Case study',
      run: () => {
        window.location.href = `/projects/${p.slug}`;
      },
    }));

    const links: Command[] = portfolio.socials.map((s) => ({
      id: `link-${s.label}`,
      label: s.label,
      group: 'Links',
      hint: s.handle,
      run: () => window.open(s.href, s.icon === 'mail' ? '_self' : '_blank', 'noopener'),
    }));

    const actions: Command[] = [
      {
        id: 'resume',
        label: 'Download résumé',
        group: 'Actions',
        hint: 'R',
        run: () => window.open(portfolio.resume, '_blank', 'noopener'),
      },
      { id: 'theme', label: 'Toggle theme', group: 'Actions', hint: 'T', run: toggle },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        hint: portfolio.email,
        run: () => navigator.clipboard?.writeText(portfolio.email),
      },
      { id: 'help', label: 'Keyboard shortcuts', group: 'Actions', hint: '?', run: () => setHelp(true) },
    ];

    return [...nav, ...projects, ...links, ...actions];
  }, [go, toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + c.group + (c.hint ?? '')).toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => setIndex(0), [query]);

  // Global keyboard handling.
  useEffect(() => {
    const isTyping = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return Boolean(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable));
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (open) {
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setIndex((i) => Math.min(i + 1, results.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setIndex((i) => Math.max(i - 1, 0));
        }
        if (e.key === 'Enter' && results[index]) {
          e.preventDefault();
          setOpen(false);
          results[index].run();
        }
        return;
      }
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case 'g':
          window.open(portfolio.socials[0].href, '_blank', 'noopener');
          break;
        case 'l':
          window.open(portfolio.socials[1].href, '_blank', 'noopener');
          break;
        case 'e':
          window.location.href = `mailto:${portfolio.email}`;
          break;
        case 'r':
          window.open(portfolio.resume, '_blank', 'noopener');
          break;
        case 't':
          toggle();
          break;
        case '?':
          setHelp(true);
          break;
        case 'escape':
          setHelp(false);
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, index, toggle]);

  useEffect(() => {
    document.body.style.overflow = open || help ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, help]);

  const groups: Command['group'][] = ['Navigate', 'Projects', 'Links', 'Actions'];

  return (
    <>
      {/* Trigger lives in the nav; this is the keyboard-discoverable hint. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-md"
              aria-label="Close command palette"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="glass relative z-10 w-full max-w-xl overflow-hidden rounded-xl2 shadow-glass"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-line/10 px-4 py-3">
                <Icon name="search" size={16} className="text-faint" />
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections, projects, links…"
                  aria-label="Search commands"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
                />
                <span className="kbd">esc</span>
              </div>

              <ul className="max-h-[52vh] overflow-y-auto py-2" role="listbox">
                {results.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-faint">No matches.</li>
                ) : (
                  groups.map((group) => {
                    const items = results.filter((r) => r.group === group);
                    if (!items.length) return null;
                    return (
                      <li key={group}>
                        <p className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                          {group}
                        </p>
                        <ul>
                          {items.map((item) => {
                            const i = results.indexOf(item);
                            return (
                              <li key={item.id}>
                                <button
                                  role="option"
                                  aria-selected={i === index}
                                  onMouseEnter={() => setIndex(i)}
                                  onClick={() => {
                                    setOpen(false);
                                    item.run();
                                  }}
                                  className={cx(
                                    'flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition',
                                    i === index ? 'bg-line/[0.07] text-fg' : 'text-muted',
                                  )}
                                >
                                  <span className="truncate">{item.label}</span>
                                  {item.hint ? (
                                    <span className="shrink-0 truncate font-mono text-[10px] text-faint">
                                      {item.hint}
                                    </span>
                                  ) : null}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Shortcut cheatsheet */}
      <AnimatePresence>
        {help ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-md"
              aria-label="Close shortcuts"
              onClick={() => setHelp(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Keyboard shortcuts"
              className="glass relative z-10 w-full max-w-sm rounded-xl2 p-6"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
            >
              <h2 className="text-sm font-semibold">Keyboard shortcuts</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {[
                  ['⌘K', 'Command palette'],
                  ['G', 'GitHub'],
                  ['L', 'LinkedIn'],
                  ['E', 'Email me'],
                  ['R', 'Résumé'],
                  ['T', 'Toggle theme'],
                  ['?', 'This menu'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between gap-4">
                    <span>{v}</span>
                    <span className="kbd">{k}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** Small button that opens the palette. Rendered inside the nav. */
export function PaletteHint({ className }: { className?: string }) {
  return (
    <button
      className={className}
      onClick={() =>
        window.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }),
        )
      }
      aria-label="Open command palette"
    >
      <Icon name="search" size={14} />
      <span className="hidden font-mono text-[11px] text-faint sm:inline">⌘K</span>
    </button>
  );
}
