import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { MarkdownResult } from '@site/types';
import { parseMarkdown } from '@site/libs';

const base = path.join(process.cwd(), 'content');

export function getFiles(dir = '') {
  return fs.readdirSync(path.join(base, dir));
}

export function getFileContent({
  dir = '',
  filename,
}: {
  filename: string;
  dir?: string;
}) {
  return fs.readFileSync(path.join(base, dir, filename), 'utf-8');
}

export async function getContent<T extends MarkdownResult = MarkdownResult>({
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
  const html = await parseMarkdown(content);
  return {
    content: html,
    meta: {
      ...data,
      // normalize filename to slug again
      slug: slug.slice(0, -3),
      id: nanoid(),
    },
  } as T;
}
