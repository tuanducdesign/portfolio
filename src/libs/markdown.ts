export async function parseMarkdown(content: string) {
  const { externalLink, inlineCodePlugin, optimizeImagePlugin } = await import(
    './plugins'
  );
  const { default: markdownItGithubHeadings } = await import(
    'markdown-it-github-headings'
  );
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
    .use(markdownItGithubHeadings, {
      enableHeadingLinkIcons: true,
      className: 'mr-1 scroll-mt-16',
      linkIcon: '#',
      prefix: '',
    })
    .use(taskLists, {
      label: true,
    })
    .use(inlineCodePlugin)
    .use(externalLink)
    .use(optimizeImagePlugin);

  return md.render(content);
}
