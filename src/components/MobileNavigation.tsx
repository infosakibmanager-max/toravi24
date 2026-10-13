import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { paths } from '../lib/paths';
import { SITE } from '../config/site';
import { Icon } from './Icon';
import { Wordmark } from './Wordmark';
import { ThemeToggle } from './ThemeToggle';
import styles from './MobileNavigation.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Off-canvas navigation drawer for touch / small screens. Traps focus while open. */
export function MobileNavigation({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(paths.search(q || undefined));
    onClose();
  };

  return (
    <div className={`${styles.root} ${open ? styles.open : ''}`} aria-hidden={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-navigation"
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.top}>
          <Link to={paths.home()} onClick={onClose} aria-label={`${SITE.name} home`}>
            <Wordmark size="sm" />
          </Link>
          <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close menu" data-autofocus>
            <Icon name="close" />
          </button>
        </div>

        <form role="search" className={styles.search} onSubmit={submit}>
          <label htmlFor="mobile-search" className="visually-hidden">
            Search TORAVI24
          </label>
          <input
            id="mobile-search"
            type="search"
            placeholder="Search news"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            enterKeyHint="search"
          />
          <button type="submit" aria-label="Submit search">
            <Icon name="search" size={18} />
          </button>
        </form>

        <nav aria-label="Sections (mobile)">
          <ul role="list" className={styles.list}>
            <li>
              <NavLink to={paths.home()} end onClick={onClose} className={({ isActive }) => (isActive ? styles.active : '')}>
                Home
              </NavLink>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <NavLink
                  to={paths.category(c.slug)}
                  onClick={onClose}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  {c.name}
                  <Icon name="chevron-right" size={16} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul role="list" className={styles.secondary}>
          <li><Link to="/about" onClick={onClose}>About</Link></li>
          <li><Link to="/editorial-standards" onClick={onClose}>Editorial Standards</Link></li>
          <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
        </ul>

        <div className={styles.footerRow}>
          <span>Theme</span>
          <ThemeToggle className={styles.iconBtn} />
        </div>
      </div>
    </div>
  );
}
