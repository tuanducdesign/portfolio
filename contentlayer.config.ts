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
import { visit } from 'unist-util-visit';
import { buildImageKitURL, IMAGEKIT_BASE_URL } from './src/libs';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => doc._raw.sourceFileName.replace(/\.md$/, ''),
  },
};

const PostCover = defineNestedType(() => ({
  name: 'PostCover',
  fields: {
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
    path: { type: 'string', required: true },
    credit: { type: 'string', required: true },
    author: { type: 'string', required: true },
  },
}));

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/*.md',
  fields: {
    featured: { type: 'boolean', required: true },
    draft: { type: 'boolean', default: false },
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
    placeholder: {
      type: 'string',
      resolve: async doc => await getBlurPlaceholder(doc.cover.path),
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
      externalLink, // TODO: Reactivate this
    ],
  },
}));

export function externalLink() {
  return (tree: H.Root) => {
    visit(tree, 'element', node => {
      if (node.tagName != 'a') return;
      node.properties ??= {};
      if (typeof node.properties.href !== 'string') return;
      if (node.properties.href.match(/^(#|\/)/)) return;
      node.properties.target = '_blank';
      node.properties.rel = 'noreferrer noopener';
    });
  };
}

function optimizeImageKit() {
  return async (tree: H.Root) => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'img') return;
      node.properties ??= {};
      const src =
        typeof node.properties.src === 'string' ? node.properties.src : '';
      if (!src.startsWith(IMAGEKIT_BASE_URL)) return;
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

function customCodeBlock() {
  return async (tree: H.Root) => {
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'code' || !parent) return;
      if (!('tagName' in parent)) return;
      if (parent.tagName !== 'pre') {
        node.properties ??= {};
        node.properties.className =
          'text-primary dark:bg-gray-800 bg-gray-200 rounded-md py-[1px] px-1 transition-colors';
        return;
      }
    });
  };
}

async function getBlurPlaceholder(src: string) {
  const url = buildImageKitURL({
    src,
    width: 1000,
    blur: 10,
    quality: 10,
    format: 'webp',
  });
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = res.headers.get('Content-Type') ?? 'image/webp';
  return `data:${mime};base64,${base64}`;
}
