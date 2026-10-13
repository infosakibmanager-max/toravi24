import { Link } from 'react-router-dom';
import type { ArticleSummary, CategorySlug } from '../types/content';
import { categoryName } from '../data/categories';
import { paths } from '../lib/paths';
import { NewsCard } from './NewsCard';
import styles from './CategorySection.module.css';

interface Props {
  category: CategorySlug;
  articles: ArticleSummary[];
}

export function CategorySection({ category, articles }: Props) {
  if (!articles || articles.length === 0) return null;

  const title = categoryName(category);
  const [first, ...rest] = articles;

  return (
    <section className={styles.section} aria-label={`${title} Section`}>
      <div className="section-heading">
        <h2>{title}</h2>
        <Link to={paths.category(category)}>View all {title} &rarr;</Link>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <NewsCard
            article={first}
            variant="vertical"
            imageRatio="16x9"
            imageSizes="(max-width: 840px) 100vw, 600px)"
          />
        </div>

        {rest.length > 0 && (
          <div className={styles.subCol}>
            {rest.slice(0, 3).map((item) => (
              <NewsCard
                key={item.id}
                article={item}
                variant="horizontal"
                showSummary={false}
                imageRatio="1x1"
                imageSizes="100px"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
