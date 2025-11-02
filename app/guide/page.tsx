import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllArticles } from '@/lib/markdown';
import { Breadcrumb } from '@/components/breadcrumb';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibarai-guide.com';

export const metadata: Metadata = {
  title: '実務ガイド一覧',
  description: '未入金・支払い催促に関する実務ガイド記事の一覧ページ。催促メールのテンプレートから内容証明、法的手続きまで、段階別の対応方法を解説した記事を掲載しています。',
  alternates: {
    canonical: `${siteUrl}/guide`,
  },
  openGraph: {
    title: '実務ガイド一覧 | 未入金・支払い催促実務ガイド',
    description: '未入金・支払い催促に関する実務ガイド記事の一覧ページ。催促メールのテンプレートから内容証明、法的手続きまで、段階別の対応方法を解説した記事を掲載しています。',
    url: `${siteUrl}/guide`,
  },
};

export default async function GuidePage() {
  const articles = await getAllArticles('guide');

  // カテゴリ別に分類
  const categorizedArticles = {
    'mild-reminder': articles.filter((a) => a.frontmatter.category === 'mild-reminder'),
    'final-warning': articles.filter((a) => a.frontmatter.category === 'final-warning'),
    'about-process': articles.filter((a) => a.frontmatter.category === 'about-process'),
  };

  const categoryLabels: Record<string, string> = {
    'mild-reminder': '初期の催促・確認',
    'final-warning': '最終警告・法的手段',
    'about-process': '手続きについて',
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[
            { name: 'ホーム', url: '/' },
            { name: '実務ガイド一覧', url: '/guide' },
          ]}
        />

        <div className="mt-8 mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            実務ガイド一覧
          </h1>
          <p className="text-lg" style={{ color: 'var(--foreground-muted)' }}>
            未入金・支払い催促に関する実務的な対応方法を段階別に解説しています。
          </p>
        </div>

        {/* カテゴリ別記事一覧 */}
        {Object.entries(categorizedArticles).map(([category, categoryArticles]) => {
          if (categoryArticles.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: 'var(--gray-900)', borderColor: 'var(--primary-blue)' }}>
                {categoryLabels[category] || category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/guide/${article.slug}`}
                    className="group block p-6 rounded-lg border transition-all hover:shadow-lg"
                    style={{ borderColor: 'var(--gray-200)', backgroundColor: 'var(--background-secondary)' }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.frontmatter.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge-primary text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold mb-2 group-hover:underline" style={{ color: 'var(--gray-900)' }}>
                      {article.frontmatter.title}
                    </h3>

                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>

                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--foreground-muted)' }}>
                      <span>{article.frontmatter.date}</span>
                      <span className="text-blue-600 group-hover:underline">
                        続きを読む →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* 全記事がない場合 */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--foreground-muted)' }}>
              記事はまだありません。
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
