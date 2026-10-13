import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { EditorialStandardsPage } from './pages/EditorialStandardsPage';
import { CorrectionsPolicyPage } from './pages/CorrectionsPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <SiteHeader />

      <div id="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/editorial-standards" element={<EditorialStandardsPage />} />
          <Route path="/corrections-policy" element={<CorrectionsPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Dynamic Article and Category routes */}
          <Route path="/:category/:slug" element={<ArticlePage />} />
          <Route path="/:category" element={<CategoryPage />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <SiteFooter />
    </div>
  );
}

export default App;
