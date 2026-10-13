/**
 * TORAVI24 shared content model.
 *
 * Every view (homepage, category pages, search, article pages) consumes these
 * types. The future publishing API must return data that maps onto them —
 * see `src/services/content/README.md` for the mapping contract.
 */

export type CategorySlug =
  | 'world'
  | 'politics'
  | 'geopolitics'
  | 'technology'
  | 'science'
  | 'climate'
  | 'business'
  | 'security';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

/** Publication workflow state. Only `published` items are ever shown publicly. */
export type PublicationStatus = 'draft' | 'scheduled' | 'published' | 'retracted';

export interface ArticleImage {
  /** Absolute URL, or a base URL resolved by `src/lib/images.ts`. */
  url: string;
  /** Descriptive alt text. Required for accessibility. */
  alt: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
  width?: number;
  height?: number;
}

export interface ArticleSource {
  /** Name of the primary source (institution, document, dataset…). */
  name: string;
  /** Original source URL, when one exists. */
  url?: string;
}

export interface ArticleAuthor {
  name: string;
  role?: string;
}

/** Structured body blocks keep rendering safe (no raw HTML injection). */
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'note'; title?: string; text: string };

export interface EditorialProcess {
  /** True when AI tools were used in research or drafting. */
  aiAssisted: boolean;
  /** Name/role of the human editor who verified the piece. Omit if not reviewed. */
  verifiedBy?: string;
}

export interface Article {
  id: string;
  slug: string;
  headline: string;
  /** Standfirst / short summary used on cards, search results and meta descriptions. */
  summary: string;
  body: ArticleBlock[];
  category: CategorySlug;
  tags?: string[];
  image: ArticleImage | null;
  /** Primary-source attribution. First entry is treated as the main source. */
  sources: ArticleSource[];
  authors: ArticleAuthor[];
  /** ISO-8601 timestamps. */
  publishedAt: string;
  updatedAt?: string;
  isFeatured: boolean;
  isBreaking: boolean;
  status: PublicationStatus;
  editorial?: EditorialProcess;
  /** Marks demonstration content so the UI can label it. Never set by production data. */
  isDemo?: boolean;
}

/** Lightweight shape used for lists (cards, search results). */
export type ArticleSummary = Omit<Article, 'body'>;

export interface Paged<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
}
