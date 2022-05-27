const { yellow, slate } = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{jsx,tsx,ts}', './contentlayer.config.ts'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'blockquote > p::before': {
              content: 'none',
            },
            'blockquote > p::after': {
              content: 'none',
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
        // Neutral color: description, footer.
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
