import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { paths } from '../lib/paths';
import styles from './SiteHeader.module.css';

/** Desktop category navigation (hidden below the desktop breakpoint). */
export function MainNavigation() {
  return (
    <nav className={styles.mainNav} aria-label="Sections">
      <ul role="list" className={styles.navList}>
        <li>
          <NavLink to={paths.home()} end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Home
          </NavLink>
        </li>
        {CATEGORIES.map((c) => (
          <li key={c.slug}>
            <NavLink
              to={paths.category(c.slug)}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {c.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
