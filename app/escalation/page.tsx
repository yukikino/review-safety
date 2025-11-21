import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: 'エスカレーション管理｜炎上・法的対応ガイド | Review Safety',
  description: '誹謗中傷、名誉毀損、炎上レビューへの対応マニュアル。弁護士相談、削除申請、損害賠償請求の判断基準と手順を解説。悪質クレームからビジネスを守る実践ガイド。',
  keywords: ['エスカレーション', '炎上対応', '誹謗中傷', '名誉毀損', '弁護士', '削除申請', '損害賠償'],
  alternates: {
    canonical: `${siteUrl}/escalation`,
  },
  openGraph: {
    title: 'エスカレーション管理｜炎上・法的対応ガイド',
    description: '誹謗中傷、名誉毀損、炎上レビューへの対応マニュアル。弁護士相談、削除申請、損害賠償請求の判断基準と手順を解説。',
    url: `${siteUrl}/escalation`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function EscalationPage() {
  const articles = await getAllArticles('escalation');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: 'エスカレーション管理', url: '/escalation' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'エスカレーション管理｜炎上・法的対応ガイド',
    description: '誹謗中傷、名誉毀損、炎上レビューへの対応マニュアル',
    url: `${siteUrl}/escalation`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.title,
          description: article.description,
          url: `${siteUrl}/escalation/${article.slug}`,
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
            エスカレーション管理｜炎上・法的対応ガイド
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--gray-700)',
            lineHeight: '1.8',
            marginBottom: '1.5rem',
          }}>
            誹謗中傷、名誉毀損、炎上レビューなど、深刻なクレームへの対応マニュアルです。弁護士相談のタイミング、削除申請の手順、損害賠償請求の判断基準を、実例とともに詳しく解説します。
          </p>
          <div style={{
            backgroundColor: '#FFF3E0',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid #E65100',
          }}>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--gray-700)',
              lineHeight: '1.8',
              margin: 0,
            }}>
              <strong>⚠️ このカテゴリの使い方：</strong>
              悪質なレビューや炎上リスクのある案件は、初動対応が重要です。各記事では、法的対応の判断基準、弁護士相談のタイミング、プラットフォームへの削除申請方法を解説しています。
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
                href={`/escalation/${article.slug}`}
                tags={article.frontmatter.tags}
                tagColor="#E65100"
                tagBgColor="#FFF3E0"
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                linkColor="#E65100"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
