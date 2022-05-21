import { parseMarkdown } from '@site/libs';
import type { Snippet } from '@site/types';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { getFileContent, getFiles } from './content';

export async function getSnippet({
  slug,
  withContent,
}: {
  slug: string;
  withContent?: boolean;
}) {
  const raw = getFileContent({
    filename: slug,
    dir: 'snippets',
  });
  const { content, data } = matter(raw);
  if (slug.endsWith('.md')) {
    slug = slug.slice(0, -3);
  }
  const result = {
    meta: {
      ...data,
      id: nanoid(),
      slug,
    },
  } as Snippet;
  if (withContent) {
    result.content = await parseMarkdown(content);
  }
  return result;
}

export function getAllSnippets() {
  const slugs = getFiles('snippets');
  const snippets = slugs.map(slug => {
    return getSnippet({
      slug,
    });
  });
  return Promise.all(snippets);
}
