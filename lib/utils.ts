/** Tiny class-name joiner — avoids pulling clsx into the bundle. */
export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Deterministic hue from a string — used for generated project covers/avatars. */
export function hueFrom(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % 360;
  return h;
}

/**
 * Parses the "Mon YYYY" strings used in portfolio.ts into a sortable number.
 * "Present" (or anything unparseable) sorts as the far future so current roles
 * always land on top.
 */
export function monthValue(label: string) {
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const match = /^([A-Za-z]{3})[a-z.]*\s+(\d{4})$/.exec(label.trim());
  if (!match) return Number.POSITIVE_INFINITY; // "Present"
  const month = months.indexOf(match[1].toLowerCase());
  return Number(match[2]) * 12 + (month < 0 ? 0 : month);
}

export function isPlaceholder(value: string | undefined) {
  return !value || value.startsWith('TODO');
}
