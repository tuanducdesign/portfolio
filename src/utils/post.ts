import { parseMarkdown } from '@site/libs';
import type { Post } from '@site/types';
import matter from 'gray-matter';
import { nanoid } from 'nanoid';
import { getFileContent, getFiles } from './content';
import { getBlurPlaceholder } from './image';

const WPM = 250;

export async function getPost({
  slug,
  placeholder = false,
  withContent = false,
}: {
  slug: string;
  placeholder?: boolean;
  withContent?: boolean;
}) {
  const raw = getFileContent({
    filename: slug,
    dir: 'posts',
  });
  const { content, data } = matter(raw);
  const result = {
    meta: {
      ...data,
      id: nanoid(),
      slug,
    },
  } as Post;

  if (placeholder) {
    result.meta.placeholder = await getBlurPlaceholder(result.meta.cover.path);
  }

  if (withContent) {
    result.content = await parseMarkdown(content);
    const words = result.content.replace(/<[^>]+>/g, '').split(' ');
    result.readingTime = Math.ceil(words.length / WPM);
  }

  return result;
}

export function getAllPosts() {
  const slugs = getFiles('posts');
  const posts = slugs.map(slug => {
    return getPost({
      slug,
    });
  });
  return Promise.all(posts);
}
