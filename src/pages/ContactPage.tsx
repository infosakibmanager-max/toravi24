import { useState, type FormEvent } from 'react';
import { Seo } from '../components/Seo';
import styles from './StaticPage.module.css';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'editorial', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <Seo
        title="Contact & Newsroom Inquiries"
        description="Get in touch with TORAVI24's editorial team, press office, or newsroom tip desk."
        path="/contact"
      />

      <div className={`container ${styles.container}`}>
        <header className={styles.header}>
          <span className={styles.kicker}>Get in Touch</span>
          <h1 className={styles.title}>Contact & Tips Desk</h1>
          <p className={styles.subtitle}>
            Communicate with our editors, submit news tips, or request verification of primary sources.
          </p>
        </header>

        <div className={styles.content}>
          <p>
            TORAVI24 welcomes inquiries, primary documentation leaks, corrections, and academic feedback. All communications are reviewed by our editorial team.
          </p>

          <div className={styles.placeholderNotice}>
            <strong>Editorial & Newsroom Contacts:</strong>
            <ul style={{ marginTop: 'var(--space-2)' }}>
              <li><strong>Newsroom Tip Desk:</strong> [Placeholder — To be assigned, e.g. tips@yourdomain.com]</li>
              <li><strong>Corrections & Standards:</strong> [Placeholder — To be assigned, e.g. corrections@yourdomain.com]</li>
              <li><strong>Press & Media Inquiries:</strong> [Placeholder — To be assigned, e.g. press@yourdomain.com]</li>
              <li><strong>Official Registered Address:</strong> [Placeholder — To be provided by domain owner]</li>
            </ul>
          </div>

          <h2>Send a Secure Message (Demonstration)</h2>
          {submitted ? (
            <div className={styles.placeholderNotice} style={{ borderLeftColor: 'var(--brand-cyan)' }} role="status">
              <strong>Message Received:</strong> Thank you for reaching out. In this frontend demonstration stage, message transmissions are recorded locally for UI testing. Live inbox routing will be enabled in the publishing stage.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  Your Name (Optional)
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-rule-strong)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                  placeholder="Anonymous or your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-rule-strong)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  Topic / Desk
                </label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-rule-strong)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
                >
                  <option value="editorial">Editorial Inquiries & News Tips</option>
                  <option value="correction">Factual Correction Request</option>
                  <option value="source">Primary Source Verification</option>
                  <option value="press">Press & Media Outreach</option>
                  <option value="other">General Inquiries</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                  Message or Confidential Tip *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-rule-strong)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
                  placeholder="Provide context, references to public records, or documents…"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
