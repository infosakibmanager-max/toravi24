import { Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { paths } from '../lib/paths';
import { Kicker, StoryMeta } from './StoryMeta';
import styles from './MostReadSection.module.css';

interface Props {
  articles: ArticleSummary[];
}

export function MostReadSection({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Most Read Stories">
      <div className="section-heading">
        <h2>Most Read</h2>
      </div>

      <ol className={styles.list}>
        {articles.map((article, idx) => (
          <li key={article.id} className={styles.item}>
            <span className={styles.rank} aria-hidden="true">
              {idx + 1}
            </span>
            <Kicker article={article} />
            <h3 className={styles.headline}>
              <Link to={paths.article(article)}>
                {article.headline}
              </Link>
            </h3>
            <div className={styles.meta}>
              <StoryMeta article={article} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
