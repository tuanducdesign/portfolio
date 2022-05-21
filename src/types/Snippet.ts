import { MarkdownResult } from './Markdown';

export type SnippetMeta = {
  title: string;
  description: string;
  tag: string;
};

export type Snippet = MarkdownResult<SnippetMeta>;
