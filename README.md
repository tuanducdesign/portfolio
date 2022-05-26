# ashal.me

## Technologies used

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Animation: [framer-motion](https://framer.com/docs)
- Content Management: [Contentlayer](https://www.contentlayer.dev/)
- Image CDN: [imagekit.io](https://imagekit.io/)
- Syntax Highlighting: [shiki](https://shiki.matsu.io/)

## Overview

- `content` The content directory for storing the markdown, each sub directory will have `_template` dedicated:
  - `content/posts` directory for blog post
  - `content/projects` directory for personal project overview
  - `content/snippet` directory for personal code snippets
- `src`
  - `config` Site configuration from personal information/profile.
  - `styles` Just a single `css` that import `tailwindcss` directives
  - `utils` Utility for `server side`.
  - `helpers` Helper modules for `client side`.
  - `libs` Wrapper/Abstraction for external lib to this app.
  - `types` TypeScript type models.
