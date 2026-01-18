import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: '【弁護士監修】誹謗中傷・炎上レビュー対応マニュアル｜削除申請・法的措置の判断基準',
  description: '誹謗中傷、名誉毀損、炎上レビューへの対応マニュアル。弁護士相談のタイミング、削除申請手順、損害賠償請求の判断基準を解説。悪質クレームからビジネスを守る実践ガイド。',
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
          name: article.frontmatter.title,
          description: article.frontmatter.description,
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            エスカレーション管理｜炎上・法的対応ガイド
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            誹謗中傷、名誉毀損、炎上レビューなど、深刻なクレームへの対応マニュアルです。弁護士相談のタイミング、削除申請の手順、損害賠償請求の判断基準を、実例とともに詳しく解説します。
          </p>
          <div className="bg-orange-50 p-4 md:p-6 rounded-lg border-l-4 border-orange-700">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>⚠️ このカテゴリの使い方：</strong>
              悪質なレビューや炎上リスクのある案件は、初動対応が重要です。各記事では、法的対応の判断基準、弁護士相談のタイミング、プラットフォームへの削除申請方法を解説しています。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 border-b-2 border-blue-600 pb-2">
            記事一覧（全{articles.length}件）
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
