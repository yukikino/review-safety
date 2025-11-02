import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

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

    // Convert Markdown to HTML with GFM support (tables, strikethrough, etc.)
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);
    const htmlContent = processedContent.toString();

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
  const faqRegex = /###\s*Q\d+:\s*(.+?)\n\nA\d+:\s*([\s\S]+?)(?=\n\n###|$)/g;
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
