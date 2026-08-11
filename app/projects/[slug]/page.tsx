import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolio } from '@/content/portfolio';
import { Aurora } from '@/components/Aurora';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';

type Params = { params: Promise<{ slug: string }> };

/** Static export of every case study, so navigation is instant and no server work is needed. */
export function generateStaticParams() {
  return portfolio.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title}, ${portfolio.name}`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const others = portfolio.projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="relative overflow-hidden pb-24 pt-32">
      <Aurora />
      <div className="shell">
        <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-[12px] text-muted transition hover:text-fg">
          <span className="rotate-180">
            <Icon name="arrow-right" size={14} />
          </span>
          All projects
        </Link>

        <Reveal>
          <p className="eyebrow mt-8">
            {project.status ?? 'Project'} · {project.year}
          </p>
          <h1 className="mt-3 text-headline font-semibold text-balance">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.links.github ? (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Icon name="github" size={15} /> Source
              </a>
            ) : null}
            {project.links.demo ? (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live demo <Icon name="external" size={14} />
              </a>
            ) : null}
            {project.links.writeup ? (
              <a href={project.links.writeup} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Devpost <Icon name="external" size={14} />
              </a>
            ) : null}
            <a href={portfolio.resume} download className="btn-ghost">
              <Icon name="download" size={15} /> Résumé
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-5">
            <Reveal className="card p-6 sm:p-8">
              <p className="eyebrow">The problem</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.problem}</p>
              <div className="my-6 rule" />
              <p className="eyebrow">What I built</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.solution}</p>
            </Reveal>

            {project.caseStudy.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.04} className="card p-6 sm:p-8">
                <h2 className="text-title font-semibold">{s.heading}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid content-start gap-5">
            <Reveal className="card p-6">
              <p className="eyebrow">Outcome</p>
              <ul className="mt-3 space-y-2.5">
                {project.impact.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed">
                    <Icon name="check" size={13} className="mt-1 shrink-0 text-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="card p-6">
              <p className="eyebrow">Stack</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="card p-6">
              <ArchitectureDiagram architecture={project.architecture} tech={project.tech} />
            </Reveal>
          </div>
        </div>

        {/* Next projects */}
        <div className="mt-20">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="card card-hover group p-5">
                <p className="text-[15px] font-semibold transition-colors group-hover:text-accent">{p.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] text-faint">
                  Case study <Icon name="arrow-right" size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card mt-16 flex flex-wrap items-center justify-between gap-6 p-8">
          <div>
            <p className="text-title font-semibold">Want the deeper version of this?</p>
            <p className="mt-2 text-[14px] text-muted">
              I am happy to walk through the tradeoffs, the failure modes, and what I would do differently.
            </p>
          </div>
          <a href={`mailto:${portfolio.email}`} className="btn-primary">
            <Icon name="mail" size={15} /> Email me
          </a>
        </div>
      </div>
    </article>
  );
}
