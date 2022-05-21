const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ashal.me';
const target = 'public/sitemap.xml';

main();

function main() {
  const base = path.join(process.cwd(), '.next/server/pages');
  const subpaths = ['', '/blog', '/project'];
  const segments = subpaths.map(sub => {
    const files = fs
      .readdirSync(path.join(base, sub))
      // Exclude file that are non static page
      .filter(file => file.endsWith('.html'))
      // Exclude 404 and 500 pages
      .filter(file => !(file.includes('404') || file.includes('500')));
    return files.map(file => createUrlTag(file, sub));
  });
  const generated = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml" 
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  >${segments.flat().join('')}
  </urlset>`;

  fs.writeFileSync(path.join(process.cwd(), target), generated);
  console.log('☑️  Successfully generate sitemap to:', target);
}

/**
 * @param {string} page
 * @param {string} subpath
 */
function createUrlTag(page, subpath) {
  let urlPath = page.replace('.html', '');
  urlPath = urlPath === 'index' ? '' : '/' + urlPath;
  return `
      <url>
          <loc>${SITE_URL + subpath + urlPath}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
      </url>`;
}
