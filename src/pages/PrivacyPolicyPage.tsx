import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <Seo
        title="Privacy Policy"
        description="How TORAVI24 handles visitor privacy, analytical metrics, and newsletter subscriptions."
        path="/privacy-policy"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Legal Notice</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Clear, honest terms regarding data privacy and user metrics.
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.placeholderNotice}>
            <strong>Note on Development Phase:</strong> This privacy policy reflects the static frontend demonstration build. Legal entity identification and data controller registrations will be updated prior to commercial deployment.
          </div>

          <h2>1. Information We Collect</h2>
          <p>
            At this frontend design stage, TORAVI24 does not operate user accounts, track user identities, or process financial transactions.
          </p>
          <ul>
            <li><strong>Local Browser Preferences:</strong> We store your preferred display mode (light or dark theme) locally on your device via <code>localStorage</code>. No preference data is transmitted to our servers.</li>
            <li><strong>Newsletter Registration (Demonstration):</strong> In this UI evaluation phase, email input into the newsletter component is handled client-side and is not retained or transferred to third-party marketing services.</li>
          </ul>

          <h2>2. Cookies & Local Storage</h2>
          <p>
            This website does not deploy third-party advertising cookies, behavioural cross-site tracking pixels, or fingerprinting scripts.
          </p>

          <h2>3. Hosting & Infrastructure</h2>
          <p>
            Static assets for this frontend are served via hosting providers (such as GitHub Pages). Hosting infrastructure logs basic request information (such as IP address and user-agent string) for security, rate-limiting, and network monitoring as part of normal web server operation.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Data Protection Officer & Legal Entity:</strong> [Placeholder — To be designated upon corporate incorporation and production deployment].
          </div>
        </div>
      </div>
    </main>
  );
}
