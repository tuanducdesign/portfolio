import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `let preloadedTheme=localStorage.getItem("theme");if(preloadedTheme==null){const isPreferDark=window.matchMedia('(prefers-color-scheme:dark)').matches;preloadedTheme=isPreferDark?'dark':'light';}if(preloadedTheme==="dark"){document.documentElement.classList.add("dark");}document.documentElement.style['color-scheme']=preloadedTheme;`,
          }}
        />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </Head>
      <body className="bg-light-primary text-dark-primary dark:bg-dark-primary dark:text-light-primary transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
