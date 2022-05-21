export type MarkdownResult<T = Record<string, unknown>> = {
  content: string;
  meta: {
    slug: string;
    id: string;
  } & T;
};
