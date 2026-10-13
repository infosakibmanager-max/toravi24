import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { paths } from '../lib/paths';
import { SITE } from '../config/site';
import { Wordmark } from './Wordmark';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <Link to={paths.home()} aria-label={`${SITE.name} homepage`}>
              <Wordmark size="md" tone="light" />
            </Link>
            <p className={styles.brandDesc}>{SITE.description}</p>
            <p className={styles.principle}>
              &ldquo;{SITE.principle}&rdquo;
            </p>
          </div>

          <div className={styles.categoriesCol}>
            <h3 className={styles.colHeading}>News Sections</h3>
            <ul className={styles.categoryList}>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link to={paths.category(c.slug)}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.corporateCol}>
            <h3 className={styles.colHeading}>About TORAVI24</h3>
            <ul className={styles.corporateList}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/editorial-standards">Editorial Standards</Link></li>
              <li><Link to="/corrections-policy">Corrections Policy</Link></li>
              <li><Link to="/contact">Contact & Tips</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {currentYear} {SITE.name}. All rights reserved.</p>

          <ul className={styles.legalLinks}>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-use">Terms of Use</Link></li>
            <li><Link to="/editorial-standards">Verification Principles</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
