import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: '軽度クレーム対応｜返信テンプレート集 | Review Safety',
  description: '「待たされた」「態度が悪い」など軽度クレームへの返信テンプレート19選。Googleマップ・食べログの★1レビュー対応マニュアル。飲食店・美容室向けの実践的な口コミ対応ガイド。',
  keywords: ['軽度クレーム', '返信テンプレート', '口コミ対応', 'Googleマップ', '食べログ', '飲食店', '美容室'],
  alternates: {
    canonical: `${siteUrl}/mild-response`,
  },
  openGraph: {
    title: '軽度クレーム対応｜返信テンプレート集',
    description: '「待たされた」「態度が悪い」など軽度クレームへの返信テンプレート19選。Googleマップ・食べログの★1レビュー対応マニュアル。',
    url: `${siteUrl}/mild-response`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function MildResponsePage() {
  const articles = await getAllArticles('mild-response');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '軽度クレーム対応', url: '/mild-response' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '軽度クレーム対応｜返信テンプレート集',
    description: '軽度クレームへの返信テンプレートと対応マニュアル',
    url: `${siteUrl}/mild-response`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.frontmatter.title,
          description: article.frontmatter.description,
          url: `${siteUrl}/mild-response/${article.slug}`,
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
            軽度クレーム対応｜返信テンプレート集
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-700)',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
          }}>
            「待たされた」「態度が悪い」「清潔感がない」など、軽度クレームへの返信テンプレートと対応マニュアルをまとめました。Googleマップや食べログでの★1〜2レビューに対する適切な返信方法を、実例とともに解説します。
          </p>
          <div style={{
            backgroundColor: 'var(--background-secondary)',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid var(--primary-blue)',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              lineHeight: '1.8',
              margin: 0,
            }}>
              <strong>💡 このカテゴリの使い方：</strong>
              軽度クレームは適切に対応すれば、顧客満足度の向上につながります。各記事では、クレームの種類別に返信テンプレート、NG表現、改善策を詳しく解説しています。
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                href={`/mild-response/${article.slug}`}
                tags={article.frontmatter.tags}
                title={article.frontmatter.title}
                description={article.frontmatter.description}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
