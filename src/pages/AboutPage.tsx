import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function AboutPage() {
  return (
    <main className={styles.page}>
      <Seo
        title="About TORAVI24"
        description="TORAVI24 is a global digital news channel combining AI-powered primary research with rigorous human editorial verification."
        path="/about"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Mission & Philosophy</span>
          <h1 className={styles.title}>About TORAVI24</h1>
          <p className={styles.subtitle}>
            A modern global digital news channel built on primary-source intelligence and human editorial accountability.
          </p>
        </header>

        <div className={styles.content}>
          <p>
            TORAVI24 was founded on a simple editorial conviction: in an era of information overload, the world does not need more recycled opinions or automated aggregation. It needs fast, intelligent, trustworthy, and independent-minded journalism that explains what happened, why it matters, and what comes next.
          </p>

          <h2>Our Operating Principle</h2>
          <div className={styles.placeholderNotice}>
            <strong>Core Principle:</strong> &ldquo;Primary-source intelligence &rarr; editorial understanding &rarr; useful journalism.&rdquo;
          </div>
          <p>
            We start at the source. Whether reporting on geopolitical agreements, legislative votes, climate science, technical standards, or financial markets, our research begins with official treaties, regulatory filings, peer-reviewed scientific papers, court records, and public data registries.
          </p>

          <h2>AI-Researched, Human-Verified</h2>
          <p>
            TORAVI24 uses advanced artificial intelligence as an analytical research instrument — processing multilingual documents, identifying statutory modifications, detecting discrepancies in published datasets, and monitoring official registries around the clock.
          </p>
          <p>
            However, <strong>technology never publishes autonomously at TORAVI24</strong>. Every dispatch, explainer, and investigative brief is verified, contextualised, and approved by experienced human editors before release. We hold automated tools to the same standards of corroboration and scrutiny as human stringers.
          </p>

          <h2>Editorial Independence & Transparency</h2>
          <p>
            We are committed to clear sourcing. Whenever possible, our articles link directly to the underlying primary source document, allowing readers to inspect the original text for themselves.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Corporate & Leadership Information:</strong> Detailed corporate entity details, masthead bios, and editorial board appointments will be published here upon completion of the production publishing phase.
          </div>
        </div>
      </div>
    </main>
  );
}
