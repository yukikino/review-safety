/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mibarai-guide.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Default priority and changefreq
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }

    // About page
    if (path === '/about') {
      priority = 0.5;
      changefreq = 'monthly';
    }

    // Guide articles
    if (path.startsWith('/guide/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
