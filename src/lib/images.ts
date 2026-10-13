/**
 * Responsive image helper.
 *
 * Generates `src`/`srcSet` for known image hosts that support URL-based
 * resizing (currently Lorem Picsum, used by demo data). Any other URL is used
 * as-is. Add a branch here when the production image CDN is chosen
 * (e.g. Cloudinary, imgix, or a resizing proxy).
 */
const WIDTHS = [400, 640, 960, 1280, 1600];

export interface ResponsiveSource {
  src: string;
  srcSet?: string;
}

const PICSUM = /^https:\/\/picsum\.photos\/id\/(\d+)\/\d+\/\d+/;

export function responsiveSource(url: string, ratio: number): ResponsiveSource {
  const picsum = url.match(PICSUM);
  if (picsum) {
    const id = picsum[1];
    const at = (w: number) => `https://picsum.photos/id/${id}/${w}/${Math.round(w / ratio)}`;
    return { src: at(960), srcSet: WIDTHS.map((w) => `${at(w)} ${w}w`).join(', ') };
  }
  return { src: url };
}
