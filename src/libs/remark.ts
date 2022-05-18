import { unified } from 'unified';
import parse from 'remark-parse';
import rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export const markdownParser = unified()
  .use(gfm)
  // @ts-expect-error Temp ignore
  .use(parse)
  .use(rehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
  })
  // @ts-expect-error Temp ignore
  .use(stringify)
  .use(rehypeHighlight);
