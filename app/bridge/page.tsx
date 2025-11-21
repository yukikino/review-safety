import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: 'ブリッジコンテンツ｜リピーター獲得・売上向上ガイド | Review Safety',
  description: 'リピーター獲得、ポイントカード、アップセル、来店促進など、口コミ対応から売上向上につなげる実践ガイド。顧客ロイヤリティ向上の具体的施策を解説。',
  keywords: ['ブリッジコンテンツ', 'リピーター獲得', 'ポイントカード', 'アップセル', '来店促進', '顧客ロイヤリティ'],
  alternates: {
    canonical: `${siteUrl}/bridge`,
  },
  openGraph: {
    title: 'ブリッジコンテンツ｜リピーター獲得・売上向上ガイド',
    description: 'リピーター獲得、ポイントカード、アップセル、来店促進など、口コミ対応から売上向上につなげる実践ガイド。',
    url: `${siteUrl}/bridge`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function BridgePage() {
  const articles = await getAllArticles('bridge');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'ブリッジコンテンツ', url: '/bridge' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ブリッジコンテンツ｜リピーター獲得・売上向上ガイド',
    description: '口コミ対応から売上向上につなげる実践ガイド',
    url: `${siteUrl}/bridge`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.title,
          description: article.description,
          url: `${siteUrl}/bridge/${article.slug}`,
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
            ブリッジコンテンツ｜リピーター獲得・売上向上ガイド
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-700)',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
          }}>
            口コミ対応をきっかけに、リピーター獲得や売上向上につなげるための実践ガイドです。ポイントカード、アップセル、来店促進施策など、顧客ロイヤリティを高める具体的な方法を解説します。
          </p>
          <div style={{
            backgroundColor: '#FFF9C4',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid #F57F17',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              lineHeight: '1.8',
              margin: 0,
            }}>
              <strong>💰 このカテゴリの使い方：</strong>
              口コミ対応は「守り」だけでなく、「攻め」の施策にもつながります。各記事では、顧客との関係構築から売上向上までの具体的な施策を紹介しています。
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
                href={`/bridge/${article.slug}`}
                tags={article.frontmatter.tags}
                tagColor="#F57F17"
                tagBgColor="#FFF9C4"
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                linkColor="#F57F17"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
