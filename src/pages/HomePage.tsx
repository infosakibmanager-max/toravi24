import { useEffect, useState } from 'react';
import type { ArticleSummary } from '../types/content';
import { content } from '../services/content';
import { paths } from '../lib/paths';
import { Seo } from '../components/Seo';
import { BreakingNewsBar } from '../components/BreakingNewsBar';
import { FeaturedStoriesGrid } from '../components/FeaturedStoriesGrid';
import { LatestNewsSection } from '../components/LatestNewsSection';
import { CategorySection } from '../components/CategorySection';
import { MostReadSection } from '../components/MostReadSection';
import { NewsletterSubscribe } from '../components/NewsletterSubscribe';
import { LoadingState, ErrorState } from '../components/States';

export function HomePage() {
  const [breaking, setBreaking] = useState<ArticleSummary[]>([]);
  const [featured, setFeatured] = useState<ArticleSummary[]>([]);
  const [latest, setLatest] = useState<ArticleSummary[]>([]);
  const [worldArticles, setWorldArticles] = useState<ArticleSummary[]>([]);
  const [techArticles, setTechArticles] = useState<ArticleSummary[]>([]);
  const [geoArticles, setGeoArticles] = useState<ArticleSummary[]>([]);
  const [climateArticles, setClimateArticles] = useState<ArticleSummary[]>([]);
  const [mostRead, setMostRead] = useState<ArticleSummary[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [brk, feat, mr] = await Promise.all([
          content.getBreaking(),
          content.getFeatured(3),
          content.getMostRead(5),
        ]);

        if (!active) return;
        setBreaking(brk);
        setFeatured(feat);
        setMostRead(mr);

        const excludeIds = feat.map((f) => f.id);

        const [lat, wrd, tch, geo, clm] = await Promise.all([
          content.listArticles({ offset: 0, limit: 6, excludeIds }),
          content.listArticles({ category: 'world', offset: 0, limit: 4 }),
          content.listArticles({ category: 'technology', offset: 0, limit: 4 }),
          content.listArticles({ category: 'geopolitics', offset: 0, limit: 4 }),
          content.listArticles({ category: 'climate', offset: 0, limit: 4 }),
        ]);

        if (!active) return;
        setLatest(lat.items);
        setWorldArticles(wrd.items);
        setTechArticles(tch.items);
        setGeoArticles(geo.items);
        setClimateArticles(clm.items);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load stories');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const leadStory = featured[0];
  const secondaryStories = featured.slice(1);

  return (
    <main>
      <Seo path={paths.home()} />

      {/* 3. Breaking news strip */}
      <BreakingNewsBar articles={breaking} />

      <div className="container">
        {loading ? (
          <div style={{ paddingBlock: 'var(--space-12)' }}>
            <LoadingState rows={6} />
          </div>
        ) : error ? (
          <div style={{ paddingBlock: 'var(--space-12)' }}>
            <ErrorState
              title="Unable to load newsroom dispatch"
              message={error}
              onRetry={() => window.location.reload()}
            />
          </div>
        ) : (
          <>
            {/* 4. Featured lead story */}
            {leadStory && (
              <FeaturedStoriesGrid
                lead={leadStory}
                secondary={secondaryStories}
              />
            )}

            {/* 5. Latest news section */}
            {latest.length > 0 && (
              <LatestNewsSection articles={latest} title="Latest Reporting" />
            )}

            {/* 6. Category-based news sections */}
            {worldArticles.length > 0 && (
              <CategorySection category="world" articles={worldArticles} />
            )}

            {techArticles.length > 0 && (
              <CategorySection category="technology" articles={techArticles} />
            )}

            {geoArticles.length > 0 && (
              <CategorySection category="geopolitics" articles={geoArticles} />
            )}

            {climateArticles.length > 0 && (
              <CategorySection category="climate" articles={climateArticles} />
            )}

            {/* 7. Most-read or trending stories */}
            {mostRead.length > 0 && (
              <MostReadSection articles={mostRead} />
            )}
          </>
        )}
      </div>

      {/* 8. Compact newsletter subscription section */}
      <NewsletterSubscribe />
    </main>
  );
}
