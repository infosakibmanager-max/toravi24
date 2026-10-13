import { Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { formatDateTime } from '../lib/format';
import { paths } from '../lib/paths';
import styles from './BreakingNewsBar.module.css';

interface Props {
  articles: ArticleSummary[];
}

export function BreakingNewsBar({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Display the most recent breaking item
  const current = articles[0];

  return (
    <div className={styles.bar} role="region" aria-label="Breaking News">
      <div className="container">
        <div className={styles.inner}>
          <span className={styles.label}>Breaking</span>
          <div className={styles.content}>
            <Link to={paths.article(current)} className={styles.headline}>
              {current.headline}
            </Link>
            <span className={styles.metaTime}>
              <time dateTime={current.publishedAt}>{formatDateTime(current.publishedAt)}</time>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
