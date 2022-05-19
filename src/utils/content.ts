import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { getFileContent } from './data';
import { MarkdownResult } from '@site/types';

export function getContent<T extends MarkdownResult = MarkdownResult>({
  dir = '',
  slug,
}: {
  dir?: string;
  slug: string;
}) {
  if (!slug.endsWith('.md')) {
    slug += '.md';
  }
  const file = getFileContent({
    dir,
    filename: slug,
  });
  const { content, data } = matter(file);
  slug = slug.slice(0, -3);
  return {
    content,
    meta: { ...data, slug, id: nanoid() },
  } as T;
}
