import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import { Reveal } from './Reveal';

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  aside,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className={cx('relative scroll-mt-28 py-20 sm:py-28', className)}>
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-3 text-headline font-semibold text-balance">{title}</h2>
              {lede ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lede}</p> : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
