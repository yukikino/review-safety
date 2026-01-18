import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: '【完全版】Googleマップ口コミ管理・MEO対策マニュアル｜評価4.5→4.8に改善した実践手順',
  description: 'Googleマップ最適化、MEO対策、口コミ管理システム、スタッフ教育など、評判管理の実践ガイド。レビュー監視、返信フロー、評価改善の具体的な手順を5ステップで解説。',
  keywords: ['実践ガイド', 'MEO対策', '口コミ管理', 'Googleマップ', 'レビュー監視', 'スタッフ教育'],
  alternates: {
    canonical: `${siteUrl}/playbook`,
  },
  openGraph: {
    title: '実践ガイド｜口コミ管理・評価改善の総合マニュアル',
    description: 'Googleマップ最適化、MEO対策、口コミ管理システム、スタッフ教育など、評判管理の実践ガイド。',
    url: `${siteUrl}/playbook`,
    siteName: 'Review Safety',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default async function PlaybookPage() {
  const articles = await getAllArticles('playbook');

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '実践ガイド', url: '/playbook' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '実践ガイド｜口コミ管理・評価改善の総合マニュアル',
    description: '口コミ管理とMEO対策の実践的なガイド集',
    url: `${siteUrl}/playbook`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          name: article.frontmatter.title,
          description: article.frontmatter.description,
          url: `${siteUrl}/playbook/${article.slug}`,
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
            実践ガイド｜口コミ管理・評価改善の総合マニュアル
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            Googleマップ最適化、MEO対策、口コミ管理システム、スタッフ教育など、評判管理を体系的に実践するためのガイド集です。レビュー監視の仕組み作り、返信フローの構築、評価改善の具体的な手順を解説します。
          </p>
          <div className="bg-blue-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-700">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>📖 このカテゴリの使い方：</strong>
              個別のクレーム対応だけでなく、継続的な評判管理の仕組み作りが重要です。各記事では、具体的な手順とチェックリストを提供しています。
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
                href={`/playbook/${article.slug}`}
                tags={article.frontmatter.tags}
                tagColor="#1976D2"
                tagBgColor="#E3F2FD"
                title={article.frontmatter.title}
                description={article.frontmatter.description}
                linkColor="#1976D2"
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
