import type { Category, CategorySlug } from '../types/content';

/** Single source of truth for sections. Category pages are generated from this list. */
export const CATEGORIES: Category[] = [
  {
    slug: 'world',
    name: 'World',
    description:
      'Major developments across regions, explained with context — what happened, why it matters and what comes next.',
  },
  {
    slug: 'politics',
    name: 'Politics',
    description:
      'Elections, legislation and governance, reported from primary documents and official records.',
  },
  {
    slug: 'geopolitics',
    name: 'Geopolitics',
    description:
      'Power, diplomacy and strategy between states — alliances, negotiations and the forces shaping them.',
  },
  {
    slug: 'technology',
    name: 'Technology',
    description:
      'Artificial intelligence, computing, platforms and digital policy, and their effects on people and institutions.',
  },
  {
    slug: 'science',
    name: 'Science',
    description:
      'Research, discovery and evidence — new findings read carefully against the underlying papers and data.',
  },
  {
    slug: 'climate',
    name: 'Climate',
    description:
      'Climate science, energy transition and environmental policy, tracked through data and official reporting.',
  },
  {
    slug: 'business',
    name: 'Business',
    description:
      'Markets, trade, industry and the global economy — the numbers and decisions behind the headlines.',
  },
  {
    slug: 'security',
    name: 'Security',
    description:
      'Defence, cybersecurity and conflict analysis, with a focus on verified information and clear sourcing.',
  },
];

const bySlug = new Map(CATEGORIES.map((c) => [c.slug, c]));

export function getCategory(slug: string | undefined): Category | undefined {
  return slug ? bySlug.get(slug as CategorySlug) : undefined;
}

export function categoryName(slug: CategorySlug): string {
  return bySlug.get(slug)?.name ?? slug;
}
