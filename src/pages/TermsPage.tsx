import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function TermsPage() {
  return (
    <main className={styles.page}>
      <Seo
        title="Terms of Use"
        description="Terms and conditions governing access and use of the TORAVI24 digital news platform."
        path="/terms-of-use"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Legal Agreement</span>
          <h1 className={styles.title}>Terms of Use</h1>
          <p className={styles.subtitle}>
            Standard terms of use governing access to TORAVI24 content and services.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.placeholderNotice}>
            <strong>Phase Disclosure:</strong> The website is currently operating in frontend design and technical demonstration mode. Formal governing law and statutory dispute forums will be incorporated upon formal launch.
          </div>

          <h2>1. Intellectual Property & Copyright</h2>
          <p>
            All text, editorial analysis, design layouts, graphics, typography selections, and brand logos on TORAVI24 are protected by copyright and intellectual property laws. Content may not be republished or redistributed without express authorization.
          </p>

          <h2>2. Permitted Editorial Quotation & Fair Use</h2>
          <p>
            Short excerpts and citations from TORAVI24 articles may be quoted in academic work, journalistic commentary, or non-commercial research, provided clear attribution and a direct hyperlink to the original article URL are included.
          </p>

          <h2>3. Demonstration Content Notice</h2>
          <p>
            Articles marked with a <strong>DEMO</strong> badge represent fictional sample content created solely for UI/UX testing, visual typography inspection, and editorial layout verification. They do not constitute factual reporting or statements of actual occurrences.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Governing Jurisdiction:</strong> [Placeholder — To be defined in production publishing phase].
          </div>
        </div>
      </div>
    </main>
  );
}
