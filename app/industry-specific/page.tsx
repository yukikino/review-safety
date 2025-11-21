import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: '【業種別】飲食店・美容室・ホテルの口コミ対応マニュアル14選｜絶対NGな返信例',
  description: '飲食店、美容室、ホテル、病院など業種別の口コミ対応マニュアル14選。業界特有のクレームパターンと返信テンプレート、炎上リスクの高いNG表現を詳しく解説。薬機法・医療広告ガイドライン対応。',
  keywords: ['業種別対応', '飲食店', '美容室', 'ホテル', '病院', '口コミ対応', 'クレーム'],
  alternates: {
    canonical: `${siteUrl}/industry-specific`,
  },
  openGraph: {
    title: '業種別対応｜飲食店・美容室・ホテル向けガイド',
    description: '飲食店、美容室、ホテル、病院など業種別の口コミ対応マニュアル。業界特有のクレームパターンと返信テンプレートを解説。',
    url: `${siteUrl}/industry-specific`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function IndustrySpecificPage() {
  const articles = await getAllArticles('industry-specific');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '業種別対応', url: '/industry-specific' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '業種別対応｜飲食店・美容室・ホテル向けガイド',
    description: '業種別の口コミ対応マニュアルと返信テンプレート',
    url: `${siteUrl}/industry-specific`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.frontmatter.title,
          description: article.frontmatter.description,
          url: `${siteUrl}/industry-specific/${article.slug}`,
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
            業種別対応｜飲食店・美容室・ホテル向けガイド
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-700)',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
          }}>
            飲食店、美容室、ホテル、病院など、業種別の口コミ対応マニュアルです。各業界特有のクレームパターン、炎上リスクの高いNG表現、適切な返信テンプレートを、実例とともに詳しく解説します。
          </p>
          <div style={{
            backgroundColor: '#E8F5E9',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid #2E7D32',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              lineHeight: '1.8',
              margin: 0,
            }}>
              <strong>🏢 このカテゴリの使い方：</strong>
              業種によって、口コミの特徴やクレームのパターンは大きく異なります。ご自身の業種に合った記事を参照し、業界特有のポイントを押さえた対応を実践してください。
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
                href={`/industry-specific/${article.slug}`}
                tags={article.frontmatter.tags}
                tagColor="#2E7D32"
                tagBgColor="#E8F5E9"
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                linkColor="#2E7D32"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
