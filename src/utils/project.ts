import { parseMarkdown } from '@site/libs';
import type { Project } from '@site/types';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { getFileContent, getFiles } from './content';

export async function getProject({
  slug,
  withContent = false,
}: {
  slug: string;
  /**
   * Wheter to parse the markdown or not
   * @default false
   */
  withContent?: boolean;
}) {
  const raw = getFileContent({
    filename: slug,
    dir: 'projects',
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
  } as Project;
  if (withContent) {
    result.content = await parseMarkdown(content);
  }
  return result;
}

export function getAllProjects() {
  const slugs = getFiles('projects');
  const projects = slugs.map(slug => {
    return getProject({
      slug,
    });
  });
  return Promise.all(projects);
}
