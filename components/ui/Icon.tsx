import type { ReactElement, SVGProps } from 'react';
import type { IconName } from '@/content/portfolio';

type Name =
  | IconName
  | 'arrow-right'
  | 'arrow-up'
  | 'command'
  | 'sun'
  | 'moon'
  | 'search'
  | 'close'
  | 'plus'
  | 'sparkle'
  | 'layers'
  | 'check';

const paths: Record<Name, ReactElement> = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  linkedin: (
    <>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3z" />
      <path d="M10 9h3.8v1.7h.05A4.2 4.2 0 0 1 17.6 8.7c3.2 0 4.4 2 4.4 5.2V21h-4v-6.3c0-1.6-.6-2.7-2-2.7-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V21h-4z" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="none" strokeWidth="1.6" stroke="currentColor" />
      <path d="m3.5 7 7.6 5.3a1.6 1.6 0 0 0 1.8 0L20.5 7" fill="none" strokeWidth="1.6" stroke="currentColor" />
    </>
  ),
  phone: (
    <path
      d="M4.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5L13.5 12l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 2.5 5.7a2 2 0 0 1 2-2.2Z"
      fill="none"
      strokeWidth="1.6"
      stroke="currentColor"
    />
  ),
  download: (
    <>
      <path d="M12 3.5v11" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19.5h16" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4 11 13" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  x: <path d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6.2L5.6 21H2.4l7.5-8.5L2.9 3h5.7l4.1 5.8Z" />,
  scholar: <path d="M12 3 2 8l10 5 10-5-10-5Zm-6 8.4V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.6l-6 3-6-3Z" />,
  'arrow-right': (
    <>
      <path d="M4 12h15" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
      <path d="m13.5 6.5 5.5 5.5-5.5 5.5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
      <path d="m6.5 10.5 5.5-5.5 5.5 5.5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  command: (
    <path
      d="M9 3a3 3 0 1 1-3 3v12a3 3 0 1 1 3-3h6a3 3 0 1 1 3 3V6a3 3 0 1 1-3 3H9Z"
      fill="none"
      strokeWidth="1.6"
      stroke="currentColor"
      strokeLinejoin="round"
    />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" fill="none" strokeWidth="1.7" stroke="currentColor" />
      <path
        d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
        fill="none"
        strokeWidth="1.7"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </>
  ),
  moon: (
    <path
      d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
      fill="none"
      strokeWidth="1.7"
      stroke="currentColor"
      strokeLinejoin="round"
    />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" fill="none" strokeWidth="1.7" stroke="currentColor" />
      <path d="m16 16 4.5 4.5" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
    </>
  ),
  close: (
    <path d="M6 6l12 12M18 6 6 18" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
  ),
  plus: (
    <path d="M12 5v14M5 12h14" fill="none" strokeWidth="1.7" stroke="currentColor" strokeLinecap="round" />
  ),
  sparkle: (
    <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5ZM19 16l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
  ),
  layers: (
    <>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinejoin="round" />
      <path d="m3 12.5 9 4.5 9-4.5" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinejoin="round" />
      <path d="m3 17 9 4.5 9-4.5" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinejoin="round" />
    </>
  ),
  check: (
    <path d="m5 12.5 4.5 4.5L19 7" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export function Icon({ name, size = 18, ...rest }: { name: Name; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
