import styles from './Wordmark.module.css';

/**
 * TEMPORARY text wordmark. Replace with the official TORAVI24 logo asset when
 * supplied (drop the SVG in src/assets/ and render it here).
 */
export function Wordmark({ size = 'md', tone = 'light' }: { size?: 'sm' | 'md' | 'lg'; tone?: 'light' | 'dark' }) {
  return (
    <span className={`${styles.wordmark} ${styles[size]} ${styles[tone]}`} aria-label="TORAVI24">
      <span className={styles.word} aria-hidden="true">
        TORAVI
      </span>
      <span className={styles.num} aria-hidden="true">
        24
      </span>
    </span>
  );
}
