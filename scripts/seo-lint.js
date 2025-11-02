import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = 'content';
const errors = [];
const warnings = [];

// SEO チェック項目（債権回収ガイドサイト向け）
const SEO_RULES = {
  TITLE_LENGTH: { min: 20, max: 65 },
  DESCRIPTION_LENGTH: { min: 80, max: 160 },
  CONTENT_MIN_LENGTH: 1500,
  MIN_H2_COUNT: 3,
  MIN_INTERNAL_LINKS: 2,
  MIN_EXTERNAL_LINKS: 0, // アフィリエイトサイトのため外部リンクは任意
  RECOMMENDED_SECTIONS: ['FAQ', 'よくある質問'], // 推奨セクション（エラーではなく警告）
};

function checkArticle(filePath, category) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdown } = matter(content);
  const fileName = path.basename(filePath);

  console.log(`\nChecking: ${category}/${fileName}`);

  let issueCount = 0;

  // 1. タイトル長チェック
  if (frontmatter.title) {
    const titleLength = frontmatter.title.length;
    if (
      titleLength < SEO_RULES.TITLE_LENGTH.min ||
      titleLength > SEO_RULES.TITLE_LENGTH.max
    ) {
      errors.push(
        `❌ [${fileName}] タイトルは${SEO_RULES.TITLE_LENGTH.min}-${SEO_RULES.TITLE_LENGTH.max}文字にしてください (現在: ${titleLength}文字)`
      );
      issueCount++;
    }
  } else {
    errors.push(`❌ [${fileName}] タイトルが設定されていません`);
    issueCount++;
  }

  // 2. ディスクリプション長チェック
  if (frontmatter.description) {
    const descLength = frontmatter.description.length;
    if (
      descLength < SEO_RULES.DESCRIPTION_LENGTH.min ||
      descLength > SEO_RULES.DESCRIPTION_LENGTH.max
    ) {
      errors.push(
        `❌ [${fileName}] descriptionは${SEO_RULES.DESCRIPTION_LENGTH.min}-${SEO_RULES.DESCRIPTION_LENGTH.max}文字にしてください (現在: ${descLength}文字)`
      );
      issueCount++;
    }
  } else {
    errors.push(`❌ [${fileName}] descriptionが設定されていません`);
    issueCount++;
  }

  // 3. H1チェック（記事テンプレートで自動生成されるためMarkdownには不要）
  const h1Matches = markdown.match(/^#\s+.+$/gm);
  const h1Count = h1Matches ? h1Matches.length : 0;
  if (h1Count > 0) {
    warnings.push(`⚠️  [${fileName}] Markdown内にH1があります。記事テンプレートで自動生成されるため削除推奨 (現在: ${h1Count}個)`);
  }

  // 4. H2チェック（3つ以上）
  const h2Matches = markdown.match(/^##\s+.+$/gm);
  const h2Count = h2Matches ? h2Matches.length : 0;
  if (h2Count < SEO_RULES.MIN_H2_COUNT) {
    warnings.push(
      `⚠️  [${fileName}] H2は${SEO_RULES.MIN_H2_COUNT}つ以上推奨です (現在: ${h2Count}個)`
    );
  }

  // 5. 見出し階層チェック
  const headings = markdown.match(/^#{1,6}\s+.+$/gm) || [];
  let prevLevel = 0;
  for (const heading of headings) {
    const level = heading.match(/^#+/)[0].length;
    if (level - prevLevel > 1) {
      warnings.push(
        `⚠️  [${fileName}] 見出し階層が飛んでいます: ${heading.trim()}`
      );
    }
    prevLevel = level;
  }

  // 6. 本文文字数チェック
  const contentLength = markdown.replace(/^---[\s\S]*?---/, '').trim().length;
  if (contentLength < SEO_RULES.CONTENT_MIN_LENGTH) {
    errors.push(
      `❌ [${fileName}] 本文は${SEO_RULES.CONTENT_MIN_LENGTH}文字以上必要です (現在: ${contentLength}文字)`
    );
    issueCount++;
  }

  // 7. 推奨セクションチェック（警告のみ）
  const hasFAQ = SEO_RULES.RECOMMENDED_SECTIONS.some(section => markdown.includes(section));
  if (!hasFAQ) {
    warnings.push(`⚠️  [${fileName}] FAQセクションの追加を推奨します`);
  }

  // 8. 内部リンクチェック
  const internalLinks = markdown.match(/\[.+?\]\(\/[^)]+\)/g) || [];
  if (internalLinks.length < SEO_RULES.MIN_INTERNAL_LINKS) {
    warnings.push(
      `⚠️  [${fileName}] 内部リンクは${SEO_RULES.MIN_INTERNAL_LINKS}つ以上推奨です (現在: ${internalLinks.length}個)`
    );
  }

  // 9. 外部リンクチェック（外部リンク要件なし）
  // アフィリエイトサイトのため、外部リンクは任意

  // 10. 画像alt属性チェック
  const imagesWithoutAlt = markdown.match(/!\[\]\([^)]+\)/g) || [];
  if (imagesWithoutAlt.length > 0) {
    errors.push(
      `❌ [${fileName}] 画像にalt属性がありません (${imagesWithoutAlt.length}個)`
    );
    issueCount++;
  }

  // 11. 画像形式チェック
  const images = markdown.match(/!\[.+?\]\(([^)]+)\)/g) || [];
  for (const img of images) {
    const match = img.match(/!\[.+?\]\(([^)]+)\)/);
    if (match) {
      const imgPath = match[1];
      if (!/\.(webp|avif|png|jpg|jpeg)$/i.test(imgPath)) {
        warnings.push(
          `⚠️  [${fileName}] 推奨画像形式ではありません: ${imgPath}`
        );
      }
    }
  }

  // 12-13. FAQチェック（既に7.で実施済みのため削除）

  // 14. アフィリエイトリンクrel属性チェック
  const affiliateLinksWithoutRel =
    markdown.match(/\[.+?\]\(https?:\/\/[^)]+\)(?!\{rel=)/g) || [];
  if (
    frontmatter.affiliateUrl &&
    affiliateLinksWithoutRel.some((link) =>
      link.includes(frontmatter.affiliateUrl)
    )
  ) {
    errors.push(`❌ [${fileName}] アフィリエイトリンクにrel属性がありません`);
    issueCount++;
  }

  if (issueCount === 0 && warnings.length === 0) {
    console.log('  ✅ 全てのSEOチェックに合格しました');
  }

  return issueCount;
}

function main() {
  console.log('🔍 SEO Lint 開始\n');

  if (!fs.existsSync(contentDir)) {
    console.error(`❌ ${contentDir} ディレクトリが存在しません`);
    process.exit(1);
  }

  const categories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (categories.length === 0) {
    console.warn(`⚠️  ${contentDir} ディレクトリ内に記事カテゴリがありません`);
    process.exit(0);
  }

  let totalIssues = 0;

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      totalIssues += checkArticle(filePath, category);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SEO Lint 結果\n');

  if (errors.length > 0) {
    console.log('❌ エラー:\n');
    errors.forEach((err) => console.log(err));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  警告:\n');
    warnings.forEach((warn) => console.log(warn));
    console.log('');
  }

  console.log(`エラー: ${errors.length}件`);
  console.log(`警告: ${warnings.length}件`);
  console.log('='.repeat(60));

  if (totalIssues > 0) {
    console.log(
      '\n❌ SEO Lintに失敗しました。上記のエラーを修正してください。'
    );
    process.exit(1);
  } else {
    console.log('\n✅ 全ての記事がSEOチェックに合格しました！');
    process.exit(0);
  }
}

main();
