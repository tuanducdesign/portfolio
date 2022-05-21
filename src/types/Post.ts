import { MarkdownResult } from './Markdown';

export type PostMeta = {
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  placeholder: string;
  cover: {
    path: string;
    width?: number;
    height?: number;
  };
};

export type Post = MarkdownResult<PostMeta> & { readingTime: number };
