import type { ArticleSummary } from '../types/content';
import { NewsCard } from './NewsCard';
import styles from './LatestNewsSection.module.css';

interface Props {
  articles: ArticleSummary[];
  title?: string;
}

export function LatestNewsSection({ articles, title = 'Latest News' }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section} aria-label={title}>
      <div className="section-heading">
        <h2>{title}</h2>
      </div>

      <div className={styles.grid}>
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
