'use client';

import { motion } from 'framer-motion';
import type { Project } from '@/content/portfolio';
import { Icon } from './ui/Icon';

/**
 * Data-driven architecture diagram: a vertical flow rendered from
 * `project.architecture.nodes`. No image assets, so it stays sharp,
 * themeable, and screen-reader friendly.
 */
export function ArchitectureDiagram({
  architecture,
  tech,
}: {
  architecture: Project['architecture'];
  tech: string[];
}) {
  return (
    <div>
      <p className="eyebrow">Data flow</p>
      <h4 className="mt-2 text-lg font-semibold tracking-tight">{architecture.title}</h4>

      <ol className="mt-6 space-y-2">
        {architecture.nodes.map((node, i) => (
          <motion.li
            key={node.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass flex items-start gap-4 rounded-xl p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent/25 to-accent2/25 font-mono text-[11px] font-bold">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{node.label}</p>
                <p className="mt-0.5 font-mono text-[12px] leading-relaxed text-muted">{node.detail}</p>
              </div>
            </div>
            {i < architecture.nodes.length - 1 ? (
              <div className="flex justify-start pl-[26px]">
                <span aria-hidden className="h-4 w-px bg-gradient-to-b from-accent/60 to-accent2/30" />
              </div>
            ) : null}
          </motion.li>
        ))}
      </ol>

      <div className="mt-6 rule" />
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-faint">
        <Icon name="layers" size={12} /> This diagram is generated from portfolio.ts. Edit the `architecture` field to change it.
      </p>
    </div>
  );
}
