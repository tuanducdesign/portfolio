import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white-text text-black-primary dark:bg-black-primary dark:text-white-text transition-colors duration-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
