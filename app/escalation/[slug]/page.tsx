import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticleBySlug, getArticleSlugs, getRelatedArticles } from '@/lib/markdown';
import { ArticleSchema } from '@/components/article-schema';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { CTAReputation } from '@/components/cta-reputation';
import { ScrollToTop } from '@/components/scroll-to-top';
import { SidebarCTA } from '@/components/sidebar-cta';
import { ArticleViewTracker } from '@/components/analytics/ArticleViewTracker';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('escalation');
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug('escalation', slug);

  if (!article) {
    return {};
  }

  const { frontmatter } = article;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';
  const articleUrl = `${siteUrl}/escalation/${slug}`;
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

export default async function EscalationPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug('escalation', slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, htmlContent } = article;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';
  const articleUrl = `${siteUrl}/escalation/${slug}`;

  const relatedArticles = await getRelatedArticles(
    'escalation',
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
          { name: '強め案件対応', url: '/escalation' },
          { name: frontmatter.title, url: `/escalation/${slug}` },
        ]}
      />
      <ArticleSchema
        title={frontmatter.title}
        description={frontmatter.description}
        author={frontmatter.author}
        datePublished={frontmatter.date}
        url={articleUrl}
      />

      <div className="scroll-progress" id="scroll-progress" style={{ width: '0%' }}></div>

      <div className="min-h-screen" style={{ background: 'var(--background-secondary)' }}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8">
            <article>
              <header className="mb-8 card p-8 animate-fadeInUp">
                <div className="flex gap-2 flex-wrap mb-6">
                  {frontmatter.tags?.map((tag) => (
                    <span key={tag} className="badge-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                  style={{ color: 'var(--gray-900)' }}
                >
                  {frontmatter.title}
                </h1>
                <div className="flex gap-6 text-sm" style={{ color: 'var(--foreground-muted)' }}>
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

              <div className="card p-8 md:p-12 mb-8 animate-fadeInUp">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>

              <div className="animate-fadeInUp">
                <CTAReputation />
              </div>
            </article>

            <aside className="space-y-6">
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

              <SidebarCTA />

              {relatedArticles.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold mb-4 text-sm" style={{ color: 'var(--gray-900)' }}>
                    📚 関連記事
                  </h3>
                  <div className="space-y-3">
                    {relatedArticles.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/escalation/${related.slug}`}
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

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function updateScrollProgress() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                const progressBar = document.getElementById('scroll-progress');
                if (progressBar) {
                  progressBar.style.width = scrolled + '%';
                }
              }
              window.addEventListener('scroll', updateScrollProgress);
              updateScrollProgress();
            })();
          `,
        }}
      />
    </>
  );
}
