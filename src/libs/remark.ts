import { Plugin, unified } from 'unified';
import parse from 'remark-parse';
import rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

function inlineCode(): ReturnType<Plugin<void[], Root>> {
  return (tree) => {
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !parent) return;
      if ('tagName' in parent && parent.tagName !== 'pre') {
        node.properties ??= {};
        node.properties.className =
          'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px]';
        return;
      }
    });
  };
}

function imageSrcSet(): ReturnType<Plugin<void[], Root>> {
  const sizes = [560, 840, 1100, 1650];
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      node.properties = node.properties ?? {};
      node.properties.className = 'mx-auto rounded-md';
      node.properties.srcset = sizes
        .map((screen) => `${node.properties?.src ?? ''}?tr=w-${screen} ${screen}w`)
        .join(', ');
      node.properties.sizes =
        '(max-width: 840px) 100vw, (max-width: 1023px) 80vw, (min-width: 1024px) and (max-width: 1620px) 67vw, 1100px';
    });
  };
}

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
  .use(rehypeHighlight)
  .use(imageSrcSet)
  .use(inlineCode);
