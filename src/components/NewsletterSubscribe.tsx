import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsletterSubscribe.module.css';

export function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // UI demonstration only — no real newsletter backend is configured yet
    setSubmitted(true);
  };

  return (
    <section className={styles.section} aria-label="Newsletter Subscription">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.info}>
            <span className={styles.badge}>Intelligence Briefing</span>
            <h2 className={styles.title}>The TORAVI24 Morning Brief</h2>
            <p className={styles.desc}>
              Primary-source intelligence, verified analysis, and essential global developments delivered to your inbox every weekday morning.
            </p>
          </div>

          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.successMessage} role="status">
                ✓ Thank you. (Demonstration mode: newsletter service will be activated in the publishing stage.)
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="newsletter-email" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className={styles.input}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            )}
            <p className={styles.privacy}>
              No spam. Unsubscribe at any time. Read our <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
