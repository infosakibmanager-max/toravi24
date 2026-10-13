import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ArticleSummary } from '../types/content';
import { content } from '../services/content';
import { paths } from '../lib/paths';
import { Seo } from '../components/Seo';
import { Icon } from '../components/Icon';
import { NewsCard } from '../components/NewsCard';
import { LoadingState, EmptyState } from '../components/States';
import styles from './SearchPage.module.css';

const SUGGESTIONS = ['Climate', 'Technology', 'Veldora', 'Energy', 'Cybersecurity', 'Trade', 'Parliament'];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(qParam);
  const [results, setResults] = useState<ArticleSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setQuery(qParam);
    if (!qParam.trim()) {
      setResults([]);
      setTotal(0);
      setSearched(false);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setSearched(true);

    content
      .search(qParam.trim(), { limit: 50 })
      .then((paged) => {
        if (!active) return;
        setResults(paged.items);
        setTotal(paged.total);
      })
      .catch((err) => {
        console.error('Search error', err);
        if (active) setResults([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [qParam]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  return (
    <main className={styles.page}>
      <Seo
        title={qParam ? `Search: "${qParam}"` : 'Search News & Reports'}
        description="Search TORAVI24 articles, reporting, and intelligence dossiers."
        path={paths.search(qParam || undefined)}
      />

      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Search TORAVI24</h1>

          <form role="search" className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="visually-hidden">
              Search articles
            </label>
            <input
              id="search-input"
              type="search"
              className={styles.input}
              placeholder="Search by topic, institution, country or keyword…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />

            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClear}
                aria-label="Clear search query"
              >
                <Icon name="close" size={16} />
              </button>
            )}

            <button type="submit" className={styles.submitBtn} aria-label="Submit search">
              <Icon name="search" size={20} />
            </button>
          </form>

          <div className={styles.suggestedWrap}>
            <span>Suggested topics:</span>
            {SUGGESTIONS.map((term) => (
              <button
                key={term}
                type="button"
                className={styles.suggestionTag}
                onClick={() => handleSuggestionClick(term)}
              >
                {term}
              </button>
            ))}
          </div>

          {searched && !loading && (
            <div className={styles.statusRow} role="status" aria-live="polite">
              {total === 0
                ? `No articles found for "${qParam}"`
                : `Showing ${total} ${total === 1 ? 'article' : 'articles'} matching "${qParam}"`}
            </div>
          )}
        </header>

        {loading ? (
          <LoadingState rows={4} variant="list" />
        ) : !searched ? (
          <EmptyState title="Find verified global reporting">
            Search our collection of primary-source articles, policy explainers, and intelligence dossiers.
          </EmptyState>
        ) : results.length === 0 ? (
          <EmptyState title="No results found">
            <p>
              We couldn’t find any stories matching <strong>&ldquo;{qParam}&rdquo;</strong>.
            </p>
            <p style={{ marginTop: 'var(--space-2)' }}>
              Try checking your spelling, using more general search terms, or browsing by category.
            </p>
          </EmptyState>
        ) : (
          <div className={styles.resultsList} role="region" aria-label="Search results">
            {results.map((article) => (
              <div key={article.id} className={styles.resultItem}>
                <NewsCard
                  article={article}
                  variant="horizontal"
                  imageSizes="140px"
                  imageRatio="3x2"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
