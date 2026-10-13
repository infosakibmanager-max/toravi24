import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function EditorialStandardsPage() {
  return (
    <main className={styles.page}>
      <Seo
        title="Editorial Standards & Verification Principles"
        description="Our standards for primary-source verification, AI research governance, attribution, and editorial independence."
        path="/editorial-standards"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Journalistic Integrity</span>
          <h1 className={styles.title}>Editorial Standards & Verification</h1>
          <p className={styles.subtitle}>
            How TORAVI24 validates intelligence, attributes sources, and safeguards factual integrity.
          </p>
        </header>

        <div className={styles.content}>
          <p>
            TORAVI24 adheres to strict editorial guidelines designed to deliver accurate, non-partisan, and actionable journalism. Our credibility depends upon strict verification and intellectual honesty.
          </p>

          <h2>1. Primary Source Priority</h2>
          <p>
            We do not rely on unverified secondhand reporting or uncorroborated social media claims. Every key factual assertion must be anchored in:
          </p>
          <ul>
            <li>Official primary documents (statutes, treaties, court filings, government notices).</li>
            <li>Direct statements from identified spokespersons and certified public records.</li>
            <li>Scientific data, peer-reviewed publications, or audited financial accounts.</li>
          </ul>

          <h2>2. AI Research Governance</h2>
          <p>
            Artificial intelligence is employed to accelerate information discovery, cross-reference data across international jurisdictions, and surface patterns in large regulatory corpora. We enforce strict protocols:
          </p>
          <ul>
            <li><strong>No Unsupervised Publishing:</strong> Generative models do not generate or publish unsupervised content directly to the live feed.</li>
            <li><strong>Source Traceability:</strong> Any claim surfaced by an algorithmic workflow must be matched to a verifiable external document before inclusion in an article.</li>
            <li><strong>Synthetic Media Prohibition:</strong> We never generate fabricated photographs of real-world events or use generative imagery to depict breaking news.</li>
          </ul>

          <h2>3. Corroboration & Multiple Sourcing</h2>
          <p>
            When primary documentation is unavailable, facts require independent confirmation from multiple reliable sources. Where opposing interpretations exist on matters of public policy or law, we report all substantive viewpoints with proportional weight.
          </p>

          <h2>4. Transparency in Attribution</h2>
          <p>
            Readers deserve to know where our information comes from. Articles clearly cite the institution, agency, or individual responsible for the original data. If a document is public, we provide direct references and URLs.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Editorial Board Oversight:</strong> TORAVI24’s complete code of conduct and ethics advisory board charter are maintained under editorial governance documentation.
          </div>
        </div>
      </div>
    </main>
  );
}
