# Stage 4: SEOリント + 記事システム

**Goal**: Markdown記事をテンプレートから作成し、CIでSEO品質を保証
**Status**: ✅ Completed
**Started**: 2025-10-29
**Completed**: 2025-10-29
**Prerequisites**: ✅ Stage 1, 2, 3 完了

---

## Success Criteria

- [x] 記事テンプレート（review.md, howto.md）が存在
- [x] Markdown → HTML 変換が動作（remark/rehype）
- [x] SEOリントが14項目をチェック
- [x] PR時に自動チェック実行
- [x] FAQ の JSON-LD が生成される
- [x] サイトマップが自動生成される

---

## チェックリスト形式タスク

### 記事テンプレート作成

- [x] `templates/review.md` 作成
- [x] `templates/howto.md` 作成
- [x] Frontmatter スキーマ定義

### Markdown処理パイプライン

- [x] `lib/markdown.ts` 実装
- [x] remark/rehype プラグイン設定
- [x] MDX コンポーネント作成

### SEOリントスクリプト

- [x] `scripts/seo-lint.js` 作成
- [x] 14項目のチェックロジック実装
  - [x] タイトル 30-60文字
  - [x] description 120-160文字
  - [x] H1が1つ
  - [x] H2が3つ以上
  - [x] 見出し階層チェック
  - [x] 本文1500文字以上
  - [x] 必須セクション（返金・解約・FAQ・比較）
  - [x] 内部リンク3つ以上
  - [x] 外部リンク2つ以上
  - [x] リンク切れチェック
  - [x] 画像alt属性
  - [x] 画像形式チェック
  - [x] JSON-LD存在確認
  - [x] FAQスキーマ確認

### CI/CD設定

- [x] `.github/workflows/seo-check.yml` 作成
- [x] PRテンプレート作成
- [x] Lighthouse CI 設定

### 構造化データ

- [x] `components/faq-schema.tsx` 作成
- [x] `components/article-schema.tsx` 作成
- [x] 自動JSON-LD生成

### サイトマップ

- [x] `next-sitemap.config.cjs` 作成（IMPLEMENTATION_PLAN.md参照）
- [x] `package.json` に postbuild スクリプト追加
  ```json
  {
    "scripts": {
      "postbuild": "next-sitemap"
    }
  }
  ```
  **注意**: Stage 1では追加せず、このStageで初めて追加
- [x] robots.txt 生成設定

### 記事ページ実装

- [x] `app/review/[slug]/page.tsx` 作成
- [x] `generateStaticParams` 実装
- [x] メタデータ自動生成
- [x] 動的ルート設定

### テスト記事作成

- [x] `content/review/sample-vpn.md` 作成
- [x] テンプレート適用確認
- [x] SEOリント合格確認

---

## 詳細手順

各タスクの詳細は [IMPLEMENTATION_PLAN.md Stage 4](../IMPLEMENTATION_PLAN.md#stage-4-seoリント--記事システム) を参照

---

## Tests

- [x] `npm run seo-lint` 全記事チェック成功
- [x] `npm run build` サイトマップ生成確認
- [x] `npm run test:seo` SEOリントのユニットテスト成功
  ```json
  {
    "scripts": {
      "test:seo": "node scripts/seo-lint.js"
    }
  }
  ```
- [x] Lighthouse CI でスコア90点以上
- [x] PR作成時にCI自動実行確認

---

## Completion Checklist

- [x] すべてのSuccess Criteriaを満たした
- [x] テスト全て合格
- [x] README.mdの進捗を更新
- [x] このファイルの Status を「✅ Completed」に更新

**Status**: ⬜ Not Started → 🔄 In Progress → ✅ Completed
**Completed Date**: YYYY-MM-DD
