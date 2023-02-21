const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = withContentlayer({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = withBundleAnalyzer(config);
