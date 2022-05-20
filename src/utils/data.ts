import { loadImageKit } from '@site/libs';
import { Post, Project } from '@site/types';
import fs from 'fs';
import path from 'path';
import { getContent } from './content';

const base = path.join(process.cwd(), 'content');

export function getFiles(dir = '') {
  return fs.readdirSync(path.join(base, dir));
}

export async function getBlurPlaceholder(src: string) {
  const url = loadImageKit({
    src,
    width: 10,
    blur: 80,
    quality: 10,
  });
  const res = await fetch(url);
  const blob = await res.blob();
  const base64 = Buffer.from(await blob.arrayBuffer()).toString('base64');
  const mime = res.headers.get('Content-Type') ?? 'image/webp';
  return {
    base64,
    mime,
  };
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

export async function getProject(slug: string) {
  const content = getContent<Project>({
    slug,
    dir: 'projects',
  });
  // const { base64, mime } = await getBlurPlaceholder(content.meta.thumbnail);
  // content.meta.placeholder = `data:${mime};base64,${base64}`;
  return content;
}

export async function getPost(slug: string) {
  const content = getContent<Post>({
    slug,
    dir: 'posts',
  });
  return content;
}

export function getAllProjects() {
  return Promise.all(getFiles('projects').map(getProject));
}

export function getAllPosts() {
  return Promise.all(getFiles('posts').map(getPost));
}
