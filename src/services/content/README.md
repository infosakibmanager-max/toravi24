# TORAVI24 Content Integration Contract

This directory isolates the newsroom frontend from any concrete backend or content management system.

## Current Mode: Local Demonstration Data

The application defaults to `demoProvider.ts`, which serves 32 fictional, primary-source-style stories across all 8 core news categories (`world`, `politics`, `geopolitics`, `technology`, `science`, `climate`, `business`, `security`).

## Connecting the Future API Publishing System

When the publishing backend (e.g., automated ingestion pipeline, n8n workflow, or headless CMS) is operational, connect it to this frontend by following these steps:

### 1. Environment Configuration

In `.env` or deployment secrets, set:

```env
VITE_CONTENT_SOURCE=api
VITE_API_BASE_URL=https://api.toravi24.com/v1
VITE_SITE_URL=https://toravi24.com
VITE_ALLOW_INDEXING=true
```

### 2. Implement Endpoints

The API should expose the following read-only `GET` endpoints:

- `GET /articles?category=:category&offset=:offset&limit=:limit&exclude=:excludeIds`
  - Returns paginated published articles (`Paged<ArticleSummary>`).
- `GET /articles/featured?limit=:limit`
  - Returns current lead and secondary featured stories.
- `GET /articles/breaking`
  - Returns active breaking items (empty list if no active breaking event).
- `GET /articles/most-read?limit=:limit`
  - Returns trending or most-read articles based on analytics.
- `GET /articles/:slug`
  - Returns the full `Article` payload including structured body blocks.
- `GET /articles/:slug/related?limit=:limit`
  - Returns related stories based on category and tags.
- `GET /search?q=:query&offset=:offset&limit=:limit`
  - Returns full-text search results across headlines, summaries, and tags.

### 3. Data Model Requirements

Each article returned by the API must conform to `src/types/content.ts`:

- `id`: Unique string identifier.
- `slug`: URL-friendly slug (e.g. `coastal-flood-warning-system`).
- `headline`: Article title.
- `summary`: Standfirst or executive summary.
- `body`: Structured array of blocks (`paragraph`, `heading`, `list`, `note`).
- `category`: One of `world`, `politics`, `geopolitics`, `technology`, `science`, `climate`, `business`, `security`.
- `image`: `{ url, alt, caption, credit, creditUrl, width, height }` (or `null`).
- `sources`: Array of `{ name, url }` identifying primary documentation.
- `authors`: Array of `{ name, role }`.
- `publishedAt`: ISO-8601 timestamp.
- `updatedAt`: Optional ISO-8601 timestamp.
- `isFeatured`: Boolean.
- `isBreaking`: Boolean.
- `status`: Must be `'published'` to be visible.

No changes to UI components will be required when switching from demo to API mode.
