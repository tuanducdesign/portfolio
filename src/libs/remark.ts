import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

export const markdownParser = remark().use(html, { sanitize: false }).use(prism);
