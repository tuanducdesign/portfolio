import { h } from 'hastscript';

export const AnchorIconAST = h(
  'svg',
  {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '20',
    height: '20',
    viewBox: '0 0 24 24',
    fill: 'none',
    class:
      'inline mr-1 inset-y-0 right-1 translate-y-1/4 dark:text-yellow-border text-blue-text absolute',
    'aria-hidden': 'true',
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
