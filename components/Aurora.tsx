'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated background: two drifting gradient blooms over a fine grid, plus a
 * noise layer. Pure CSS transforms, so no canvas and no layout thrash.
 */
export function Aurora({ dense = false }: { dense?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.5] mask-fade-b"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--line) / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.045) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* blooms */}
      <motion.div
        className="absolute -left-[15%] -top-[25%] h-[60vw] w-[60vw] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.28), transparent 62%)' }}
        animate={reduced ? undefined : { x: ['0%', '6%', '0%'], y: ['0%', '8%', '0%'], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[20%] top-[10%] h-[55vw] w-[55vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent-2) / 0.24), transparent 62%)' }}
        animate={reduced ? undefined : { x: ['0%', '-7%', '0%'], y: ['0%', '-6%', '0%'], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      {dense ? (
        <motion.div
          className="absolute bottom-[-20%] left-[25%] h-[45vw] w-[45vw] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.16), transparent 65%)' }}
          animate={reduced ? undefined : { y: ['0%', '-10%', '0%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
      {/* film grain */}
      <div className="noise absolute inset-0 opacity-[0.15]" />
      {/* bottom fade into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
