import { useEffect, useState } from 'react';
import { Icon } from './Icon';

type Theme = 'light' | 'dark';
const KEY = 'toravi24-theme';

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Light/dark toggle. Initial theme is set by an inline script in index.html to avoid a flash. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => setTheme(currentTheme()), []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  return (
    <button type="button" className={className} onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  );
}
