import type { ArticleSummary, CategorySlug } from '../types/content';

/** Canonical URL patterns. Keep in sync with routes in App.tsx and build/prerender.ts. */
export const paths = {
  home: () => '/',
  category: (slug: CategorySlug) => `/${slug}`,
  article: (a: Pick<ArticleSummary, 'category' | 'slug'>) => `/${a.category}/${a.slug}`,
  search: (q?: string) => (q ? `/search?q=${encodeURIComponent(q)}` : '/search'),
};
