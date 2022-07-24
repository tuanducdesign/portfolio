const { yellow, slate } = require('tailwindcss/colors');

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,ts}', './contentlayer.config.ts'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        'fade-up': 'fade-up 500ms ease',
        'waving-hand': 'waving-hand-2 2.1s linear',
      },
      keyframes: {
        'fade-up': {
          from: {
            transform: 'translate(0, 25px)',
            opacity: 0,
          },
          to: {
            transform: 'translate(0, 0)',
            opacity: 1,
          },
        },
        'waving-hand-2': {
          '0%, 70%, 100%': {
            transform: 'rotate(0deg)',
          },
          '10%, 30%, 50%': {
            transform: 'rotate(24deg)',
          },
          '20%, 40%, 60%': {
            transform: 'rotate(-8deg)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote > p::before': {
              content: 'none',
            },
            'blockquote > p::after': {
              content: 'none',
            },
            'blockquote > p': {
              color: slate[500],
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      },
      colors: {
        'dark-primary': '#161a1d',
        'light-primary': '#FBFBFB',
        primary: '#60A5FA',
        secondary: yellow[500],
        neutral: slate[500],
        'neutral-light': slate[400],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
