#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sizeOf from 'image-size';
import type { ProductArticleFrontmatter } from '@/lib/markdown';
import { validateProductLinks } from '@/lib/products';

interface ValidationError {
  type: 'error' | 'warning';
  file: string;
  message: string;
}

const errors: ValidationError[] = [];
const contentDir = path.join(process.cwd(), 'content', 'product');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'products');

// 必須フィールド定義
const requiredFields: (keyof ProductArticleFrontmatter)[] = [
  'title',
  'description',
  'date',
  'author',
  'category',
  'tags',
  'productId',
  'name',
  'image',
  'price_monthly',
  'price_annual',
  'refund_days',
  'affiliate_url',
  'source_url',
  'japan_ui',
  'japan_payment',
  'japan_support',
  'japan_docs',
];

// 型チェック用のヘルパー
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidDate(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

// 記事ファイルの取得
function getProductArticleFiles(): string[] {
  if (!fs.existsSync(contentDir)) {
    console.error(`❌ ディレクトリが存在しません: ${contentDir}`);
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(contentDir, file));
}

// 単一記事のバリデーション
function validateArticle(filePath: string): void {
  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.md$/, '');

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    // 1. 必須フィールドチェック
    for (const field of requiredFields) {
      if (!(field in frontmatter)) {
        errors.push({
          type: 'error',
          file: fileName,
          message: `必須フィールド「${field}」が存在しません`,
        });
      }
    }

    // 2. 型チェック
    if (frontmatter.category !== 'product') {
      errors.push({
        type: 'error',
        file: fileName,
        message: `categoryは「product」である必要があります (現在: ${frontmatter.category})`,
      });
    }

    if (typeof frontmatter.price_monthly !== 'number') {
      errors.push({
        type: 'error',
        file: fileName,
        message: `price_monthlyは数値である必要があります`,
      });
    }

    if (typeof frontmatter.price_annual !== 'number') {
      errors.push({
        type: 'error',
        file: fileName,
        message: `price_annualは数値である必要があります`,
      });
    }

    if (typeof frontmatter.refund_days !== 'number') {
      errors.push({
        type: 'error',
        file: fileName,
        message: `refund_daysは数値である必要があります`,
      });
    }

    // 3. 日付フォーマットチェック
    if (frontmatter.date && !isValidDate(frontmatter.date)) {
      errors.push({
        type: 'error',
        file: fileName,
        message: `dateのフォーマットが不正です (YYYY-MM-DD形式が必要)`,
      });
    }

    // 4. URLバリデーション
    if (frontmatter.affiliate_url && !isValidUrl(frontmatter.affiliate_url)) {
      errors.push({
        type: 'error',
        file: fileName,
        message: `affiliate_urlが不正なURLです`,
      });
    }

    if (frontmatter.source_url && !isValidUrl(frontmatter.source_url)) {
      errors.push({
        type: 'error',
        file: fileName,
        message: `source_urlが不正なURLです`,
      });
    }

    // 5. 画像ファイル存在チェック
    if (frontmatter.image) {
      const imagePath = path.join(imagesDir, frontmatter.image);
      if (!fs.existsSync(imagePath)) {
        errors.push({
          type: 'error',
          file: fileName,
          message: `画像ファイルが存在しません: ${frontmatter.image}`,
        });
      } else {
        // 画像サイズチェック（警告）
        try {
          const stats = fs.statSync(imagePath);
          const fileSizeKB = stats.size / 1024;

          if (fileSizeKB > 200) {
            errors.push({
              type: 'warning',
              file: fileName,
              message: `画像ファイルサイズが200KBを超えています (${Math.round(fileSizeKB)}KB)`,
            });
          }

          // 画像ディメンションチェック（警告）
          const imageBuffer = fs.readFileSync(imagePath);
          const dimensions = sizeOf(imageBuffer);
          if (dimensions.width !== 800 || dimensions.height !== 600) {
            errors.push({
              type: 'warning',
              file: fileName,
              message: `画像サイズが推奨サイズと異なります (推奨: 800×600px, 実際: ${dimensions.width}×${dimensions.height}px)`,
            });
          }
        } catch (err) {
          errors.push({
            type: 'warning',
            file: fileName,
            message: `画像ファイルのメタデータ取得に失敗しました`,
          });
        }
      }
    }

    // 6. 商品IDチェック（slugとproductIdの一致）
    if (frontmatter.productId !== slug) {
      errors.push({
        type: 'warning',
        file: fileName,
        message: `ファイル名「${slug}.md」とproductId「${frontmatter.productId}」が一致しません`,
      });
    }

    // 7. 記事本文の文字数チェック（警告）
    const contentLength = content.trim().length;
    if (contentLength < 500) {
      errors.push({
        type: 'warning',
        file: fileName,
        message: `記事本文が短すぎます (${contentLength}文字。推奨: 500文字以上)`,
      });
    }

    // 8. タグの存在チェック（警告）
    if (!frontmatter.tags || !Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
      errors.push({
        type: 'warning',
        file: fileName,
        message: `タグが設定されていません`,
      });
    }

    // 9. レビュー記事リンクの存在チェック（警告）
    if (frontmatter.review_slug) {
      const reviewPath = path.join(
        process.cwd(),
        'content',
        'review',
        `${frontmatter.review_slug}.md`
      );
      if (!fs.existsSync(reviewPath)) {
        errors.push({
          type: 'warning',
          file: fileName,
          message: `指定されたレビュー記事が存在しません: ${frontmatter.review_slug}`,
        });
      }
    }
  } catch (err) {
    errors.push({
      type: 'error',
      file: fileName,
      message: `ファイル読み込みエラー: ${err}`,
    });
  }
}

// products.jsonとの整合性チェック
function validateProductsJsonConsistency(articleFiles: string[]): void {
  const articleProductIds = articleFiles.map((filePath) => {
    const fileName = path.basename(filePath);
    return fileName.replace(/\.md$/, '');
  });

  const result = validateProductLinks(articleProductIds);

  // products.jsonに存在しない商品IDの記事
  if (result.missingInProductsJson.length > 0) {
    for (const id of result.missingInProductsJson) {
      errors.push({
        type: 'error',
        file: `${id}.md`,
        message: `data/products.jsonに商品ID「${id}」が存在しません`,
      });
    }
  }

  // 記事が存在しない商品（警告）
  if (result.unusedInProductsJson.length > 0) {
    for (const id of result.unusedInProductsJson) {
      errors.push({
        type: 'warning',
        file: 'products.json',
        message: `商品ID「${id}」の記事が存在しません (content/product/${id}.md)`,
      });
    }
  }
}

// メイン実行
function main(): void {
  console.log('🔍 商品記事のバリデーションを開始します...\n');

  const articleFiles = getProductArticleFiles();

  if (articleFiles.length === 0) {
    console.log('⚠️  商品記事が見つかりませんでした\n');
    return;
  }

  console.log(`📄 ${articleFiles.length}件の記事を検証中...\n`);

  // 各記事のバリデーション
  for (const filePath of articleFiles) {
    validateArticle(filePath);
  }

  // products.jsonとの整合性チェック
  validateProductsJsonConsistency(articleFiles);

  // 結果表示
  const errorCount = errors.filter((e) => e.type === 'error').length;
  const warningCount = errors.filter((e) => e.type === 'warning').length;

  if (errors.length === 0) {
    console.log('✅ バリデーション成功: 問題は見つかりませんでした\n');
    process.exit(0);
  }

  // エラー表示
  const errorMessages = errors.filter((e) => e.type === 'error');
  if (errorMessages.length > 0) {
    console.log(`❌ エラー (${errorCount}件):\n`);
    for (const err of errorMessages) {
      console.log(`  [${err.file}] ${err.message}`);
    }
    console.log('');
  }

  // 警告表示
  const warningMessages = errors.filter((e) => e.type === 'warning');
  if (warningMessages.length > 0) {
    console.log(`⚠️  警告 (${warningCount}件):\n`);
    for (const warn of warningMessages) {
      console.log(`  [${warn.file}] ${warn.message}`);
    }
    console.log('');
  }

  // サマリー
  console.log('📊 バリデーション結果:');
  console.log(`  - 検証記事数: ${articleFiles.length}`);
  console.log(`  - エラー: ${errorCount}件`);
  console.log(`  - 警告: ${warningCount}件\n`);

  if (errorCount > 0) {
    console.log('💡 エラーを修正してから再度実行してください\n');
    process.exit(1);
  } else {
    console.log('✅ エラーはありません（警告のみ）\n');
    process.exit(0);
  }
}

main();
