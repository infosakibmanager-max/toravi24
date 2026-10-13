/**
 * Site-wide configuration. Values come from Vite env variables (VITE_*) so they
 * can be changed per environment without touching components.
 * Never put secrets here — everything in VITE_* is shipped to the browser.
 */
const env = import.meta.env;

function trimSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

export const SITE = {
  name: 'TORAVI24',
  tagline: 'AI-researched. Human-verified. Global news, explained.',
  description:
    'TORAVI24 is a global digital news channel. We turn primary-source intelligence into clear, useful journalism on world affairs, politics, geopolitics, technology, science, climate, business and security.',
  principle: 'Primary-source intelligence → editorial understanding → useful journalism.',
  /** Absolute public URL, e.g. https://www.yourdomain.com — used for canonical/OG tags. */
  url: env.VITE_SITE_URL ? trimSlash(env.VITE_SITE_URL) : '',
  /** Base path the app is served from ("/" for a custom domain). */
  basePath: env.BASE_URL,
  /** Which content provider to use: "demo" (local data) or "api" (future). */
  contentSource: (env.VITE_CONTENT_SOURCE || 'demo') as 'demo' | 'api',
  apiBaseUrl: env.VITE_API_BASE_URL || '',
  /** While false, pages carry noindex so demo content is never indexed. */
  allowIndexing: env.VITE_ALLOW_INDEXING === 'true',
  locale: 'en-GB',
};

export const isDemoMode = SITE.contentSource === 'demo';

/** Build an absolute URL for canonical / Open Graph tags. Empty when SITE.url is unset. */
export function absoluteUrl(path: string): string {
  if (!SITE.url) return '';
  const base = trimSlash(SITE.url + SITE.basePath);
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
