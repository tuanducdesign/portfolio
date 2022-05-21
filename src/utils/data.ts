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
  const content = await getContent<Project>({
    slug,
    dir: 'projects',
  });
  return content;
}

const WPM = 250;

export async function getPost(slug: string, placeholder = false) {
  const post = await getContent<Post>({
    slug,
    dir: 'posts',
  });
  if (placeholder) {
    const { base64, mime } = await getBlurPlaceholder(post.meta.cover.path);
    post.meta.placeholder = `data:${mime};base64,${base64}`;
  }

  const words = post.content.replace(/<[^>]+>/g, '').split(' ');
  const readTime = Math.ceil(words.length / WPM);
  post.readingTime = readTime;
  return post;
}

export function getAllProjects() {
  return Promise.all(getFiles('projects').map(getProject));
}

export function getAllPosts() {
  return Promise.all(getFiles('posts').map(post => getPost(post)));
}
