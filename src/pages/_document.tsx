import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
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
