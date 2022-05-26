import type * as H from 'hast';
import {
  makeSource,
  defineDocumentType,
  ComputedFields,
  defineNestedType,
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutoHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@re-taro/rehype-shiki';
import { getHighlighter } from 'shiki';
import { h } from 'hastscript';
import { buildImageKitURL } from './src/libs';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => doc._raw.sourceFileName.replace(/\.md$/, ''),
  },
};

const PostCover = defineNestedType(() => ({
  name: 'PostCover',
  fields: {
    width: {
      type: 'number',
      required: true,
      description: 'Width of the original cover size in px',
    },
    height: {
      type: 'number',
      required: true,
      description: 'Height of the original cover size in px',
    },
    path: {
      type: 'string',
      required: true,
      description: 'Path to the cover relative to the imagekit base url',
    },
  },
}));

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    featured: { type: 'boolean', required: true },
    draft: { type: 'boolean', default: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    cover: { type: 'nested', of: PostCover, required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
  },
  computedFields: {
    ...computedFields,
    readingTime: {
      type: 'json',
      resolve: doc => readingTime(doc.body.raw),
    },
  },
}));

const Project = defineDocumentType(() => ({
  name: 'Project',
  computedFields,
  filePathPattern: 'projects/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    liveUrl: { type: 'string' },
    repoUrl: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    technologies: {
      type: 'list',
      required: true,
      of: {
        type: 'string',
      },
    },
  },
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  computedFields,
  filePathPattern: 'snippets/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' } },
  },
}));

const Pages = defineDocumentType(() => ({
  name: 'Pages',
  fields: {},
  filePathPattern: '*.md',
}));

function customCodeBlock() {
  return async (tree: H.Root) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !parent) return;
      if (!('tagName' in parent)) return;
      if (parent.tagName !== 'pre') {
        node.properties ??= {};
        node.properties.className =
          'text-primary dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors';
        return;
      }
    });
  };
}

function optimizeImageKit() {
  return async (tree: H.Root) => {
    const { visit } = await import('unist-util-visit');
    visit(tree, 'element', node => {
      if (node.tagName !== 'img') return;
      node.properties ??= {};
      const src =
        typeof node.properties.src === 'string' ? node.properties.src : '';
      const widths = [480, 640, 864, 1100, 1260];
      const averageSize = Math.ceil(
        widths.reduce((prev, next) => prev + next) / widths.length,
      );
      node.properties.sizes = [
        '(max-width: 512px) 100vw',
        '(max-width: 864px) 70vw',
        '60vw',
      ];
      node.properties.srcset = widths
        .map(width =>
          [
            buildImageKitURL({
              src,
              width,
              quality: 'auto',
              format: 'auto',
            }),
            `${width}w`,
          ].join(' '),
        )
        .join(', ');
      node.properties.src = buildImageKitURL({
        src,
        width: averageSize,
        quality: 'auto',
        format: 'auto',
      });
      node.properties.className = 'rounded-md';
      node.properties.width = averageSize;
      node.properties.loading = 'lazy';
    });
  };
}

export default makeSource(async () => ({
  contentDirPath: 'content',
  documentTypes: [Post, Project, Snippet, Pages],
  onMissingOrIncompatibleData: 'fail',
  onExtraFieldData: 'fail',
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutoHeadings,
        {
          content: h('span.inline.mr-1', '#'),
        },
      ],
      [
        rehypeShiki,
        { highlighter: await getHighlighter({ theme: 'one-dark-pro' }) },
      ],
      customCodeBlock,
      optimizeImageKit,
    ],
  },
}));
