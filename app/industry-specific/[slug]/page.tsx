import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from '@/lib/markdown';
import { ArticleSchema } from '@/components/article-schema';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { Breadcrumb } from '@/components/breadcrumb';
import { CTAMeoTool } from '@/components/cta-meo-tool';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SidebarCTA } from '@/components/sidebar-cta';
import { ArticleViewTracker } from '@/components/analytics/ArticleViewTracker';
import { ScrollProgress } from '@/components/scroll-progress';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('industry-specific');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug('industry-specific', slug);

  if (!article) {
    return {};
  }

  const { frontmatter } = article;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';
  const articleUrl = `${siteUrl}/industry-specific/${slug}`;
  const ogImage = `${siteUrl}/og-default.png`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    authors: [{ name: frontmatter.author }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
  };
}

export default async function IndustrySpecificPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug('industry-specific', slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, htmlContent } = article;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';
  const articleUrl = `${siteUrl}/industry-specific/${slug}`;

  // 関連記事の取得（タグベース）
  const relatedArticles = await getRelatedArticles(
    'industry-specific',
    slug,
    frontmatter.tags,
    3
  );

  return (
    <>
      <ArticleViewTracker
        articleSlug={slug}
        articleTitle={frontmatter.title}
        articleCategory={frontmatter.category}
      />
      <BreadcrumbSchema
        items={[
          { name: 'ホーム', url: '/' },
          { name: '業種別対応', url: '/industry-specific' },
          { name: frontmatter.title, url: `/industry-specific/${slug}` },
        ]}
      />
      <ArticleSchema
        title={frontmatter.title}
        description={frontmatter.description}
        author={frontmatter.author}
        datePublished={frontmatter.date}
        url={articleUrl}
      />

      <ScrollProgress />

      <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--background-secondary)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl overflow-x-hidden">
          <Breadcrumb
            items={[
              { name: 'ホーム', url: '/' },
              { name: '業種別対応', url: '/industry-specific' },
              { name: frontmatter.title, url: `/industry-specific/${slug}` },
            ]}
          />
          <div className="grid lg:grid-cols-[1fr_280px] gap-6 md:gap-8 overflow-x-hidden">
            {/* メインコンテンツ */}
            <article className="min-w-0 overflow-x-hidden">
              <header className="mb-6 md:mb-8 card p-4 md:p-6 lg:p-8 animate-fadeInUp">
                <div className="flex gap-2 flex-wrap mb-4 md:mb-6">
                  {frontmatter.tags?.map((tag) => (
                    <span key={tag} className="badge-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight"
                  style={{ color: 'var(--gray-900)' }}
                >
                  {frontmatter.title}
                </h1>
                <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm" style={{ color: 'var(--foreground-muted)' }}>
                  <time dateTime={frontmatter.date} className="flex items-center gap-2">
                    <span>📅</span>
                    {new Date(frontmatter.date).toLocaleDateString('ja-JP')}
                  </time>
                  <span className="flex items-center gap-2">
                    <span>✍️</span>
                    {frontmatter.author}
                  </span>
                </div>
              </header>

              <div className="card p-4 md:p-8 lg:p-12 mb-6 md:mb-8 animate-fadeInUp">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>

              {/* CTA表示 */}
              <div className="animate-fadeInUp">
                <CTAMeoTool />
              </div>
            </article>

            {/* サイドバー */}
            <aside className="hidden lg:block space-y-6">
              {/* ナビゲーション（固定） */}
              <div className="card p-6 sticky top-6">
                <h3 className="font-bold mb-4 text-sm" style={{ color: 'var(--gray-900)' }}>
                  📖 ページ内ナビ
                </h3>
                <nav>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <ScrollToTop />
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="block px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
                        style={{ color: 'var(--foreground-muted)' }}
                      >
                        ← トップページ
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* アフィリエイトCTA */}
              <SidebarCTA />

              {/* 関連記事 */}
              {relatedArticles.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: 'var(--gray-900)' }}>
                    📚 関連記事
                  </h3>
                  <div className="space-y-3">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/industry-specific/${related.slug}`}
                        className="block p-3 rounded-lg transition-colors hover:bg-gray-50 border border-gray-200"
                      >
                        <p className="text-xs font-semibold mb-1 line-clamp-2" style={{ color: 'var(--gray-900)' }}>
                          {related.frontmatter.title}
                        </p>
                        <p className="text-xs line-clamp-2" style={{ color: 'var(--foreground-muted)' }}>
                          {related.frontmatter.description.slice(0, 50)}...
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
