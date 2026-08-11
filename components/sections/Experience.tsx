'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { portfolio, type Experience as Job } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Icon } from '../ui/Icon';
import { cx, monthValue } from '@/lib/utils';

/**
 * Reverse chronological: newest end date first, start date breaks ties.
 * Sorting here (rather than relying on array order) means you can add a role
 * anywhere in portfolio.ts and the timeline stays correct.
 */
function inReverseChronologicalOrder(jobs: Job[]) {
  return [...jobs].sort(
    (a, b) => monthValue(b.end) - monthValue(a.end) || monthValue(b.start) - monthValue(a.start),
  );
}

function Logo({ job }: { job: Job }) {
  return job.logo ? (
    <Image src={job.logo} alt={`${job.company} logo`} width={44} height={44} className="h-11 w-11 rounded-xl object-contain" />
  ) : (
    // Logo placeholder. Drop a file in /public/logos and set `logo` in portfolio.ts.
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line/10 bg-line/[0.05] font-mono text-xs font-bold tracking-tight text-muted">
      {job.initials}
    </span>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `job-panel-${index}`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 sm:pl-14"
    >
      {/* timeline rail node */}
      <span
        className={cx(
          'absolute left-[11px] top-7 z-10 h-2.5 w-2.5 rounded-full ring-4 ring-bg sm:left-[19px]',
          job.current ? 'bg-accent' : 'bg-line/30',
        )}
      >
        {job.current ? <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" /> : null}
      </span>

      <div className="card card-hover group p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <Logo job={job} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h3 className="text-title font-semibold">{job.role}</h3>
              {job.current ? (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                  Current
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted">
              <span className="font-medium text-fg">{job.company}</span>
              {job.team ? ` · ${job.team}` : ''} · {job.location} · {job.type}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-faint">
              {job.start} to {job.end}
            </p>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="shrink-0 rounded-full border border-line/10 p-2 text-muted transition duration-300 hover:border-accent/40 hover:text-fg"
          >
            <motion.span animate={{ rotate: open ? 45 : 0 }} className="block">
              <Icon name="plus" size={15} />
            </motion.span>
            <span className="sr-only">{open ? 'Hide' : 'Show'} details for {job.role} at {job.company}</span>
          </button>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">{job.summary}</p>

        {/* Business impact. This is the line a recruiter actually needs. */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-accent/[0.06] p-3.5">
          <Icon name="sparkle" size={15} className="mt-0.5 shrink-0 text-accent" />
          <p className="text-[13px] font-medium leading-relaxed">{job.impact}</p>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-2.5">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                    <Icon name="check" size={14} className="mt-1 shrink-0 text-accent" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {job.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {/* hover sheen */}
        <span className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-line/[0.05] to-transparent group-hover:animate-shimmer" />
        </span>
      </div>
    </motion.li>
  );
}

export function ExperienceSection() {
  return (
    <Section
      id="work"
      eyebrow="Experience"
      title={
        <>
          Five teams, and the same approach <span className="grad-text">every time: ship it, then measure it.</span>
        </>
      }
      lede="Founding engineering, machine learning internships, and client work. Each entry expands if you want the specifics."
      aside={
        <a href={portfolio.resume} download className="btn-ghost">
          <Icon name="download" size={15} /> Full résumé
        </a>
      }
    >
      <ol className="relative space-y-5">
        {/* the rail */}
        <span
          aria-hidden
          className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-accent/50 via-line/15 to-transparent sm:left-6"
        />
        {inReverseChronologicalOrder(portfolio.experience).map((job, i) => (
          <JobCard key={job.company + job.role} job={job} index={i} />
        ))}
      </ol>
    </Section>
  );
}
