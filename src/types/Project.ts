import { MarkdownResult } from './Markdown';

export type ProjectMeta = {
  title: string;
  liveUrl?: string;
  repoUrl: string;
  thumbnail: string;
  placeholder: string;
  description?: string;
  technologies: string[];
};

export type Project = MarkdownResult<ProjectMeta>;
