import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article, ArticleSummary } from '../types/content';
import { content } from '../services/content';
import { categoryName } from '../data/categories';
import { formatDateTime } from '../lib/format';
import { paths } from '../lib/paths';
import { SITE, absoluteUrl } from '../config/site';
import { Seo } from '../components/Seo';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { Kicker } from '../components/StoryMeta';
import { ShareBar } from '../components/ShareBar';
import { NewsCard } from '../components/NewsCard';
import { LoadingState, ErrorState } from '../components/States';
import styles from './ArticlePage.module.css';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    content
      .getArticle(slug)
      .then((data) => {
        if (!active) return;
        setArticle(data);
        if (data) {
          content.getRelated(data, 3).then((rel) => {
            if (active) setRelated(rel);
          });
        }
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load article');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        <LoadingState variant="article" />
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        <ErrorState
          title={error ? 'Unable to load article' : 'Article Not Found'}
          message={
            error ||
            'The requested article could not be located or may have been updated. Return to the homepage or search our archives.'
          }
        />
        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
          <Link to={paths.home()} className="btn btn-primary">
            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  const categoryTitle = categoryName(article.category);
  const canonicalPath = paths.article(article);
  const articleUrl = absoluteUrl(canonicalPath);

  // Generate genuine NewsArticle JSON-LD
  const newsArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.summary,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    articleSection: categoryTitle,
    author: article.authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      jobTitle: a.role,
    })),
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE.name,
      url: SITE.url || undefined,
    },
    image: article.image ? [article.image.url] : undefined,
  };

  return (
    <article className={styles.page}>
      <Seo
        title={article.headline}
        description={article.summary}
        path={canonicalPath}
        type="article"
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        section={categoryTitle}
        image={article.image?.url}
        jsonLd={[newsArticleJsonLd]}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link to={paths.home()}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <Link to={paths.category(article.category)}>{categoryTitle}</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.currentCrumb} aria-current="page">
            {article.headline}
          </span>
        </nav>

        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.kickerWrap}>
            <Kicker article={article} />
          </div>

          <h1 className={styles.headline}>{article.headline}</h1>

          <p className={styles.standfirst}>{article.summary}</p>

          <div className={styles.metaBlock}>
            <div className={styles.authorLine}>
              By {article.authors.map((a) => a.name).join(', ')}
              {article.authors[0]?.role && (
                <span className={styles.authorRole}> — {article.authors[0].role}</span>
              )}
            </div>

            <div className={styles.timeLine}>
              <span>Published: </span>
              <time dateTime={article.publishedAt}>{formatDateTime(article.publishedAt)}</time>
              {article.updatedAt && (
                <>
                  <span> · Updated: </span>
                  <time dateTime={article.updatedAt}>{formatDateTime(article.updatedAt)}</time>
                </>
              )}
            </div>

            {article.sources && article.sources.length > 0 && (
              <div className={styles.sourceLine}>
                <strong>Primary Source: </strong>
                {article.sources.map((src, i) => (
                  <span key={i}>
                    {src.url ? (
                      <a href={src.url} target="_blank" rel="noopener noreferrer">
                        {src.name}
                      </a>
                    ) : (
                      src.name
                    )}
                    {i < article.sources.length - 1 ? '; ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          <ShareBar title={article.headline} url={articleUrl} />
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className={styles.heroImageWrap}>
            <div className={styles.heroImage}>
              <ResponsiveImage
                image={article.image}
                ratio="16x9"
                sizes="(max-width: 960px) 100vw, 960px"
                priority
              />
            </div>
            {(article.image.caption || article.image.credit) && (
              <figcaption className={styles.caption}>
                <span>{article.image.caption}</span>
                {article.image.credit && (
                  <span className={styles.credit}>
                    Photo:{' '}
                    {article.image.creditUrl ? (
                      <a href={article.image.creditUrl} target="_blank" rel="noopener noreferrer">
                        {article.image.credit}
                      </a>
                    ) : (
                      article.image.credit
                    )}
                  </span>
                )}
              </figcaption>
            )}
          </div>
        )}

        {/* Main Article Body */}
        <div className={styles.bodyContainer}>
          <div className={styles.articleBody}>
            {article.body.map((block, idx) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={idx}>{block.text}</p>;
                case 'heading':
                  return (
                    <h2 key={idx} className={styles.heading2}>
                      {block.text}
                    </h2>
                  );
                case 'list':
                  return block.ordered ? (
                    <ol key={idx} className={styles.list}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={idx} className={styles.list}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  );
                case 'note':
                  return (
                    <aside key={idx} className={styles.callout}>
                      {block.title && <div className={styles.calloutTitle}>{block.title}</div>}
                      <div>{block.text}</div>
                    </aside>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className={styles.backRow}>
            <Link to={paths.category(article.category)}>
              &larr; More from {categoryTitle}
            </Link>
            <span>·</span>
            <Link to={paths.home()}>TORAVI24 Homepage</Link>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <section className={styles.relatedSection} aria-label="Related Stories">
            <div className="section-heading">
              <h2>Related Reporting</h2>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((rel) => (
                <NewsCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
