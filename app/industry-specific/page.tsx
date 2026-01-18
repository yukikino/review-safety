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

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <section className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            業種別対応｜飲食店・美容室・ホテル向けガイド
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            飲食店、美容室、ホテル、病院など、業種別の口コミ対応マニュアルです。各業界特有のクレームパターン、炎上リスクの高いNG表現、適切な返信テンプレートを、実例とともに詳しく解説します。
          </p>
          <div className="bg-green-50 p-4 md:p-6 rounded-lg border-l-4 border-green-700">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed m-0">
              <strong>🏢 このカテゴリの使い方：</strong>
              業種によって、口コミの特徴やクレームのパターンは大きく異なります。ご自身の業種に合った記事を参照し、業界特有のポイントを押さえた対応を実践してください。
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
