'use client';

/**
 * Chrome = the persistent browser-level UI: scroll progress bar, animated
 * cursor, loading curtain, and back-to-top.
 * All of it is client-side and none of it blocks first paint.
 */

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { portfolio } from '@/content/portfolio';
import { Icon } from './ui/Icon';

/* ------------------------------------------------------------------ progress */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-accent to-accent2"
    />
  );
}

/* -------------------------------------------------------------------- cursor */
export function AnimatedCursor() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Pointer-fine only: never on touch devices.
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setActive(Boolean(el.closest('a, button, [data-cursor="hover"]')));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden rounded-full bg-fg md:block"
        style={{ width: 6, height: 6, left: pos.x - 3, top: pos.y - 3 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[99] hidden rounded-full border border-accent/60 md:block"
        animate={{
          left: pos.x - (active ? 22 : 14),
          top: pos.y - (active ? 22 : 14),
          width: active ? 44 : 28,
          height: active ? 44 : 28,
          opacity: active ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.4 }}
      />
    </>
  );
}

/* ------------------------------------------------------------------- loading */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 0 : 900);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[120] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="font-mono text-xs tracking-[0.4em] text-faint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {portfolio.initials}
            </motion.span>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-line/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent2"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* --------------------------------------------------------------- back to top */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="glass fixed bottom-5 left-5 z-[70] rounded-full p-3 text-muted transition hover:text-fg"
          aria-label="Back to top"
        >
          <Icon name="arrow-up" size={16} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
