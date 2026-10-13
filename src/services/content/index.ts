import { SITE } from '../../config/site';
import { createApiProvider } from './apiProvider';
import { demoProvider } from './demoProvider';
import type { ContentProvider } from './types';

/**
 * The single content entry point for the whole UI.
 * Components import `content` from here and never a concrete provider.
 */
function selectProvider(): ContentProvider {
  if (SITE.contentSource === 'api') {
    if (!SITE.apiBaseUrl) {
      console.warn('[content] VITE_CONTENT_SOURCE=api but VITE_API_BASE_URL is empty — falling back to demo data.');
      return demoProvider;
    }
    return createApiProvider(SITE.apiBaseUrl);
  }
  return demoProvider;
}

export const content: ContentProvider = selectProvider();
export type { ContentProvider, ListOptions, SearchOptions } from './types';
