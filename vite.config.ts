import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * BASE_PATH controls where the site is served from.
 *  - Custom domain (e.g. https://www.yourdomain.com/)  -> "/"            (default)
 *  - GitHub project page (https://user.github.io/repo/) -> "/repo/"
 * It is read from the environment so the same code works in both cases.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  let base = env.BASE_PATH || '/';
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;

  return {
    base,
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      target: 'es2020',
    },
    server: { port: 5173 },
  };
});
