import { Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { categoryName } from '../data/categories';
import { formatDateTime } from '../lib/format';
import { paths } from '../lib/paths';

/** Category kicker (+ demo badge). Linkable unless nested inside another link context. */
export function Kicker({ article, link = true }: { article: ArticleSummary; link?: boolean }) {
  const name = categoryName(article.category);
  return (
    <span className="kicker-row">
      {article.isBreaking && <span className="breaking-chip">Breaking</span>}
      {link ? (
        <Link to={paths.category(article.category)} className="kicker" style={{ position: 'relative', zIndex: 2 }}>
          {name}
        </Link>
      ) : (
        <span className="kicker">{name}</span>
      )}
      {article.isDemo && <span className="demo-badge" title="Fictional demonstration content">Demo</span>}
    </span>
  );
}

/** Timestamp + optional attribution line used on cards. */
export function StoryMeta({ article, showAuthor = false }: { article: ArticleSummary; showAuthor?: boolean }) {
  return (
    <p className="meta">
      <time dateTime={article.publishedAt}>{formatDateTime(article.publishedAt)}</time>
      {showAuthor && article.authors[0] && <> · {article.authors[0].name}</>}
    </p>
  );
}
