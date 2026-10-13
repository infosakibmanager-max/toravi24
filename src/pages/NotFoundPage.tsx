import { Link } from 'react-router-dom';
import { paths } from '../lib/paths';
import { Seo } from '../components/Seo';
import { EmptyState } from '../components/States';

export function NotFoundPage() {
  return (
    <main className="container" style={{ paddingBlock: 'var(--space-16)' }}>
      <Seo title="Page Not Found" path="/404" noindex />

      <EmptyState
        title="404 — Page Not Found"
        action={
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={paths.home()} className="btn btn-primary">
              Return to Homepage
            </Link>
            <Link to={paths.search()} className="btn">
              Search Archives
            </Link>
          </div>
        }
      >
        <p>The page or dispatch you requested could not be located.</p>
        <p style={{ marginTop: 'var(--space-2)' }}>
          It may have been moved, updated, or the link may be mistyped.
        </p>
      </EmptyState>
    </main>
  );
}
