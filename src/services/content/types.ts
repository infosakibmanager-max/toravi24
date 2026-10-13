import type { Article, ArticleSummary, CategorySlug, Paged } from '../../types/content';

export interface ListOptions {
  category?: CategorySlug;
  offset?: number;
  limit?: number;
  /** Exclude these article IDs (e.g. to avoid repeating the lead story). */
  excludeIds?: string[];
}

export interface SearchOptions {
  offset?: number;
  limit?: number;
}

/**
 * The contract every content source must fulfil. UI code only ever talks to
 * this interface (via `src/services/content/index.ts`), never to a concrete
 * provider — so swapping demo data for the real publishing API is a one-line
 * change in configuration.
 *
 * All methods are read-only and must return only `status === 'published'` items.
 */
export interface ContentProvider {
  /** Latest published articles, newest first. */
  listArticles(options?: ListOptions): Promise<Paged<ArticleSummary>>;
  /** Editorially featured articles (lead + secondary), newest first. */
  getFeatured(limit?: number): Promise<ArticleSummary[]>;
  /** Active breaking-news items. Empty array when there is no breaking news. */
  getBreaking(): Promise<ArticleSummary[]>;
  /** Most-read list. Requires analytics in production. */
  getMostRead(limit?: number): Promise<ArticleSummary[]>;
  /** Full article by slug, or null when not found / not published. */
  getArticle(slug: string): Promise<Article | null>;
  /** Related articles for a given article. */
  getRelated(article: ArticleSummary, limit?: number): Promise<ArticleSummary[]>;
  /** Full-text search over headlines and summaries. */
  search(query: string, options?: SearchOptions): Promise<Paged<ArticleSummary>>;
}
