import type { Article, ArticleSummary, Paged } from '../../types/content';
import type { ContentProvider, ListOptions, SearchOptions } from './types';

/**
 * FUTURE: read-only client for the TORAVI24 publishing API.
 *
 * This is a scaffold showing the intended shape. It is NOT active — the app
 * uses the demo provider unless VITE_CONTENT_SOURCE=api is set.
 *
 * Rules for the real implementation:
 *  - Public, read-only GET endpoints only. No credentials in the browser.
 *  - The API must only return `published` items.
 *  - Map API field names onto `Article` here, so components never change.
 *
 * Suggested endpoints (adjust to the real API):
 *   GET /articles?category=&offset=&limit=&exclude=
 *   GET /articles/featured?limit=
 *   GET /articles/breaking
 *   GET /articles/most-read?limit=
 *   GET /articles/{slug}
 *   GET /articles/{slug}/related?limit=
 *   GET /search?q=&offset=&limit=
 */
export function createApiProvider(baseUrl: string): ContentProvider {
  const root = baseUrl.replace(/\/+$/, '');

  async function get<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
    const url = new URL(root + path);
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== '') url.searchParams.set(k, String(v));
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (res.status === 404) return null as T;
    if (!res.ok) throw new Error(`Content API error ${res.status}`);
    return (await res.json()) as T;
  }

  // TODO: add a mapping layer (e.g. `mapApiArticle`) when the API schema is final.
  return {
    listArticles: ({ category, offset, limit, excludeIds }: ListOptions = {}) =>
      get<Paged<ArticleSummary>>('/articles', { category, offset, limit, exclude: excludeIds?.join(',') }),
    getFeatured: (limit) => get<ArticleSummary[]>('/articles/featured', { limit }),
    getBreaking: () => get<ArticleSummary[]>('/articles/breaking'),
    getMostRead: (limit) => get<ArticleSummary[]>('/articles/most-read', { limit }),
    getArticle: (slug) => get<Article | null>(`/articles/${encodeURIComponent(slug)}`),
    getRelated: (article, limit) =>
      get<ArticleSummary[]>(`/articles/${encodeURIComponent(article.slug)}/related`, { limit }),
    search: (q, { offset, limit }: SearchOptions = {}) => get<Paged<ArticleSummary>>('/search', { q, offset, limit }),
  };
}
