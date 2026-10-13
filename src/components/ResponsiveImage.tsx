import type { ArticleImage } from '../types/content';
import { responsiveSource } from '../lib/images';
import { Icon } from './Icon';

type Ratio = '16x9' | '3x2' | '1x1';
const RATIO_VALUE: Record<Ratio, number> = { '16x9': 16 / 9, '3x2': 3 / 2, '1x1': 1 };

interface Props {
  image: ArticleImage | null;
  ratio?: Ratio;
  /** `sizes` attribute describing rendered width at breakpoints. */
  sizes: string;
  /** Set for above-the-fold images (lead story, article hero). */
  priority?: boolean;
  className?: string;
}

/** Fixed-ratio, lazy-loaded responsive image with a neutral placeholder fallback. */
export function ResponsiveImage({ image, ratio = '16x9', sizes, priority = false, className = '' }: Props) {
  const frame = `media ratio-${ratio} ${className}`;

  if (!image) {
    return (
      <div className={`${frame} media-placeholder`} role="img" aria-label="No image available">
        <Icon name="image" size={28} />
      </div>
    );
  }

  const { src, srcSet } = responsiveSource(image.url, RATIO_VALUE[ratio]);
  return (
    <div className={frame}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // @ts-expect-error — fetchpriority is valid HTML but not yet in React 18 types
        fetchpriority={priority ? 'high' : undefined}
      />
    </div>
  );
}
