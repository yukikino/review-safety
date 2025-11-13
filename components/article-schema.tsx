interface ArticleSchemaProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  url,
  imageUrl,
}: ArticleSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';
  const defaultImage = `${siteUrl}/og-default.png`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl || defaultImage,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': author === '編集部' ? 'Organization' : 'Person',
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    publisher: {
      '@type': 'Organization',
      name: '口コミ対応マニュアル',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        // TODO: Replace with square logo image (512x512) for better SEO compliance
        // Current image is 1200x630, but schema.org recommends square logos
        // Create /public/logo-square.png and update this to:
        // url: `${siteUrl}/logo-square.png`,
        // width: 512,
        // height: 512,
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
