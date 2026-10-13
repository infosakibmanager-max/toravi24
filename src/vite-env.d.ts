/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTENT_SOURCE?: 'demo' | 'api';
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ALLOW_INDEXING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
