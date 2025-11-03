/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com',
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

    // Playbook (complete workflow) - highest priority for articles
    if (path.startsWith('/playbook/')) {
      priority = 0.9;
      changefreq = 'weekly';
    }

    // Mild response articles
    if (path.startsWith('/mild-response/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    // Escalation articles
    if (path.startsWith('/escalation/')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    // Industry-specific articles
    if (path.startsWith('/industry-specific/')) {
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
