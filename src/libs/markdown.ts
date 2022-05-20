import type * as H from 'hast';
import type { VFile } from 'vfile';
import { getImgProps } from '@site/helpers';

function customCodeBlock() {
  return async (tree: H.Root) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !parent) return;
      if (!('tagName' in parent)) return;
      if (parent.tagName !== 'pre') {
        node.properties ??= {};
        node.properties.className =
          'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors';
        return;
      }
      parent.properties ??= {};
      parent.properties.className = 'not-prose bg-transparent p-0';
    });
  };
}

function optimizeImageKit() {
  return async (tree: H.Root) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'element', node => {
      if (node.tagName != 'img') return;
      node.properties ??= {};
      node.properties = {
        ...node.properties,
        ...getImgProps({
          src:
            typeof node.properties.src === 'string' ? node.properties.src : '',
          widths: [480, 640, 864, 1100, 1260],
          sizes: ['(max-width: 512px) 100vw', '(max-width: 864) 70vw', '60vw'],
        }),
        className: 'mx-auto rounded-md',
        loading: 'lazy',
      };
    });
  };
}

function addReadingTime() {
  return async (tree: H.Root, file: VFile) => {
    const { readingTime } = await import('hast-util-reading-time');
    file.data.readingTime = Math.ceil(readingTime(tree));
  };
}

export async function parseMarkdown(content: string) {
  const { unified } = await import('unified');
  const { default: rehypeAutolinkHeadings } = await import(
    'rehype-autolink-headings'
  );
  const { default: rehypeHighlight } = await import('rehype-highlight');
  const { default: rehypeSlug } = await import('rehype-slug');
  const { default: rehypeStringify } = await import('rehype-stringify');
  const { default: remarkGfm } = await import('remark-gfm');
  const { default: remarkParse } = await import('remark-parse');
  const { default: remarkRehype } = await import('remark-rehype');
  const parser = unified()
    .use(remarkGfm)
    // @ts-expect-error idk
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
    })
    .use(rehypeHighlight)
    // Custom
    .use(optimizeImageKit)
    .use(customCodeBlock)
    .use(addReadingTime)
    // @ts-expect-error idk
    .use(rehypeStringify);
  return parser.process(content);
}
