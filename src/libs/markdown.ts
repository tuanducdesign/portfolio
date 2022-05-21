import type { RenderRule } from 'markdown-it/lib/renderer';
import { getImgProps } from '@site/helpers';

export async function parseMarkdown(content: string) {
  // @ts-expect-error this lib doesnt built with ts
  const { default: autoHeadings } = await import('markdown-it-github-headings');
  // @ts-expect-error this lib doesnt built with ts
  const { default: taskLists } = await import('markdown-it-task-lists');
  const { default: markdownit } = await import('markdown-it');
  const { getHighlighter } = await import('shiki');
  const hl = await getHighlighter({
    theme: 'one-dark-pro',
  });
  const md = markdownit({
    html: true,
    linkify: true,
    highlight: (code, lang) => {
      return hl.codeToHtml(code, {
        lang,
      });
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
    });

  const proxy: RenderRule = (tokens, idx, options, _, self) =>
    self.renderToken(tokens, idx, options);
  const defaultCodeInline = md.renderer.rules.code_inline || proxy;
  const defaultImage = md.renderer.rules.image || proxy;

  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    tokens[idx].attrJoin(
      'class',
      'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors',
    );
    return defaultCodeInline(tokens, idx, options, env, self);
  };
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const src = tokens[idx].attrGet('src');
    const props = getImgProps({
      src: typeof src === 'string' ? src : '',
      widths: [480, 640, 864, 1100, 1260],
      sizes: ['(max-width: 512px) 100vw', '(max-width: 864) 70vw', '60vw'],
    });
    tokens[idx].attrSet('srcset', props.srcSet);
    tokens[idx].attrSet('width', props.width + '');
    tokens[idx].attrSet('src', props.src);
    tokens[idx].attrSet('sizes', props.sizes);
    return defaultImage(tokens, idx, options, env, self);
  };

  return md.render(content);
}
