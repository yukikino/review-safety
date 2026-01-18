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
          name: article.frontmatter.title,
          description: article.frontmatter.description,
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            ブリッジコンテンツ｜リピーター獲得・売上向上ガイド
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            口コミ対応をきっかけに、リピーター獲得や売上向上につなげるための実践ガイドです。ポイントカード、アップセル、来店促進施策など、顧客ロイヤリティを高める具体的な方法を解説します。
          </p>
          <div className="bg-yellow-50 p-4 md:p-6 rounded-lg border-l-4 border-yellow-700">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>💰 このカテゴリの使い方：</strong>
              口コミ対応は「守り」だけでなく、「攻め」の施策にもつながります。各記事では、顧客との関係構築から売上向上までの具体的な施策を紹介しています。
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
