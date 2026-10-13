import type { Article, ArticleSummary, Paged } from '../../types/content';
import { DEMO_ARTICLES, DEMO_MOST_READ_SLUGS } from '../../data/demo/articles';
import type { ContentProvider, ListOptions, SearchOptions } from './types';

/** Small artificial delay so loading states are visible during design review. */
const LATENCY_MS = 180;
const wait = <T,>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));

const toSummary = ({ body: _body, ...rest }: Article): ArticleSummary => rest;

const byNewest = (a: ArticleSummary, b: ArticleSummary) =>
  Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

const published = DEMO_ARTICLES.filter((a) => a.status === 'published');
const summaries = published.map(toSummary).sort(byNewest);

function paginate<T>(items: T[], offset = 0, limit = 10): Paged<T> {
  const page = items.slice(offset, offset + limit);
  return { items: page, total: items.length, offset, limit, hasMore: offset + limit < items.length };
}

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'");
}

export const demoProvider: ContentProvider = {
  async listArticles({ category, offset = 0, limit = 10, excludeIds = [] }: ListOptions = {}) {
    const items = summaries.filter(
      (a) => (!category || a.category === category) && !excludeIds.includes(a.id),
    );
    return wait(paginate(items, offset, limit));
  },

  async getFeatured(limit = 3) {
    return wait(summaries.filter((a) => a.isFeatured).slice(0, limit));
  },

  async getBreaking() {
    return wait(summaries.filter((a) => a.isBreaking));
  },

  async getMostRead(limit = 5) {
    const bySlug = new Map(summaries.map((a) => [a.slug, a]));
    const items = DEMO_MOST_READ_SLUGS.map((s) => bySlug.get(s)).filter(
      (a): a is ArticleSummary => Boolean(a),
    );
    return wait(items.slice(0, limit));
  },

  async getArticle(slug: string) {
    return wait(published.find((a) => a.slug === slug) ?? null);
  },

  async getRelated(article: ArticleSummary, limit = 4) {
    const tags = new Set(article.tags ?? []);
    const scored = summaries
      .filter((a) => a.id !== article.id)
      .map((a) => {
        let score = a.category === article.category ? 2 : 0;
        for (const t of a.tags ?? []) if (tags.has(t)) score += 1;
        return { a, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score || byNewest(x.a, y.a));
    return wait(scored.slice(0, limit).map((x) => x.a));
  },

  async search(query: string, { offset = 0, limit = 20 }: SearchOptions = {}) {
    const terms = normalise(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return wait(paginate<ArticleSummary>([], offset, limit));

    const scored = summaries
      .map((a) => {
        const headline = normalise(a.headline);
        const summary = normalise(a.summary);
        let score = 0;
        for (const t of terms) {
          if (headline.includes(t)) score += 3;
          else if (summary.includes(t)) score += 1;
          else return null; // every term must match somewhere
        }
        return { a, score };
      })
      .filter((x): x is { a: ArticleSummary; score: number } => x !== null)
      .sort((x, y) => y.score - x.score || byNewest(x.a, y.a))
      .map((x) => x.a);

    return wait(paginate(scored, offset, limit));
  },
};
