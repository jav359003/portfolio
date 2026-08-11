import { portfolio } from '@/content/portfolio';
import { Section } from '../ui/Section';
import { Reveal } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

export function EducationSection() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={
        <>
          Computer science at Maryland, with a <span className="grad-text">machine learning</span> concentration.
        </>
      }
    >
      <div className="grid gap-5">
        {portfolio.education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 0.05} className="card card-hover p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line/10 bg-line/[0.05] font-mono text-xs font-bold text-muted">
                  {ed.initials}
                </span>
                <div>
                  <h3 className="text-title font-semibold">{ed.school}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {ed.degree} · {ed.concentration}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-faint">
                    {ed.start} to {ed.end} · {ed.location}
                    {ed.gpa ? ` · GPA ${ed.gpa}` : ''}
                  </p>
                </div>
              </div>
              <a
                href="https://umd.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2 !text-[13px]"
              >
                University <Icon name="external" size={13} />
              </a>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Relevant coursework</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ed.coursework.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Achievements & involvement</p>
                <ul className="mt-3 space-y-2">
                  {ed.achievements.map((a) => (
                    <li key={a} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                      <Icon name="check" size={13} className="mt-1 shrink-0 text-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
