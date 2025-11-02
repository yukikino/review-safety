# Implementation Plan

**プロジェクト**: アフィリエイトサイト テンプレート
**開始日**: 2025-10-27
**アーキテクチャ**: [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 概要

このプランは CLAUDE.md のガイドラインに従い、5段階の漸進的実装を定義します。
各ステージは独立してテスト可能で、前のステージの成果物に依存します。

**原則**:

- ✅ 各ステージ完了時にコミット（コンパイル成功 + テスト合格）
- ✅ 1ステージ = 1つの明確な価値提供
- ⛔ 3回失敗したら立ち止まり、アプローチを見直す

---

## Stage 1: Next.js 基盤構築

**Goal**: デプロイ可能な最小限のNext.jsサイトを構築

**Success Criteria**:

- ✅ Next.js 15 (App Router) がローカルで起動
- ✅ Vercel にデプロイ成功
- ✅ TypeScript + ESLint + Prettier が動作
- ✅ Tailwind CSS でスタイリング可能
- ✅ 3ページ（Home, Compare, About）が表示される

**Tests**:

```bash
npm run build          # ビルド成功
npm run lint           # リント合格
npm run type-check     # 型チェック合格
curl localhost:3000    # ローカル起動確認
```

**Tasks**:

1. Next.js プロジェクト初期化

   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
   ```

2. 必要パッケージ追加

   ```bash
   # 本番依存
   npm install zod gray-matter next-mdx-remote
   npm install googleapis  # Stage 3で使用（サービスアカウント認証）
   npm install remark remark-html rehype rehype-stringify  # Stage 4で使用
   npm install next-sitemap next-seo  # Stage 4で使用

   # 開発依存
   npm install -D @types/node prettier eslint-config-prettier
   npm install -D @playwright/test  # Stage 2でE2Eテスト
   npm install -D markdownlint-cli  # Stage 4でSEOリント
   ```

3. package.json の設定

   ```json
   {
     "type": "module", // ES Modules を有効化（Stage 3のスクリプト用）
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start",
       "lint": "next lint",
       "type-check": "tsc --noEmit"
     }
   }
   ```

4. ディレクトリ構造作成

   ```
   app/
     page.tsx              # トップページ
     compare/page.tsx      # 比較ページ
     about/page.tsx        # Aboutページ
   components/
     header.tsx
     footer.tsx
   lib/
     utils.ts
   scripts/               # Stage 3で使用
   data/                  # Stage 2で使用
   ```

5. 基本レイアウト実装（ヘッダー・フッター）

6. Vercel デプロイ設定
   - GitHub リポジトリ連携
   - 環境変数設定（後のステージ用）

7. README.md 更新（セットアップ手順）

**Status**: Not Started

---

## Stage 2: データ駆動比較表

**Goal**: Googleシートから自動取得した商品データを表示

**Success Criteria**:

- ✅ `data/products.json` が存在し、Zodでバリデーション成功
- ✅ 比較ページで商品一覧が表示される
- ✅ 日本対応スコアでソート可能
- ✅ 価格・返金日数・最終確認日が表示される
- ✅ アフィリエイトリンクが機能する

**Tests**:

```bash
npm run validate-data     # Zodバリデーション
npm run test:e2e         # Playwright: 表が表示されるか
npm run build            # SSG成功
```

**Tasks**:

1. データスキーマ定義（Zod）

   ```typescript
   // lib/schema.ts
   export const ProductSchema = z.object({
     id: z.string(),
     name: z.string(),
     price_monthly: z.number().positive(),
     // ... (ARCHITECTURE.md参照)
   });
   ```

2. サンプルデータ作成

   ```json
   // data/products.json
   [
     {
       "id": "sample-vpn",
       "name": "Sample VPN",
       "price_monthly": 9.99
       // ...
     }
   ]
   ```

3. バリデーションスクリプト

   ```javascript
   // scripts/validate-data.js
   import { ProductSchema } from '../lib/schema';
   // ...
   ```

4. 比較表コンポーネント

   ```typescript
   // components/comparison-table.tsx
   export function ComparisonTable({ products }: { products: Product[] }) {
     // ソート機能、フィルタ機能
   }
   ```

5. 比較ページ実装

   ```typescript
   // app/compare/page.tsx
   import products from '@/data/products.json';
   ```

6. 日本対応スコア計算ロジック

   ```typescript
   // lib/utils.ts
   export function calculateJapanScore(product: Product): number {
     // ARCHITECTURE.md のロジック
   }
   ```

7. テスト追加
   ```typescript
   // tests/compare.spec.ts (Playwright)
   test('商品が表示される', async ({ page }) => {
     await page.goto('/compare');
     await expect(page.locator('table')).toBeVisible();
   });
   ```

**Status**: Not Started

---

## Stage 3: Googleシート自動同期

**Goal**: Googleシート編集が自動でGitHubにコミットされる

**Success Criteria**:

- ✅ Google Apps Script が動作（onEdit トリガー）
- ✅ GitHub Actions がシートデータを取得
- ✅ データが変更された場合のみコミット
- ✅ 6時間ごとのフォールバック同期
- ✅ Vercel が自動デプロイ

**Tests**:

```bash
# ローカルテスト
node scripts/fetch-sheet.js  # シート取得成功

# 手動テスト
# 1. Googleシートを編集
# 2. 5分待つ
# 3. GitHub でコミットを確認
# 4. Vercel でデプロイを確認
```

**Tasks**:

1. Google Cloud Platform セットアップ
   - プロジェクト作成
   - Sheets API 有効化
   - **サービスアカウント作成**（重要：非公開シート対応）
     - IAM > サービスアカウント > 作成
     - JSON キーをダウンロード
     - `spreadsheets.readonly` スコープ

2. Googleシート準備
   - テンプレートシート作成（`products` シート）
   - 列定義（ARCHITECTURE.md 参照：12列）
   - **サービスアカウントのメールアドレスに閲覧権限を付与**
     - 例: `my-service@project-id.iam.gserviceaccount.com`
     - 「共有」から上記メールに「閲覧者」権限

3. Apps Script 実装
   - Google Apps Script エディタを開く
   - ARCHITECTURE.md のコードを貼り付け
   - トリガー設定：
     - 「編集時」トリガーを `onEdit` に設定
     - スクリプトプロパティに `GITHUB_TOKEN` を設定
       - Fine-grained PAT（`contents: write`）

4. データ取得スクリプト作成

   ```bash
   # scripts/fetch-sheet.js を作成
   # ARCHITECTURE.md の完全なコードを使用
   ```

   - サービスアカウントJSONで認証
   - Zodスキーマでバリデーション
   - エラーハンドリング

5. GitHub Actions ワークフロー作成

   ```bash
   # .github/workflows/sync-sheet.yml を作成
   # ARCHITECTURE.md の完全なコードを使用
   ```

   - `permissions: contents: write` を明示
   - `concurrency` でジョブの重複防止
   - `git config pull.ff only` でマージポリシー設定

6. GitHub Secrets 設定

   ```
   GOOGLE_SERVICE_ACCOUNT_KEY: <サービスアカウントのJSON全体>
   GOOGLE_SHEETS_ID: <シートのID（URLから取得）>
   ```

   - ⚠️ `GOOGLE_API_KEY` は不要（サービスアカウント認証に切り替え）

7. package.json にスクリプト追加

   ```json
   {
     "scripts": {
       "fetch-sheet": "node scripts/fetch-sheet.js",
       "validate-data": "node scripts/validate-data.js",
       "postbuild": "next-sitemap"
     }
   }
   ```

   - `postbuild`はビルド後に自動実行され、サイトマップを生成（Stage 4で追加）

8. 動作確認（段階的テスト）
   - ローカルテスト: `npm run fetch-sheet`
   - Apps Script テスト: シート編集 → Apps Script ログ確認
   - GitHub Actions テスト: 手動トリガー or schedule 待機
   - E2E テスト: シート編集 → コミット → デプロイ

**Status**: Not Started

---

## Stage 4: SEOリント + 記事システム

**Goal**: Markdown記事をテンプレートから作成し、CIでSEO品質を保証

**Success Criteria**:

- ✅ 記事テンプレート（review.md, howto.md）が存在
- ✅ Markdown → HTML 変換が動作（remark/rehype）
- ✅ SEOリントが14項目をチェック
- ✅ PR時に自動チェック実行
- ✅ FAQ の JSON-LD が生成される
- ✅ サイトマップが自動生成される

**Tests**:

```bash
npm run seo-lint                # 全記事チェック
npm run seo-lint -- article.md  # 個別チェック
npm run build                   # サイトマップ生成確認
npm run test:seo                # SEOリントのユニットテスト
```

**Tasks**:

1. Markdown処理パイプライン

   ```typescript
   // lib/markdown.ts
   import { remark } from 'remark';
   import { rehype } from 'rehype';
   // ...
   ```

2. 記事テンプレート作成

   ```markdown
   # templates/review.md

   ---

   title: "【2025年最新】{商品名}の評判・レビュー"

   # ...

   ---

   ## 結論ボックス

   {TODO: 記入}

   ## 詳細レビュー

   {TODO: 記入}

   ## FAQ

   ### Q1: ...
   ```

3. SEOリントスクリプト

   ```javascript
   // scripts/seo-lint.js
   const rules = {
     titleLength: { min: 30, max: 60 },
     // ... (ARCHITECTURE.md参照)
   };
   ```

4. GitHub Actions ワークフロー

   ```yaml
   # .github/workflows/seo-check.yml
   name: SEO Quality Check
   on: [pull_request]
   # ...
   ```

5. 構造化データコンポーネント

   ```typescript
   // components/faq-schema.tsx
   export function FAQSchema({ items }) {
     // ARCHITECTURE.md のコード
   }
   ```

6. サイトマップ設定

   ```javascript
   // next-sitemap.config.cjs (CommonJS形式で保存）
   // ⚠️ package.jsonが"type": "module"なので .cjs 拡張子が必要
   module.exports = {
     siteUrl: 'https://your-site.com',
     generateRobotsTxt: true,
     exclude: ['/api/*', '/_next/*'],
     robotsTxtOptions: {
       policies: [{ userAgent: '*', allow: '/' }],
     },
   };
   ```

7. 記事ページ実装

   ```typescript
   // app/review/[slug]/page.tsx
   export async function generateStaticParams() {
     // content/review/*.md をスキャン
   }
   ```

8. テスト記事作成

   ```markdown
   # content/review/sample-vpn.md

   # テンプレートに沿った記事
   ```

9. PRテンプレート

   ```markdown
   # .github/PULL_REQUEST_TEMPLATE.md

   ## チェックリスト

   - [ ] タイトルが30-60文字
   - [ ] FAQセクションがある

   # ...
   ```

**Status**: Not Started

---

## Stage 5: 運用ツール + モニタリング

**Goal**: 週次メンテナンスとパフォーマンス監視を自動化

**Success Criteria**:

- ✅ Lighthouse CI が PR でスコア表示
- ✅ 週次レポートが Slack に通知
- ✅ リンク切れチェックが動作
- ✅ 画像が自動で WebP 変換
- ✅ GA4 データが取得可能

**Tests**:

```bash
npm run check-links           # リンク切れチェック
npm run optimize-images       # 画像最適化
npm run weekly-report         # レポート生成（ドライラン）
```

**Tasks**:

1. Lighthouse CI 設定

   ```json
   // lighthouserc.json
   {
     "ci": {
       "assert": {
         "assertions": {
           "categories:performance": ["error", { "minScore": 0.9 }]
         }
       }
     }
   }
   ```

2. GitHub Actions ワークフロー

   ```yaml
   # .github/workflows/lighthouse.yml
   - uses: treosh/lighthouse-ci-action@v10
   ```

3. リンク切れチェックスクリプト

   ```javascript
   // scripts/check-links.js
   import { checkLinks } from 'linkinator';
   ```

4. 画像最適化（Vercel Image）

   ```javascript
   // next.config.mjs (ESM形式）
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       formats: ['image/webp', 'image/avif'],
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '**.example.com',
         },
       ],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     },
   };

   export default nextConfig;
   ```

   **注意**: Next.js 13以降は `.mjs` または `export default` 形式を推奨。
   `package.json` が `"type": "module"` の場合、`.js` でも動作するが明示的に `.mjs` にすると安全。

5. 週次レポートスクリプト

   ```javascript
   // scripts/weekly-report.js
   // GA4 Data API から取得
   // Slack Webhook で通知
   ```

6. GitHub Actions スケジュール

   ```yaml
   # .github/workflows/weekly.yml
   on:
     schedule:
       - cron: '0 1 * * 1' # 毎週月曜 10:00 JST
   ```

7. Slack Webhook 設定（GitHub Secrets）

8. ABテスト準備（Vercel Edge Config）
   ```typescript
   // middleware.ts
   import { get } from '@vercel/edge-config';
   // A/Bテストのロジック
   ```

**Status**: Not Started

---

## トラブルシューティング

### 3回失敗ルール

各タスクで3回失敗したら、以下を実行：

1. **ドキュメント化**

   ```markdown
   ## 失敗ログ

   - 試行1: {方法} → {エラー}
   - 試行2: {方法} → {エラー}
   - 試行3: {方法} → {エラー}
   ```

2. **リサーチ**
   - 類似実装を3つ探す（GitHub検索）
   - 公式ドキュメントを再確認
   - コミュニティ（Stack Overflow等）

3. **根本を疑う**
   - 抽象化レベルが適切か？
   - より単純な方法はないか？
   - 別のライブラリ/ツールは？

4. **段階的縮小**
   - 問題を最小再現コードに
   - 依存を削減
   - モックで切り分け

### よくある問題

#### Next.js ビルドエラー

```bash
# キャッシュクリア
rm -rf .next node_modules
npm install
npm run build
```

#### Googleシート API エラー

```bash
# 権限確認
# 1. サービスアカウントがシートに招待されているか
# 2. Sheets API が有効化されているか
# 3. API キーが正しいか
```

#### Vercel デプロイエラー

```bash
# ローカルでVercelビルド再現
npx vercel build
```

---

## 完了条件

全ステージのStatusが "Complete" になり、以下が満たされたら完了：

- ✅ Production サイトが稼働
- ✅ Googleシート編集 → 自動デプロイが動作
- ✅ 記事追加 → PRマージ → デプロイが動作
- ✅ SEOリントが全記事で合格
- ✅ Lighthouse スコアが 90点以上
- ✅ README.md に運用手順が記載

**完了時のアクション**:

1. このファイル（IMPLEMENTATION_PLAN.md）を削除
2. OPERATIONS.md に運用を移行
3. 初回リリース記念コミット 🎉

---

## 更新履歴

| 日付       | Stage | 変更内容 |
| ---------- | ----- | -------- |
| 2025-10-27 | -     | 初版作成 |
