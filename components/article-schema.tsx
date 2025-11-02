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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibarai-guide.com';
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
      '@type': 'Person',
      name: author,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    publisher: {
      '@type': 'Organization',
      name: '未入金・支払い催促実務ガイド',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
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
