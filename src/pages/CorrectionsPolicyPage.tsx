import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function CorrectionsPolicyPage() {
  return (
    <main className={styles.page}>
      <Seo
        title="Corrections Policy"
        description="Our policy and protocol for promptly, transparently, and clearly correcting errors of fact."
        path="/corrections-policy"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Accountability</span>
          <h1 className={styles.title}>Corrections Policy</h1>
          <p className={styles.subtitle}>
            When TORAVI24 gets something wrong, we correct it promptly and visibly.
          </p>
        </header>

        <div className={styles.content}>
          <p>
            Accuracy is our foremost obligation. When factual errors occur, we correct them transparently without quietly editing or erasing past records.
          </p>

          <h2>Correction Protocols</h2>
          <ul>
            <li>
              <strong>Substantive Corrections:</strong> When a factual error affects the substance of an article (such as names, dates, figures, quotes, or policy provisions), the story is corrected and a dated note is appended at the top or bottom explaining what was changed and why.
            </li>
            <li>
              <strong>Clarifications:</strong> When the published language is factually accurate but potentially ambiguous, we amend the text for clarity and indicate that an editorial clarification has been added.
            </li>
            <li>
              <strong>Retractions:</strong> If a report is fundamentally flawed or its core thesis cannot be verified, the piece is formally retracted with a clear public statement detailing the findings of our editorial review.
            </li>
          </ul>

          <h2>Submitting a Correction Request</h2>
          <p>
            We welcome corrections from readers, researchers, and subjects of our reporting. Requests should cite the article URL, identify the specific factual assertion in dispute, and provide verifiable primary documentation supporting the correction.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Corrections Desk Contact:</strong> Submit formal correction requests via our <Link to="/contact">Contact Page</Link>. An official corrections email address will be designated upon launch.
          </div>
        </div>
      </div>
    </main>
  );
}
