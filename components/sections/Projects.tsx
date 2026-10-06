'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, type PointerEvent } from 'react';
import { portfolio, type Project } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Icon } from '../ui/Icon';
import { Modal } from '../ui/Modal';
import { ArchitectureDiagram } from '../ArchitectureDiagram';
import { cx, hueFrom } from '@/lib/utils';

/** Generated cover so a project without an image still looks intentional. */
function Cover({ project, featured }: { project: Project; featured?: boolean }) {
  const hue = hueFrom(project.slug);
  return (
    <div
      className={cx(
        'relative overflow-hidden',
        // Featured cards are twice as wide, so they get a letterbox crop rather
        // than a 16/9 slab of empty gradient.
        featured ? 'aspect-[24/7] max-h-[260px]' : 'aspect-[16/10]',
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          style={{
            background: `radial-gradient(120% 120% at 20% 10%, hsl(${hue} 85% 62% / 0.35), transparent 60%), radial-gradient(100% 100% at 85% 90%, hsl(${(hue + 60) % 360} 85% 62% / 0.28), transparent 55%), rgb(var(--elevated))`,
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgb(var(--line) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Oversized wordmark so an image-less project still reads as designed. */}
          <span
            aria-hidden
            className="absolute -bottom-2 left-5 select-none text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-tight text-fg/[0.07]"
          >
            {project.title}
          </span>
          <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {project.tech.slice(0, 3).join(' · ')}
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/90 to-transparent" />
      {project.status ? (
        <span className="glass absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          {project.status}
        </span>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const [arch, setArch] = useState(false);
  const [shot, setShot] = useState<number | null>(null);

  // Subtle 3D tilt toward the pointer.
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  const transform = useTransform<number, string>(
    [rx, ry],
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cx('group', featured && 'lg:col-span-2')}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ transform }}
        className="card card-hover flex h-full flex-col"
      >
        <Cover project={project} featured={featured} />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-title font-semibold">{project.title}</h3>
            <span className="shrink-0 font-mono text-[11px] text-faint">{project.year}</span>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Problem</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div>
              <p className="eyebrow">Approach</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{project.solution}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-line/10 bg-line/[0.03] p-4">
            <p className="eyebrow">Impact</p>
            <ul className="mt-2 space-y-1.5">
              {project.impact.map((i) => (
                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed">
                  <Icon name="check" size={13} className="mt-1 shrink-0 text-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 pt-1">
            <Link href={`/projects/${project.slug}`} className="btn-primary !py-2 !text-[13px]">
              Case study <Icon name="arrow-right" size={14} />
            </Link>
            <button onClick={() => setArch(true)} className="btn-ghost !py-2 !text-[13px]">
              <Icon name="layers" size={14} /> Architecture
            </button>
            {project.screenshots?.length ? (
              <button onClick={() => setShot(0)} className="btn-ghost !py-2 !text-[13px]">
                Screenshots
              </button>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-3 !py-2"
                aria-label={`${project.title} on GitHub`}
              >
                <Icon name="github" size={15} />
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2 !text-[13px]"
              >
                Live demo <Icon name="external" size={13} />
              </a>
            ) : null}
            {project.links.writeup ? (
              <a
                href={project.links.writeup}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2 !text-[13px]"
              >
                Write-up <Icon name="external" size={13} />
              </a>
            ) : null}
          </div>
        </div>
      </motion.div>

      <Modal open={arch} onClose={() => setArch(false)} title={`${project.title} architecture`}>
        <ArchitectureDiagram architecture={project.architecture} tech={project.tech} />
      </Modal>

      <Modal open={shot !== null} onClose={() => setShot(null)} title={`${project.title} screenshots`}>
        <div className="grid gap-4">
          {project.screenshots?.map((s) => (
            <figure key={s.src}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line/10">
                <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-[12px] text-faint">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Modal>
    </motion.article>
  );
}

export function ProjectsSection() {
  const featured = portfolio.projects.filter((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          What I have built, <span className="grad-text">and what the numbers</span> actually were.
        </>
      }
      lede="Featured work comes first. Every card opens an architecture diagram and a full case study covering the problem, the decisions I made, and the outcome I measured."
      aside={
        <a
          href={portfolio.socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <Icon name="github" size={15} /> All repos
        </a>
      }
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} featured />
        ))}
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
