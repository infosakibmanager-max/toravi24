import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { MainNavigation } from './MainNavigation';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';
import { paths } from '../lib/paths';
import { SITE } from '../config/site';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.headerWrapper} role="banner">
      <div className="container">
        <div className={styles.topBar}>
          <div className={styles.brandGroup}>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name="menu" size={22} />
            </button>

            <Link to={paths.home()} aria-label={`${SITE.name} homepage`}>
              <Wordmark size="md" tone="light" />
            </Link>

            <span className={styles.liveIndicator} title="AI-researched, human-verified global news">
              <span className={styles.liveDot} />
              Global Dispatch
            </span>
          </div>

          <div className={styles.actions}>
            <Link to={paths.search()} className={styles.searchLink} aria-label="Search articles" title="Search articles">
              <Icon name="search" size={20} />
            </Link>
            <ThemeToggle className={styles.themeBtn} />
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <div className="container">
          <MainNavigation />
        </div>
      </div>

      <MobileNavigation open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
