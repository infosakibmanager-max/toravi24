import type { ReactNode } from 'react';
import styles from './States.module.css';

/** Skeleton placeholder rows that mirror card layout — avoids layout jump. */
export function LoadingState({ rows = 3, label = 'Loading stories', variant = 'cards' }: { rows?: number; label?: string; variant?: 'cards' | 'article' | 'list' }) {
  return (
    <div className={`${styles.loading} ${styles[variant]}`} role="status" aria-live="polite">
      <span className="visually-hidden">{label}…</span>
      {variant === 'article' ? (
        <div className={styles.articleSkeleton} aria-hidden="true">
          <div className={`${styles.bone} ${styles.short}`} />
          <div className={`${styles.bone} ${styles.title}`} />
          <div className={`${styles.bone} ${styles.title} ${styles.w70}`} />
          <div className={`${styles.bone} ${styles.hero}`} />
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`${styles.bone} ${styles.line}`} />
          ))}
        </div>
      ) : (
        Array.from({ length: rows }, (_, i) => (
          <div key={i} className={styles.card} aria-hidden="true">
            {variant === 'cards' && <div className={`${styles.bone} ${styles.thumb}`} />}
            <div className={`${styles.bone} ${styles.short}`} />
            <div className={`${styles.bone} ${styles.line}`} />
            <div className={`${styles.bone} ${styles.line} ${styles.w70}`} />
          </div>
        ))
      )}
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className={styles.message}>
      <h2 className={styles.messageTitle}>{title}</h2>
      {children && <div className={styles.messageBody}>{children}</div>}
      {action && <div className={styles.messageAction}>{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: { title?: string; message?: string; onRetry?: () => void }) {
  return (
    <div className={`${styles.message} ${styles.error}`} role="alert">
      <h2 className={styles.messageTitle}>{title}</h2>
      <p className={styles.messageBody}>
        {message ?? 'We couldn’t load this content. Please check your connection and try again.'}
      </p>
      {onRetry && (
        <div className={styles.messageAction}>
          <button type="button" className="btn" onClick={onRetry}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
