import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: 'プラットフォーム別対応｜Google・Twitter・Instagram炎上対策 | Review Safety',
  description: 'Googleマップ、Twitter、Instagram、食べログなどプラットフォーム別の口コミ・炎上対応マニュアル。削除申請、報告手順、クライシス管理を詳しく解説。',
  keywords: ['プラットフォーム別', 'Googleマップ', 'Twitter', 'Instagram', '食べログ', '炎上対策', '削除申請'],
  alternates: {
    canonical: `${siteUrl}/platform-specific`,
  },
  openGraph: {
    title: 'プラットフォーム別対応｜Google・Twitter・Instagram炎上対策',
    description: 'Googleマップ、Twitter、Instagram、食べログなどプラットフォーム別の口コミ・炎上対応マニュアル。',
    url: `${siteUrl}/platform-specific`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function PlatformSpecificPage() {
  const articles = await getAllArticles('platform-specific');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'プラットフォーム別対応', url: '/platform-specific' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'プラットフォーム別対応｜Google・Twitter・Instagram炎上対策',
    description: 'プラットフォーム別の口コミ・炎上対応マニュアル',
    url: `${siteUrl}/platform-specific`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.title,
          description: article.description,
          url: `${siteUrl}/platform-specific/${article.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Breadcrumb items={breadcrumbItems} />

        <section style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'var(--gray-900)',
            marginBottom: '1rem',
            lineHeight: '1.2',
          }}>
            プラットフォーム別対応｜Google・Twitter・Instagram炎上対策
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-700)',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
          }}>
            Googleマップ、Twitter、Instagram、食べログなど、プラットフォームごとの口コミ・炎上対応マニュアルです。各プラットフォームの削除申請手順、報告方法、クライシス管理のベストプラクティスを詳しく解説します。
          </p>
          <div style={{
            backgroundColor: '#FCE4EC',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid #C2185B',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              lineHeight: '1.8',
              margin: 0,
            }}>
              <strong>🚨 このカテゴリの使い方：</strong>
              プラットフォームごとに、規約、削除申請の基準、対応時間の目安が異なります。対象プラットフォームの記事を参照し、適切な手順で対応してください。
            </p>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--gray-900)',
            marginBottom: '1.5rem',
            borderBottom: '2px solid var(--primary-blue)',
            paddingBottom: '0.5rem',
          }}>
            記事一覧（全{articles.length}件）
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}>
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                href={`/platform-specific/${article.slug}`}
                tags={article.frontmatter.tags}
                tagColor="#C2185B"
                tagBgColor="#FCE4EC"
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                linkColor="#C2185B"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
