# Stage 1: Next.js 基盤構築

**Goal**: デプロイ可能な最小限のNext.jsサイトを構築
**Status**: ✅ Completed
**Started**: 2025-10-29
**Completed**: 2025-10-29

---

## Success Criteria

- [x] Next.js 15 (App Router) がローカルで起動
- [x] Vercel にデプロイ成功
- [x] TypeScript + ESLint + Prettier が動作
- [x] Tailwind CSS でスタイリング可能
- [x] 3ページ（Home, Compare, About）が表示される

### Next.js 15のSEO改善点

- ✅ **部分的プリレンダリング（PPR）**: 静的部分と動的部分を分離し、初期表示が高速化
- ✅ **after() API**: レスポンス返却後にAnalytics送信など非同期処理が可能
- ✅ **改善されたキャッシュ制御**: より柔軟なISR設定
- ✅ **React 19対応**: Server Componentsの最適化でパフォーマンス向上

---

## Tasks

### 1. Next.js プロジェクト初期化

- [x] コマンド実行
  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
  ```
- [x] プロジェクト設定確認
  - [x] TypeScript: Yes
  - [x] ESLint: Yes
  - [x] Tailwind CSS: Yes
  - [x] App Router: Yes
  - [x] src/ directory: No

**完了確認**:

```bash
ls -la  # package.json, tsconfig.json, tailwind.config.ts が存在
```

---

### 2. 必要パッケージ追加

- [x] 本番依存パッケージをインストール

  ```bash
  npm install zod gray-matter next-mdx-remote
  npm install remark remark-html rehype rehype-stringify
  npm install next-sitemap next-seo
  ```

- [x] 開発依存パッケージをインストール
  ```bash
  npm install -D @types/node prettier eslint-config-prettier
  npm install -D markdownlint-cli
  ```

**完了確認**:

```bash
cat package.json | grep -E "zod|gray-matter"
```

---

### 3. package.json の設定

- [x] `"type": "module"` を追加
- [x] スクリプトセクションを確認・追加

**編集内容**:

```json
{
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

**注意**:

- `validate-data`, `postbuild` は Stage 2, 3 で追加します
- Stage 1では基本的なNext.jsスクリプトのみ設定

**完了確認**:

```bash
cat package.json | grep '"type": "module"'
npm run type-check  # エラーなし
```

---

### 4. ディレクトリ構造作成

- [x] 基本ディレクトリを作成

  ```bash
  mkdir -p app/compare app/about components lib scripts data
  ```

- [x] 各ファイルを作成（後続タスクで実装）
  ```
  app/
    page.tsx              ← トップページ
    compare/page.tsx      ← 比較ページ
    about/page.tsx        ← Aboutページ
    layout.tsx            ← ルートレイアウト（自動生成済み）
  components/
    header.tsx            ← ヘッダー
    footer.tsx            ← フッター
  lib/
    utils.ts              ← ユーティリティ関数
  scripts/                ← Stage 3で使用
  data/                   ← Stage 2で使用
  ```

**完了確認**:

```bash
ls -la app/compare app/about components lib scripts data
```

---

### 5. 基本レイアウト実装

#### 5.1 ヘッダーコンポーネント

- [x] `components/header.tsx` を作成

```typescript
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Affiliate Site
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="/compare" className="text-gray-600 hover:text-gray-900">
            比較
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
```

**完了確認**:

```bash
cat components/header.tsx
```

#### 5.2 フッターコンポーネント

- [x] `components/footer.tsx` を作成

```typescript
export function Footer() {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <p className="text-xs text-gray-500">
          ※ 価格・返金条件は各記事の最終確認日時点の情報です。
          最新情報は公式サイトでご確認ください。
          当サイトはアフィリエイトプログラムに参加しており、
          紹介リンクから購入された場合に報酬を得ることがあります。
        </p>
        <p className="text-sm text-gray-600 mt-4">
          © 2025 Affiliate Site. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

**完了確認**:

```bash
cat components/footer.tsx
```

#### 5.3 ルートレイアウト更新

- [x] `app/layout.tsx` にヘッダー・フッターを追加

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Affiliate Site',
  description: 'Product comparison and reviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**完了確認**:

```bash
npm run dev
# http://localhost:3000 でヘッダー・フッターが表示されるか確認
```

---

### 6. ページ実装

#### 6.1 トップページ

- [x] `app/page.tsx` を実装（create-next-appで自動生成されたものを編集）

```typescript
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Affiliate Site</h1>
      <p className="text-gray-600 mb-6">
        商品の比較・レビューサイトです。
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <a
          href="/compare"
          className="p-6 border rounded-lg hover:border-blue-500 transition"
        >
          <h2 className="text-2xl font-semibold mb-2">商品比較 →</h2>
          <p className="text-gray-600">価格・機能を比較</p>
        </a>
        <a
          href="/about"
          className="p-6 border rounded-lg hover:border-blue-500 transition"
        >
          <h2 className="text-2xl font-semibold mb-2">About →</h2>
          <p className="text-gray-600">サイトについて</p>
        </a>
      </div>
    </div>
  );
}
```

**完了確認**: ブラウザで表示確認

#### 6.2 比較ページ

- [x] `app/compare/page.tsx` を作成

```typescript
export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">商品比較</h1>
      <p className="text-gray-600">
        Stage 2で商品データを表示します。
      </p>
    </div>
  );
}
```

**完了確認**: `/compare` でページが表示されるか

#### 6.3 Aboutページ

- [x] `app/about/page.tsx` を作成

```typescript
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-gray-600">
        このサイトは商品の比較・レビューを提供しています。
      </p>
    </div>
  );
}
```

**完了確認**: `/about` でページが表示されるか

---

### 7. Vercel デプロイ設定

#### 7.1 GitHub リポジトリ連携

- [x] GitHub でリポジトリを作成（まだの場合）
  ```bash
  git init
  git add .
  git commit -m "feat: initial Next.js setup (Stage 1)"
  git branch -M main
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

**完了確認**:

```bash
git remote -v  # origin が表示される
```

#### 7.2 Vercel プロジェクト作成

- [x] [Vercel Dashboard](https://vercel.com/new) にアクセス
- [x] 「Import Git Repository」を選択
- [x] GitHubリポジトリを選択
- [x] プロジェクト設定:
  - [x] Framework Preset: Next.js
  - [x] Root Directory: `./`
  - [x] Build Command: `npm run build`（デフォルト）
  - [x] Output Directory: `.next`（デフォルト）

- [x] 環境変数設定（後のStage用に準備）
  ```
  （必要に応じて後のStageで設定）
  # 現時点では環境変数不要（JSONファイルベース）
  ```

**完了確認**:

- [x] デプロイが成功（緑のチェックマーク）
- [x] Production URLにアクセスしてサイトが表示される

---

### 8. README.md 更新

- [x] プロジェクトのセットアップ手順を記載

````markdown
# Affiliate Template

アフィリエイトサイト テンプレート

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
````

2. Run development server

   ```bash
   npm run dev
   ```

3. Build for production
   ```bash
   npm run build
   ```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Vercel

## Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - アーキテクチャ設計
- [IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) - 実装計画
- [OPERATIONS.md](docs/OPERATIONS.md) - 運用マニュアル

## Implementation Progress

- [x] Stage 1: Next.js 基盤構築
- [ ] Stage 2: データ駆動比較表
- [ ] Stage 3: SEOリント + 記事システム
- [ ] Stage 4: 運用ツール + モニタリング

````

**完了確認**:
```bash
cat README.md
````

---

## Tests

### ローカルテスト

- [x] ビルド成功

  ```bash
  npm run build
  ```

  **期待結果**: エラーなし、`.next/` ディレクトリが生成される

- [x] リント合格

  ```bash
  npm run lint
  ```

  **期待結果**: エラーなし

- [x] 型チェック合格

  ```bash
  npm run type-check
  ```

  **期待結果**: エラーなし

- [x] ローカル起動確認
  ```bash
  npm run dev
  # 別のターミナルで
  curl http://localhost:3000
  ```
  **期待結果**: HTMLが返ってくる

### ブラウザテスト

- [x] `http://localhost:3000` でトップページが表示
- [x] `/compare` で比較ページが表示
- [x] `/about` でAboutページが表示
- [x] ヘッダーのナビゲーションが機能
- [x] フッターに免責文言が表示

### Vercelテスト

- [x] Production URLにアクセス
- [x] 全ページが正しく表示
- [x] リダイレクトやエラーがない

---

## Troubleshooting

### `npm install` でエラー

**原因**: Node.jsバージョンが古い
**対処**:

```bash
node -v  # v18以上を推奨
nvm install 22
nvm use 22
```

### `npm run build` で型エラー

**原因**: TypeScriptの設定ミス
**対処**:

```bash
rm -rf node_modules .next
npm install
npm run type-check  # 詳細なエラーを確認
```

### Vercelデプロイが失敗

**原因**: ビルドコマンドの失敗
**対処**:

1. Vercel Dashboard → Deployments → 失敗したデプロイ → Logs を確認
2. ローカルで `npm run build` が成功するか確認
3. GitHub に最新のコードがプッシュされているか確認

---

## Completion Checklist

- [x] すべてのSuccess Criteriaを満たした
- [x] すべてのテストが合格
- [x] README.mdを更新
- [x] コミット・プッシュ完了
- [x] Vercel デプロイ成功
- [x] このファイルの Status を「✅ Completed」に更新

---

**Status**: ⬜ Not Started → 🔄 In Progress → ✅ Completed
**Completed Date**: YYYY-MM-DD
