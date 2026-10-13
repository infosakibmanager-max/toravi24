import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('[postbuild] dist directory does not exist!');
  process.exit(1);
}

// 1. Ensure .nojekyll exists so GitHub Pages serves all assets
fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');
console.log('[postbuild] Created .nojekyll');

// 2. If CNAME is provided in environment, write it out
const cname = process.env.CUSTOM_DOMAIN;
if (cname && cname.trim()) {
  fs.writeFileSync(path.join(distDir, 'CNAME'), cname.trim(), 'utf-8');
  console.log(`[postbuild] Created CNAME with domain: ${cname.trim()}`);
}

// 3. Ensure 404.html exists in dist
const public404 = path.resolve('public', '404.html');
const dist404 = path.join(distDir, '404.html');
if (!fs.existsSync(dist404) && fs.existsSync(public404)) {
  fs.copyFileSync(public404, dist404);
  console.log('[postbuild] Copied 404.html to dist');
}

console.log('[postbuild] Completed postbuild tasks successfully.');
