import { getImgProps } from '@site/helpers';
import type { RenderRule } from 'markdown-it/lib/renderer';
import type { PluginSimple } from 'markdown-it';

const fallbackRender: RenderRule = (tokens, idx, options, _env, self) => {
  return self.renderToken(tokens, idx, options);
};

export const inlineCodePlugin: PluginSimple = md => {
  const defaultRender = md.renderer.rules.code_inline || fallbackRender;
  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    tokens[idx].attrJoin(
      'class',
      'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors',
    );
    return defaultRender(tokens, idx, options, env, self);
  };
};

export const optimizeImagePlugin: PluginSimple = md => {
  const defaultRender = md.renderer.rules.image || fallbackRender;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const src = tokens[idx].attrGet('src');
    const props = getImgProps({
      src: typeof src === 'string' ? src : '',
      widths: [480, 640, 864, 1100, 1260],
      sizes: ['(max-width: 512px) 100vw', '(max-width: 864px) 70vw', '60vw'],
    });
    tokens[idx].attrSet('srcset', props.srcSet);
    tokens[idx].attrSet('width', props.width + '');
    tokens[idx].attrSet('src', props.src);
    tokens[idx].attrSet('sizes', props.sizes);
    return defaultRender(tokens, idx, options, env, self);
  };
};

export const clipboardCodeBlock: PluginSimple = md => {
  const defaultRender = md.renderer.rules.code_block || fallbackRender;
  md.renderer.rules.code_block = (tokens, idx, options, env, self) => {
    return defaultRender(tokens, idx, options, env, self);
  };
};
