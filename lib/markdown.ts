import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkInternalLinks from './remark-internal-links';

export interface HowToStep {
  name: string;
  text: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  productId?: string;
  affiliateUrl?: string;
  cta?: 'soft' | 'hard' | 'mixed';
  howto?: {
    name: string;
    description: string;
    totalTime?: string;
    steps: HowToStep[];
  };
}

export interface ProductArticleFrontmatter {
  // 記事メタデータ
  title: string;
  description: string;
  date: string;
  author: string;
  category: 'product';
  tags: string[];

  // 商品データ
  productId: string;
  name: string;
  image: string;
  price_monthly: number;
  price_annual: number;
  refund_days: number;
  affiliate_url: string;
  source_url: string;

  // 日本対応
  japan_ui: boolean;
  japan_payment: boolean;
  japan_support: boolean;
  japan_docs: boolean;

  // 関連記事
  review_slug?: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  htmlContent: string;
}

export interface ProductArticle {
  slug: string;
  frontmatter: ProductArticleFrontmatter;
  content: string;
  htmlContent: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

/**
 * Get all article slugs from a specific category directory
 */
export function getArticleSlugs(category: string): string[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

/**
 * Get article by category and slug
 */
export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  try {
    const filePath = path.join(contentDirectory, category, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert Markdown to HTML with GFM support and auto internal links
    const currentUrl = `/${category}/${slug}`;
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkInternalLinks, { currentUrl, maxLinks: 5 })
      .use(remarkHtml)
      .process(content);
    // Add lazy loading and async decoding to images
    const htmlContent = processedContent
      .toString()
      .replace(/<img /g, '<img loading="lazy" decoding="async" ');

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading article ${category}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all articles from a specific category
 */
export async function getAllArticles(category: string): Promise<Article[]> {
  const slugs = getArticleSlugs(category);
  const articles = await Promise.all(
    slugs.map((slug) => getArticleBySlug(category, slug))
  );

  return articles
    .filter((article): article is Article => article !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

/**
 * Extract FAQ items from markdown content
 */
export function extractFAQs(content: string): Array<{
  question: string;
  answer: string;
}> {
  const faqRegex = /###\s*Q\d+[：:]\s*(.+?)\n\n\*\*A\*\*[：:]?\s*([\s\S]+?)(?=\n\n###|\n\n---|$)/g;
  const faqs: Array<{ question: string; answer: string }> = [];

  let match;
  while ((match = faqRegex.exec(content)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }

  return faqs;
}

/**
 * Strip FAQ section from HTML content to avoid duplication with FAQAccordion
 */
export function stripFAQSection(htmlContent: string): string {
  // Remove the FAQ section (h2 "よくある質問" and everything until the next h2 or end)
  return htmlContent.replace(
    /<h2[^>]*>よくある質問<\/h2>[\s\S]*?(?=<h2[^>]*>|$)/,
    ''
  );
}

/**
 * Get product article by slug
 */
export async function getProductArticleBySlug(
  slug: string
): Promise<ProductArticle | null> {
  const article = await getArticleBySlug('product', slug);
  if (!article) return null;
  return article as ProductArticle;
}

/**
 * Get related articles based on tags and category
 */
export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  currentTags: string[],
  limit: number = 3
): Promise<Article[]> {
  const allArticles = await getAllArticles(category);

  // 現在の記事を除外
  const otherArticles = allArticles.filter(article => article.slug !== currentSlug);

  // タグの一致数でスコアリング
  const scoredArticles = otherArticles.map(article => {
    const matchingTags = article.frontmatter.tags.filter(tag =>
      currentTags.includes(tag)
    );
    return {
      article,
      score: matchingTags.length,
    };
  });

  // スコア順にソート、スコアが同じ場合は日付順
  scoredArticles.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.article.frontmatter.date).getTime() -
           new Date(a.article.frontmatter.date).getTime();
  });

  return scoredArticles.slice(0, limit).map(item => item.article);
}

/**
 * Get related articles across all categories based on tags
 */
export async function getCrossCategoryRelatedArticles(
  currentCategory: string,
  currentSlug: string,
  currentTags: string[],
  limit: number = 3
): Promise<(Article & { category: string })[]> {
  const categories = ['playbook', 'mild-response', 'escalation', 'industry-specific', 'platform-specific', 'bridge'];

  const allArticles: (Article & { category: string })[] = [];

  for (const category of categories) {
    const articles = await getAllArticles(category);
    for (const article of articles) {
      // 現在の記事を除外
      if (category === currentCategory && article.slug === currentSlug) continue;
      allArticles.push({ ...article, category });
    }
  }

  // タグの一致数でスコアリング（異なるカテゴリにボーナス）
  const scoredArticles = allArticles.map(article => {
    const matchingTags = article.frontmatter.tags.filter(tag =>
      currentTags.includes(tag)
    );
    // 異なるカテゴリからの記事にボーナス（カテゴリ間リンク促進）
    const crossCategoryBonus = article.category !== currentCategory ? 0.5 : 0;
    return {
      article,
      score: matchingTags.length + crossCategoryBonus,
    };
  });

  scoredArticles.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.article.frontmatter.date).getTime() -
           new Date(a.article.frontmatter.date).getTime();
  });

  return scoredArticles.slice(0, limit).map(item => item.article);
}
