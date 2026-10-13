import { SITE } from '../config/site';

const dateTimeFmt = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
  timeZoneName: 'short',
});

const dateFmt = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** e.g. "13 Oct 2026, 15:20 UTC" — absolute, unambiguous timestamps for news. */
export function formatDateTime(iso: string): string {
  return dateTimeFmt.format(new Date(iso));
}

/** e.g. "13 Oct 2026" */
export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

/** Estimated reading time from plain text word count (≈ 230 wpm). */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 230));
}

export function countWords(texts: string[]): number {
  return texts.reduce((n, t) => n + t.trim().split(/\s+/).filter(Boolean).length, 0);
}
