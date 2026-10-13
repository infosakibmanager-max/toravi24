# TORAVI24 — Professional Global Digital News Website

TORAVI24 is a production-quality, responsive frontend for an AI-powered global digital news channel. It is designed around the core brand principle:

> **"Primary-source intelligence → editorial understanding → useful journalism."**

The platform delivers an authoritative international news experience featuring clean typography, structured editorial grids, deep near-black/charcoal branding, digital intelligence cyan accents, and restrained breaking-news alerts.

---

## 1. Project Architecture & Technology Stack

The frontend is built as a lightweight, static-deployable web application:

- **Framework:** React 18 + TypeScript (strict mode)
- **Bundler:** Vite 5 (optimized ES2020 bundle, zero bulky UI libraries)
- **Routing:** React Router v6 with SPA redirect fallback for GitHub Pages
- **Typography:** Self-hosted variable fonts (`@fontsource-variable/inter` and `@fontsource-variable/source-serif-4`)
- **Styling:** Design tokens (`src/styles/tokens.css`) + CSS Modules + Semantic CSS primitives
- **Content Layer:** Decoupled Data-Access Layer (`src/services/content/`) supporting instant switching between local demonstration data and future live publishing APIs
- **SEO & Structured Data:** Semantic HTML5, dynamic Open Graph / Twitter Cards, and schema.org `NewsArticle` JSON-LD generation

---

## 2. Directory Structure

```text
toravi24 website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions deployment to GitHub Pages
├── public/
│   ├── 404.html                # Client-side router redirect script for GitHub Pages
│   ├── favicon.svg             # TORAVI24 brand vector icon
│   └── robots.txt              # Safe crawler instructions (indexing paused during demo)
├── scripts/
│   └── postbuild.mjs           # Post-build script (.nojekyll, CNAME, 404 handler)
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── BreakingNewsBar.tsx # Compact breaking news strip with restrained red styling
│   │   ├── CategorySection.tsx # Category showcase blocks on homepage
│   │   ├── FeaturedStoriesGrid.tsx # Dominant lead story + secondary editorial grid
│   │   ├── Icon.tsx            # Lightweight inline SVG icons
│   │   ├── LatestNewsSection.tsx # 3-column responsive news cards
│   │   ├── MainNavigation.tsx  # Desktop category navigation
│   │   ├── MobileNavigation.tsx # Accessible drawer with focus trapping & search
│   │   ├── MostReadSection.tsx # Numbered trending story rankings
│   │   ├── NewsCard.tsx        # Vertical and horizontal reusable news cards
│   │   ├── NewsletterSubscribe.tsx # Briefing subscription UI component
│   │   ├── ResponsiveImage.tsx # Responsive image loader with lazy loading & placeholders
│   │   ├── Seo.tsx             # Document head, canonical URL, OG, and JSON-LD manager
│   │   ├── ShareBar.tsx        # Share tools (Web Share API, clipboard, email)
│   │   ├── SiteFooter.tsx      # Comprehensive newsroom footer with clear placeholders
│   │   ├── SiteHeader.tsx      # Sticky masthead, brand wordmark, theme toggle
│   │   ├── States.tsx          # Shimmer skeletons, empty states, error fallbacks
│   │   ├── StoryMeta.tsx       # Category kickers, demo badges, timestamps
│   │   ├── ThemeToggle.tsx     # Light/dark mode toggle (persisted in localStorage)
│   │   └── Wordmark.tsx        # Clean, temporary TORAVI24 brand wordmark
│   ├── config/
│   │   └── site.ts             # Site-wide settings, brand copy, and environment flags
│   ├── data/
│   │   ├── categories.ts       # Single source of truth for the 8 core news categories
│   │   └── demo/
│   │       └── articles.ts     # 32 fictional, primary-source demonstration articles
│   ├── hooks/
│   │   └── useAsync.ts         # Asynchronous data loading hook with retry state
│   ├── lib/
│   │   ├── format.ts           # Absolute UTC date/time and reading time formatters
│   │   ├── images.ts           # Responsive srcset generator
│   │   └── paths.ts            # Canonical route builders
│   ├── pages/                  # Top-level view templates
│   │   ├── AboutPage.tsx       # Brand mission, operating philosophy, editorial model
│   │   ├── ArticlePage.tsx     # Reading-optimized article layout with primary sources
│   │   ├── CategoryPage.tsx    # Dynamic reusable category template with pagination
│   │   ├── ContactPage.tsx     # Newsroom tip desk and contact form (with placeholders)
│   │   ├── CorrectionsPolicyPage.tsx # Formal corrections and errata policy
│   │   ├── EditorialStandardsPage.tsx # Verification rules and AI governance principles
│   │   ├── HomePage.tsx        # Complete 9-section editorial homepage
│   │   ├── NotFoundPage.tsx    # 404 recovery view
│   │   ├── PrivacyPolicyPage.tsx # Transparent privacy terms with placeholders
│   │   ├── SearchPage.tsx      # Full-text search with suggestions and result states
│   │   └── TermsPage.tsx       # Terms of use and demonstration disclosures
│   ├── services/
│   │   └── content/            # Data-access layer
│   │       ├── apiProvider.ts  # Scaffolded client for future read-only publishing API
│   │       ├── demoProvider.ts # Local demonstration provider with search & relations
│   │       ├── index.ts        # Content provider selector
│   │       ├── README.md       # API contract specification for backend developers
│   │       └── types.ts        # ContentProvider interface and query options
│   ├── styles/
│   │   ├── global.css          # Base styles, typography scale, editorial primitives
│   │   └── tokens.css          # Design tokens (ink, cyan, red, spacing, surfaces)
│   ├── types/
│   │   └── content.ts          # Core article, image, author, and source data models
│   ├── App.tsx                 # Main routing shell and layout structure
│   ├── main.tsx                # Entry point, SPA redirect decoder, font imports
│   └── vite-env.d.ts           # Vite environment types
├── .env.example                # Documented configuration template
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript project reference configuration
└── vite.config.ts              # Vite configuration with dynamic BASE_PATH
```

---

## 3. Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm 9+

### Installation & Run

1. Clone or open the repository directory:
   ```bash
   cd "toravi24 website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The compiled static files are generated in `dist/`.

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 4. Navigable Views & Pages

- **Homepage (`/`):** Full 9-section editorial front page:
  1. Masthead header with live indicator & theme switch
  2. Desktop / mobile category navigation
  3. Breaking news strip (compact, restrained red alert)
  4. Lead featured story + key developments secondary grid
  5. Latest news cards (responsive 3-column grid)
  6. Category-focused sections (World, Technology, Geopolitics, Climate)
  7. Most-read top 5 ranked story list
  8. Intelligence briefing newsletter subscription component
  9. Footer with news sections, corporate links, and legal notice
- **Category Pages (`/:category`):** Reusable template driven by category configuration covering all 8 core desks:
  - `/world`
  - `/politics`
  - `/geopolitics`
  - `/technology`
  - `/science`
  - `/climate`
  - `/business`
  - `/security`
- **Article Detail Page (`/:category/:slug`):** Optimized reading width, breadcrumbs, category kicker, headline, standfirst summary, publication and update timestamps, author attribution, primary-source documentation link, high-resolution hero photo with caption/credits, structured content blocks (headings, paragraphs, lists, callout notes), social share bar (copy link, native share, email), related stories grid, and return navigation.
- **Search (`/search`):** Real-time client-side search across headlines and summaries with topic quick-tags, result counts, clear-query controls, empty state, and no-results guidance.
- **Newsroom & Legal Documentation:**
  - `/about` — Editorial mission and AI-augmented human verification model
  - `/editorial-standards` — Verification protocols and synthetic media prohibition
  - `/corrections-policy` — Error correction procedures and transparent retraction rules
  - `/contact` — Newsroom tip desk, corrections submission, and message form
  - `/privacy-policy` — Clear privacy statement with honest corporate placeholders
  - `/terms-of-use` — Terms of use, fair quotation rights, and demo disclosures

---

## 5. GitHub Pages Deployment Guide

The project is pre-configured for automated static deployment via GitHub Actions.

### Step 1: Create a GitHub Repository & Push
1. Initialize git (if not already done) and push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete TORAVI24 frontend"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub.
2. Click **Settings** &rarr; **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.

### Step 3: Base Path Configuration
- **If deploying to a custom domain (e.g. `https://toravi24.com`):**
  - No changes needed! The default `BASE_PATH` is `/`.
- **If previewing on GitHub's default domain (`https://<username>.github.io/<repo-name>/`):**
  - In GitHub repository **Settings** &rarr; **Secrets and variables** &rarr; **Actions** &rarr; **Variables**, add a variable:
    - Name: `BASE_PATH`
    - Value: `/<repo-name>/` (with leading and trailing slashes)

### Step 4: Direct URL Navigation on GitHub Pages
GitHub Pages serves static files and normally returns 404 for client-side deep links (like `/technology/open-source-ai-audit-training-data-disclosure`). 
TORAVI24 solves this seamlessly:
- A `public/404.html` script catches direct requests, preserves the path and query, and redirects to `/?p=...`.
- `src/main.tsx` automatically decodes `?p=...` and restores the original URL in history without a reload or broken page.

---

## 6. Hostinger Domain Connection Guide (For Future Deployment)

When you are ready to connect your Hostinger domain to GitHub Pages, follow these steps. **Do not modify DNS settings until you are ready to publish.**

### 1. Configure Custom Domain in GitHub Pages
1. In your GitHub repository, go to **Settings** &rarr; **Pages**.
2. Under **Custom domain**, enter your domain (e.g., `toravi24.com` or `www.toravi24.com`).
3. Click **Save**. GitHub will automatically create a commit with a `CNAME` file or generate one during build.

### 2. Configure DNS Records in Hostinger hPanel
Log into Hostinger, navigate to **Domains** &rarr; **DNS / Nameservers** for your domain, and add the official GitHub Pages DNS records:

#### For an Apex Domain (e.g. `toravi24.com`):
Add four **A** records pointing to GitHub's server IP addresses:
- **Type:** `A` | **Name:** `@` | **Points to:** `185.199.108.153` | **TTL:** `3600`
- **Type:** `A` | **Name:** `@` | **Points to:** `185.199.109.153` | **TTL:** `3600`
- **Type:** `A` | **Name:** `@` | **Points to:** `185.199.110.153` | **TTL:** `3600`
- **Type:** `A` | **Name:** `@` | **Points to:** `185.199.111.153` | **TTL:** `3600`

#### For a Subdomain or www (e.g. `www.toravi24.com`):
- **Type:** `CNAME` | **Name:** `www` | **Points to:** `<your-username>.github.io.` | **TTL:** `3600`

### 3. Enforce HTTPS
Once DNS propagation finishes (typically 15 minutes to a few hours):
1. Return to GitHub **Settings** &rarr; **Pages**.
2. Check the box **Enforce HTTPS** (GitHub provisions a free TLS certificate via Let's Encrypt).

---

## 7. Connecting the Future API Publishing System

The application uses an architectural data-access layer (`src/services/content/`) so that switching from local demo content to an automated publishing API requires **no frontend component refactoring**:

1. **Keep Component Layer Untouched:** All views consume `content.getArticle()`, `content.listArticles()`, `content.getFeatured()`, and `content.search()`.
2. **Switch Provider via Environment:**
   Set the following environment variables in `.env` or your production hosting:
   ```env
   VITE_CONTENT_SOURCE=api
   VITE_API_BASE_URL=https://api.yourdomain.com/v1
   VITE_SITE_URL=https://yourdomain.com
   VITE_ALLOW_INDEXING=true
   ```
3. **API Contract:** The API must expose read-only GET endpoints returning data formatted according to `src/types/content.ts`. Full technical specifications are documented in [`src/services/content/README.md`](src/services/content/README.md).

---

## 8. Current Placeholders & Intentional Limitations

In strict adherence to the project instructions:
1. **Fictional Demonstration Content:** All 32 articles use fictional countries ("Veldora", "Kestria", "Northmark", "Aurelian Federation"), imaginary institutions, and illustrative Unsplash photographs to evaluate layout, typography, and hierarchy without fabricating real-world events. Every demonstration story carries a visible `DEMO` badge.
2. **Wordmark:** A clean typographic text wordmark is implemented in `src/components/Wordmark.tsx`. Replace this file with your official vector logo when ready.
3. **Contact & Corporate Info:** Corporate registration numbers, physical offices, newsroom telephone numbers, and dedicated email inboxes are clearly marked as placeholders to avoid fabricating information.
4. **Newsletter & Message Forms:** Subscription and contact forms operate in client-side demonstration mode with instant feedback states.
5. **Search Indexing:** `robots.txt` disallows search indexing and page meta tags carry `noindex` by default to prevent demonstration content from appearing in public search engines before genuine journalism is published.
