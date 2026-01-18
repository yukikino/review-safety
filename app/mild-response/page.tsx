import { getAllArticles } from '@/lib/markdown';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/breadcrumb';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { ArticleCard } from '@/components/article-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  title: '【コピペOK】軽度クレーム返信テンプレート19選｜待たされた・態度が悪い対応例',
  description: '「待たされた」「態度が悪い」など軽度クレームへの返信テンプレート19選。Googleマップ・食べログの★1レビュー対応マニュアル。飲食店・美容室向けの実践的な口コミ対応ガイド。コピペですぐ使える例文付き。',
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            軽度クレーム対応｜返信テンプレート集
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            「待たされた」「態度が悪い」「清潔感がない」など、軽度クレームへの返信テンプレートと対応マニュアルをまとめました。Googleマップや食べログでの★1〜2レビューに対する適切な返信方法を、実例とともに解説します。
          </p>
          <div className="bg-gray-50 p-4 md:p-6 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>💡 このカテゴリの使い方：</strong>
              軽度クレームは適切に対応すれば、顧客満足度の向上につながります。各記事では、クレームの種類別に返信テンプレート、NG表現、改善策を詳しく解説しています。
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
