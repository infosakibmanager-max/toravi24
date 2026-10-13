import { Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { paths } from '../lib/paths';
import { ResponsiveImage } from './ResponsiveImage';
import { Kicker, StoryMeta } from './StoryMeta';
import styles from './NewsCard.module.css';

interface Props {
  article: ArticleSummary;
  variant?: 'vertical' | 'horizontal';
  showImage?: boolean;
  showSummary?: boolean;
  showAuthor?: boolean;
  imageSizes?: string;
  imageRatio?: '16x9' | '3x2' | '1x1';
}

export function NewsCard({
  article,
  variant = 'vertical',
  showImage = true,
  showSummary = true,
  showAuthor = true,
  imageSizes = '(max-width: 768px) 100vw, 360px',
  imageRatio = '3x2',
}: Props) {
  const isHorizontal = variant === 'horizontal';

  return (
    <article className={`${styles.card} ${isHorizontal ? styles.horizontal : ''}`}>
      {showImage && article.image && (
        <div className={styles.imageWrap}>
          <Link to={paths.article(article)} tabIndex={-1} aria-hidden="true">
            <ResponsiveImage
              image={article.image}
              ratio={imageRatio}
              sizes={imageSizes}
            />
          </Link>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.kickerRow}>
          <Kicker article={article} />
        </div>

        <h3 className={styles.headline}>
          <Link to={paths.article(article)}>
            {article.headline}
          </Link>
        </h3>

        {showSummary && article.summary && (
          <p className={styles.summary}>{article.summary}</p>
        )}

        <div className={styles.metaRow}>
          <StoryMeta article={article} showAuthor={showAuthor} />
        </div>
      </div>
    </article>
  );
}
