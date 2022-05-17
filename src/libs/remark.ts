import { unified } from 'unified';
import parse from 'remark-parse';
import rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { AnchorIconAST } from '@site/components';

export const markdownParser = unified()
  .use(gfm)
  // @ts-expect-error Temp ignore
  .use(parse)
  .use(rehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'append',
    content: (node) => {
      if (node.properties) {
        node.properties.class = 'group scroll-mt-16';
      }
      return AnchorIconAST;
    },
  })
  // @ts-expect-error Temp ignore
  .use(stringify)
  .use(rehypeHighlight);
