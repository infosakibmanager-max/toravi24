import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { getCategory } from '../data/categories';
import { content } from '../services/content';
import { paths } from '../lib/paths';
import { Seo } from '../components/Seo';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { Kicker, StoryMeta } from '../components/StoryMeta';
import { NewsCard } from '../components/NewsCard';
import { LoadingState, EmptyState, ErrorState } from '../components/States';
import styles from './CategoryPage.module.css';

const PAGE_SIZE = 9;

export function CategoryPage() {
  const { category: catParam } = useParams<{ category: string }>();
  const categoryInfo = getCategory(catParam);

  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryInfo) return;
    let active = true;
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    content
      .listArticles({ category: categoryInfo.slug, offset: 0, limit: PAGE_SIZE })
      .then((paged) => {
        if (!active) return;
        setArticles(paged.items);
        setTotal(paged.total);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [categoryInfo]);

  const handleLoadMore = async () => {
    if (!categoryInfo || loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = await content.listArticles({
        category: categoryInfo.slug,
        offset: articles.length,
        limit: PAGE_SIZE,
      });
      setArticles((prev) => [...prev, ...nextPage.items]);
    } catch (err) {
      console.error('Load more failed', err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (!categoryInfo) {
    return (
      <main className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        <EmptyState
          title="Section Not Found"
          action={
            <Link to={paths.home()} className="btn btn-primary">
              Return to Homepage
            </Link>
          }
        >
          The requested news category does not exist.
        </EmptyState>
      </main>
    );
  }

  const [featured, ...remaining] = articles;
  const hasMore = articles.length < total;

  return (
    <main className={styles.page}>
      <Seo
        title={`${categoryInfo.name} News & Analysis`}
        description={categoryInfo.description}
        path={paths.category(categoryInfo.slug)}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link to={paths.home()}>Home</Link>
          <span className={styles.crumbSep}>/</span>
          <span className={styles.currentCrumb} aria-current="page">
            {categoryInfo.name}
          </span>
        </nav>

        {/* Category Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>{categoryInfo.name}</h1>
          <p className={styles.description}>{categoryInfo.description}</p>
        </header>

        {loading ? (
          <LoadingState rows={6} />
        ) : error ? (
          <ErrorState
            title="Unable to load category stories"
            message={error}
            onRetry={() => {
              setLoading(true);
              content
                .listArticles({ category: categoryInfo.slug, offset: 0, limit: PAGE_SIZE })
                .then((paged) => {
                  setArticles(paged.items);
                  setTotal(paged.total);
                  setError(null);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
            }}
          />
        ) : articles.length === 0 ? (
          <EmptyState title="No stories found">
            There are currently no published stories in this section.
          </EmptyState>
        ) : (
          <>
            {/* Category Lead / Featured Story */}
            {featured && (
              <section className={styles.featuredBlock} aria-label={`Featured in ${categoryInfo.name}`}>
                <article className={styles.featuredInner}>
                  {featured.image && (
                    <div className={styles.featuredImage}>
                      <Link to={paths.article(featured)} tabIndex={-1} aria-hidden="true">
                        <ResponsiveImage
                          image={featured.image}
                          ratio="16x9"
                          sizes="(max-width: 900px) 100vw, 700px"
                          priority
                        />
                      </Link>
                    </div>
                  )}

                  <div className={styles.featuredContent}>
                    <div>
                      <Kicker article={featured} />
                    </div>
                    <h2 className={styles.featuredHeadline}>
                      <Link to={paths.article(featured)}>
                        {featured.headline}
                      </Link>
                    </h2>
                    <p className={styles.featuredSummary}>{featured.summary}</p>
                    <StoryMeta article={featured} showAuthor />
                  </div>
                </article>
              </section>
            )}

            {/* Remaining Category Stories */}
            {remaining.length > 0 && (
              <section aria-label={`More ${categoryInfo.name} Stories`}>
                <div className={styles.grid}>
                  {remaining.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* Load More Pagination */}
            {hasMore && (
              <div className={styles.loadMoreWrap}>
                <button
                  type="button"
                  className="btn"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading more stories…' : 'Load More Stories'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
