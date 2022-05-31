import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
      </Head>
      <body className="scroll-smooth bg-light-primary text-dark-primary dark:bg-dark-primary dark:text-light-primary transition-colors duration-300">
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`,
          }}
        />
      </body>
    </Html>
  );
}
