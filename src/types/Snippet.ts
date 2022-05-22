import { MarkdownResult } from './Markdown';

export type SnippetMeta = {
  title: string;
  description: string;
  tags: string[];
  icon: string;
};

export type Snippet = MarkdownResult<SnippetMeta>;
