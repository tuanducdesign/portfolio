export async function parseMarkdown(content: string) {
  const { inlineCodePlugin, optimizeImagePlugin, clipboardCodeBlock } =
    await import('./plugins');
  // @ts-expect-error this lib doesnt built with ts
  const { default: autoHeadings } = await import('markdown-it-github-headings');
  // @ts-expect-error this lib doesnt built with ts
  const { default: taskLists } = await import('markdown-it-task-lists');
  const { default: MarkdownIt } = await import('markdown-it');
  const { getHighlighter } = await import('shiki');
  const shiki = await getHighlighter({
    theme: 'one-dark-pro',
  });

  const md = MarkdownIt({
    linkify: true,
    highlight: (code, lang) => {
      return shiki.codeToHtml(code, { lang });
    },
  })
    .use(autoHeadings, {
      enableHeadingLinkIcons: true,
      className: 'mr-1 scroll-mt-16',
      linkIcon: '#',
      prefix: '',
    })
    .use(taskLists, {
      label: true,
    })
    .use(inlineCodePlugin)
    .use(clipboardCodeBlock)
    .use(optimizeImagePlugin);

  return md.render(content);
}
