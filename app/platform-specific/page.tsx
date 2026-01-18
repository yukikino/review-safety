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
          name: article.frontmatter.title,
          description: article.frontmatter.description,
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            プラットフォーム別対応｜Google・Twitter・Instagram炎上対策
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Googleマップ、Twitter、Instagram、食べログなど、プラットフォームごとの口コミ・炎上対応マニュアルです。各プラットフォームの削除申請手順、報告方法、クライシス管理のベストプラクティスを詳しく解説します。
          </p>
          <div className="bg-pink-50 p-4 md:p-6 rounded-lg border-l-4 border-pink-700">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>🚨 このカテゴリの使い方：</strong>
              プラットフォームごとに、規約、削除申請の基準、対応時間の目安が異なります。対象プラットフォームの記事を参照し、適切な手順で対応してください。
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
