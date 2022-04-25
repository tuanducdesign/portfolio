import fs from 'fs';
import { Project } from '@site/types';
import { dataDir, getMarkdown } from './getMarkdown';
import path from 'path';

export const getAllProjectFiles = () => {
  return fs.readdirSync(path.join(dataDir, 'projects'));
};

export const getAllProjects = async () => {
  const projectFiles = getAllProjectFiles();
  const results = await Promise.all(projectFiles.map((p) => getMarkdown(p.slice(0, -3), true)));
  return results as Project[];
};
