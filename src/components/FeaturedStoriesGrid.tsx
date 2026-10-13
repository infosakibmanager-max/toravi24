import { Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { paths } from '../lib/paths';
import { ResponsiveImage } from './ResponsiveImage';
import { Kicker, StoryMeta } from './StoryMeta';
import styles from './FeaturedStoriesGrid.module.css';

interface Props {
  lead: ArticleSummary;
  secondary: ArticleSummary[];
}

export function FeaturedStoriesGrid({ lead, secondary }: Props) {
  return (
    <section className={styles.grid} aria-label="Featured Stories">
      {/* Lead Story */}
      <div className={styles.leadColumn}>
        <article className={styles.leadArticle}>
          {lead.image && (
            <div className={styles.leadImageWrap}>
              <Link to={paths.article(lead)} tabIndex={-1} aria-hidden="true">
                <ResponsiveImage
                  image={lead.image}
                  ratio="16x9"
                  sizes="(max-width: 960px) 100vw, 820px"
                  priority
                />
              </Link>
            </div>
          )}

          <div>
            <Kicker article={lead} />
          </div>

          <h2 className={styles.leadHeadline}>
            <Link to={paths.article(lead)}>
              {lead.headline}
            </Link>
          </h2>

          <p className={styles.leadSummary}>{lead.summary}</p>

          <div className={styles.leadMeta}>
            <StoryMeta article={lead} showAuthor />
          </div>
        </article>
      </div>

      {/* Secondary Stories */}
      {secondary.length > 0 && (
        <aside className={styles.sideColumn} aria-label="Key Developments">
          <h3 className={styles.sideHeading}>Key Developments</h3>
          <div className={styles.secondaryList}>
            {secondary.map((story) => (
              <article key={story.id} className={styles.secondaryItem}>
                {story.image && (
                  <div className={styles.secondaryImage}>
                    <Link to={paths.article(story)} tabIndex={-1} aria-hidden="true">
                      <ResponsiveImage
                        image={story.image}
                        ratio="3x2"
                        sizes="(max-width: 960px) 100vw, 360px"
                      />
                    </Link>
                  </div>
                )}

                <div>
                  <Kicker article={story} />
                </div>

                <h4 className={styles.secondaryHeadline}>
                  <Link to={paths.article(story)}>
                    {story.headline}
                  </Link>
                </h4>

                <p className={styles.secondarySummary}>{story.summary}</p>

                <StoryMeta article={story} showAuthor />
              </article>
            ))}
          </div>
        </aside>
      )}
    </section>
  );
}
