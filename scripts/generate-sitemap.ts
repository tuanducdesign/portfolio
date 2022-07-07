import { globby } from 'globby';
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';

const SITE_URL = 'https://ashal.me';
const target = 'public/sitemap.xml';

main();

async function main() {
  const pages = await globby(['**/*.html', '!**/{500,404}.html'], {
    cwd: path.join(__dirname, '..', '.next/server/pages'),
  });
  const prettierConfig = await prettier.resolveConfig('');
  const urls = pages.map(createUrlTag);
  const generated = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  >
  ${urls.join('')}
  </urlset>`;
  fs.writeFileSync(
    path.join(__dirname, '..', target),
    prettier.format(generated, {
      ...prettierConfig,
      parser: 'html',
    }),
  );
  console.log('☑️  Successfully generate sitemap to:', target);
}

function createUrlTag(page: string) {
  page = page.replace('.html', '');
  page = page === 'index' ? '' : '/' + page;
  return `
  <url>
    <loc>${SITE_URL + page}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
}
