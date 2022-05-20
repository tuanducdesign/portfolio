module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{jsx,tsx,ts}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'yellow-border': '#E6AF2E',
        'black-primary': '#161a1d',
        'white-text': '#FBFBFB',
        'blue-text': '#60A5FA',
        'gray-text': 'rgb(107, 114, 128)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
