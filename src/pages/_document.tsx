import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
