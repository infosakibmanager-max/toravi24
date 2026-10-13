import { useState } from 'react';
import { Icon } from './Icon';
import styles from './ShareBar.module.css';

interface Props {
  title: string;
  url?: string;
}

export function ShareBar({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore clipboard failures
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch {
        // user aborted share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={styles.shareBar} role="group" aria-label="Share article">
      <span className={styles.shareLabel}>Share</span>

      <button
        type="button"
        className={styles.shareBtn}
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy article link"
      >
        <Icon name="link" size={16} />
      </button>

      <button
        type="button"
        className={styles.shareBtn}
        onClick={handleNativeShare}
        aria-label="Share via device options"
        title="Share"
      >
        <Icon name="share" size={16} />
      </button>

      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`}
        className={styles.shareBtn}
        aria-label="Share via email"
        title="Email article link"
      >
        <Icon name="mail" size={16} />
      </a>

      {copied && (
        <span className={styles.copiedToast} role="status">
          Link copied to clipboard
        </span>
      )}
    </div>
  );
}
