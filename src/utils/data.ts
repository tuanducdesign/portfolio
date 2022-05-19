import { Project } from '@site/types';
import fs from 'fs';
import path from 'path';
import { getMarkdown } from './getMarkdown';

const base = path.join(process.cwd(), 'content');

export function getFiles(dir = '') {
  return fs.readdirSync(path.join(base, dir));
}

export function getFileContent({ dir = '', filename }: { filename: string; dir?: string }) {
  return fs.readFileSync(path.join(base, dir, filename), 'utf-8');
}

export const getAllProjects = async () => {
  const projects = getFiles('projects').map((slug) => {
    return getMarkdown<Project>({
      slug,
      dir: 'projects',
    });
  });
  return await Promise.all(projects);
};

export const getAllPosts = async () => {
  const projects = getFiles('posts').map((slug) => {
    return getMarkdown<Project>({
      slug,
      dir: 'posts',
    });
  });
  return await Promise.all(projects);
};
