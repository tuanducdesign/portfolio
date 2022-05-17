import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { markdownParser } from '@site/libs';
import { getFileContent } from './data';
import { MarkdownResult } from '@site/types';

export const getMarkdown = async <T extends MarkdownResult = MarkdownResult>({
  dir = '',
  slug,
}: {
  dir?: string;
  slug: string;
}) => {
  if (!slug.endsWith('.md')) {
    slug += '.md';
  }
  const file = getFileContent({
    dir,
    filename: slug,
  });
  const { content, data } = matter(file);
  const html = markdownParser.processSync(content);
  slug = slug.slice(0, -3);
  return {
    html: html.toString(),
    meta: { ...data, slug, id: nanoid() },
  } as T;
};
