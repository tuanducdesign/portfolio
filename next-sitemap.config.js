const siteUrl = 'https://ashal.me';

/** @type {import("next-sitemap").AdditionalPathsConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.9,
};
