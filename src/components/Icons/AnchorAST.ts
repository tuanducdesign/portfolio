import { h } from 'hastscript';

export const AnchorIconAST = h(
  'svg.inline.ml-1.text-blue-text.opacity-0.group-hover:opacity-100',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  [
    h('circle', {
      cx: '12',
      cy: '5',
      r: '3',
    }),
    h('line', {
      x1: '12',
      y1: '22',
      x2: '12',
      y2: '8',
    }),
    h('path', {
      d: 'M5 12H2a10 10 0 0 0 20 0h-3',
    }),
  ],
);
