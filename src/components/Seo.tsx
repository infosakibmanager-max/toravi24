import { useEffect } from 'react';
import { SITE, absoluteUrl } from '../config/site';

export interface SeoProps {
  /** Page title without the site suffix. Omit on the homepage. */
  title?: string;
  description?: string;
  /** Path for canonical URL, e.g. "/world". */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  /** JSON-LD objects. Only pass data derived from genuine article fields. */
  jsonLd?: object[];
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, value: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!value) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Dependency-free head manager. Updates title, description, canonical, Open
 * Graph / Twitter tags and JSON-LD on client-side navigation. The build step
 * (build/prerender.ts) writes the same tags into static HTML for crawlers.
 */
export function Seo({
  title,
  description = SITE.description,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  jsonLd,
  noindex,
}: SeoProps) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — Global news, explained`;
    const url = absoluteUrl(path);
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex || !SITE.allowIndexing ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url);

    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', title ?? SITE.name);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url || undefined);
    setMeta('property', 'og:image', image);
    setMeta('property', 'article:published_time', type === 'article' ? publishedTime : undefined);
    setMeta('property', 'article:modified_time', type === 'article' ? modifiedTime : undefined);
    setMeta('property', 'article:section', type === 'article' ? section : undefined);
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', title ?? SITE.name);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    if (jsonLdString) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seoJsonld = 'true';
      s.textContent = jsonLdString;
      document.head.appendChild(s);
    }
  }, [title, description, path, image, type, publishedTime, modifiedTime, section, jsonLdString, noindex]);

  return null;
}
