import { Project } from '@site/types';
import fs from 'fs';
import path from 'path';
import { getContent } from './content';

const base = path.join(process.cwd(), 'content');

export function getFiles(dir = '') {
  return fs.readdirSync(path.join(base, dir));
}

export function getFileContent({ dir = '', filename }: { filename: string; dir?: string }) {
  return fs.readFileSync(path.join(base, dir, filename), 'utf-8');
}

export function getAllProjects() {
  return getFiles('projects').map((slug) => {
    return getContent<Project>({
      slug,
      dir: 'projects',
    });
  });
}

export function getAllPosts() {
  return getFiles('posts').map((slug) => {
    return getContent<Project>({
      slug,
      dir: 'posts',
    });
  });
}
