import Link from 'next/link';
import { portfolio, sections } from '@/content/portfolio';
import { Aurora } from '@/components/Aurora';
import { Icon } from '@/components/ui/Icon';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-32">
      <Aurora dense />
      <div className="shell">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">Error 404</p>
        <h1 className="mt-4 text-display font-semibold">
          This route <span className="grad-text">does not exist.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Retrieval came back with nothing for that path, which is a little embarrassing given what I
          build for a living. Here is where you were probably trying to go.
        </p>

        <div className="mt-9 flex flex-wrap gap-2.5">
          <Link href="/" className="btn-primary">
            Back home <Icon name="arrow-right" size={15} />
          </Link>
          <a href={portfolio.resume} download className="btn-ghost">
            <Icon name="download" size={15} /> Résumé
          </a>
          <a href={`mailto:${portfolio.email}`} className="btn-ghost">
            <Icon name="mail" size={15} /> Email me
          </a>
        </div>

        <div className="mt-12 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {sections.map((s) => (
            <Link key={s.id} href={`/#${s.id}`} className="card card-hover group flex items-center justify-between p-4">
              <span className="text-[13px]">{s.label}</span>
              <Icon name="arrow-right" size={14} className="text-faint transition group-hover:translate-x-0.5 group-hover:text-fg" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
