'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { portfolio } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { cx } from '@/lib/utils';

export function SkillsSection() {
  const groups = portfolio.skills;
  const [active, setActive] = useState(groups[1].category); // default to the AI group

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title={
        <>
          Depth where it counts, <span className="grad-text">and breadth where it helps.</span>
        </>
      }
      lede="Grouped by discipline so you can scan the tools I have used across production work, internships, and public projects."
    >
      {/* Category selector */}
      <div className="mask-fade-x -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2">
        {groups.map((g) => (
          <button
            key={g.category}
            onClick={() => setActive(g.category)}
            aria-pressed={active === g.category}
            className={cx(
              'relative shrink-0 rounded-full px-4 py-2 text-[13px] transition-colors duration-300',
              active === g.category ? 'text-bg' : 'text-muted hover:text-fg',
            )}
          >
            {active === g.category ? (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent to-accent2"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            ) : (
              <span className="absolute inset-0 -z-10 rounded-full border border-line/10" />
            )}
            {g.category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        {/* Active group detail */}
        {groups
          .filter((g) => g.category === active)
          .map((g) => (
            <motion.div
              key={g.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="card self-start p-6"
            >
              <p className="eyebrow">{g.category}</p>
              <p className="mt-2 text-[15px] text-muted">{g.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s.name} className="rounded-xl border border-line/10 bg-line/[0.04] px-3 py-2 text-sm text-fg">
                    {s.name}
                    {s.note ? <span className="ml-2 font-mono text-[10px] text-faint">{s.note}</span> : null}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        {/* Full map, scannable in one glance */}
        <div className="grid content-start gap-3">
          {groups.map((g) => (
            <button
              key={g.category}
              onClick={() => setActive(g.category)}
              className={cx(
                'card card-hover p-4 text-left',
                active === g.category && 'border-accent/40',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-medium">{g.category}</p>
                <span className="font-mono text-[10px] text-faint">{g.skills.length}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1">
                {g.skills.slice(0, 6).map((s) => (
                  <span key={s.name} className="rounded-md bg-line/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-muted">
                    {s.name}
                  </span>
                ))}
                {g.skills.length > 6 ? (
                  <span className="px-1 py-0.5 font-mono text-[10px] text-faint">+{g.skills.length - 6}</span>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
