import { portfolio } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function AboutSection() {
  const { about } = portfolio;

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          I get curious about something, <span className="grad-text">and then I go all the way in.</span>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="card p-6 sm:p-8">
          <p className="text-lg leading-relaxed text-balance sm:text-xl">{about.lede}</p>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <a href={`mailto:${portfolio.email}`} className="btn-primary !py-2 !text-[13px]">
              <Icon name="mail" size={14} /> {portfolio.email}
            </a>
            <a href={portfolio.resume} download className="btn-ghost !py-2 !text-[13px]">
              <Icon name="download" size={14} /> Résumé
            </a>
          </div>
        </Reveal>

        <div className="grid content-start gap-3">
          {about.principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="card card-hover group p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-line/[0.06] font-mono text-[10px] text-muted transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
