import { loadImageKit } from '@site/libs';
import { Post, Project } from '@site/types';
import { getContent, getFiles } from './content';

export async function getBlurPlaceholder(src: string) {
  const url = loadImageKit({
    src,
    width: 1000,
    blur: 10,
    quality: 10,
  });
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = res.headers.get('Content-Type') ?? 'image/webp';
  return {
    base64,
    mime,
  };
}

export async function getProject(slug: string) {
  const content = getContent<Project>({
    slug,
    dir: 'projects',
  });
  return content;
}

export async function getPost(slug: string, placeholder = false) {
  const content = getContent<Post>({
    slug,
    dir: 'posts',
  });
  if (placeholder) {
    const { base64, mime } = await getBlurPlaceholder(content.meta.cover.path);
    content.meta.placeholder = `data:${mime};base64,${base64}`;
  }
  return content;
}

export function getAllProjects() {
  return Promise.all(getFiles('projects').map(getProject));
}

export function getAllPosts() {
  return Promise.all(getFiles('posts').map(post => getPost(post)));
}
