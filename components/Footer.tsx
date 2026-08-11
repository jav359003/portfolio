import { portfolio, sections } from '@/content/portfolio';
import { Icon } from './ui/Icon';

export function Footer() {
  return (
    <footer className="relative border-t border-line/10 py-12">
      <div className="shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-mono text-[11px] font-bold text-bg">
                {portfolio.initials}
              </span>
              <span className="text-sm font-semibold">{portfolio.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
              {portfolio.title} · {portfolio.subtitle}
            </p>
            <p className="mt-1 font-mono text-[11px] text-faint">{portfolio.location}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:flex sm:gap-8">
            <ul className="space-y-2">
              {sections.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[13px] text-muted transition hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {sections.slice(4).map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[13px] text-muted transition hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={portfolio.resume} download className="text-[13px] text-muted transition hover:text-fg">
                  Résumé
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex gap-2">
            {portfolio.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.icon === 'mail' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass rounded-full p-2.5 text-muted transition hover:text-fg"
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 rule" />
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} {portfolio.name}. Built with Next.js, Tailwind & Framer Motion.
          </p>
          <p className="font-mono text-[11px] text-faint">
            <span className="kbd">⌘K</span> command palette · <span className="kbd">?</span> shortcuts
          </p>
        </div>
      </div>
    </footer>
  );
}
