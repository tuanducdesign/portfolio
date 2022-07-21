import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type { Theme } from '@site/utils';

const sunClasses = {
  dark: 'stroke-dash-0 opacity-0',
  light: 'stroke-dash-1 opacity-1',
};

const moonClasses = {
  dark: 'stroke-dash-1 opacity-1',
  light: 'stroke-dash-0 opacity-0',
};

const sunLines = [
  { x1: '12', y1: '1', x2: '12', y2: '3' },
  { x1: '12', y1: '21', x2: '12', y2: '23' },
  { x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64' },
  { x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78' },
  { x1: '1', y1: '12', x2: '3', y2: '12' },
  { x1: '21', y1: '12', x2: '23', y2: '12' },
  { x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36' },
  { x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22' },
];

export const ThemeIcon = ({ theme }: { theme: Theme }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="h-6 w-6" />;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-current"
    >
      {/* Moon */}
      <path
        pathLength="1"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        className={clsx('theme-icon-transition', moonClasses[theme])}
      />
      {/* SUN */}
      <circle
        pathLength="1"
        className={clsx('theme-icon-transition', sunClasses[theme])}
        cx="12"
        cy="12"
        r="5"
      />
      {sunLines.map((l, i) => (
        <line
          key={i}
          pathLength="1"
          className={clsx('theme-icon-transition', sunClasses[theme])}
          {...l}
        />
      ))}
    </svg>
  );
};
