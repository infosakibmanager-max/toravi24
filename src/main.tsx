import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';

// Import self-hosted fonts
import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';

/**
 * Handle SPA redirect from GitHub Pages 404.html
 * (e.g. ?p=/world/slug -> replaces location state to /world/slug)
 */
(function checkSpaRedirect() {
  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get('p');
  if (redirectPath) {
    const newUrl =
      window.location.pathname.replace(/\/+$/, '') +
      redirectPath +
      window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }
})();

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
