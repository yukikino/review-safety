# Stage 2: データ駆動比較表

**Goal**: JSONファイルから商品データを読み込み表示
**Status**: ✅ Completed
**Started**: 2025-10-29
**Completed**: 2025-10-29
**Prerequisites**: ✅ Stage 1 完了

---

## Success Criteria

- [x] `data/products.json` が存在し、Zodでバリデーション成功
- [x] 比較ページで商品一覧が表示される
- [x] 日本対応スコアでソート可能
- [x] 価格・返金日数・最終確認日が表示される
- [x] アフィリエイトリンクが機能する

---

## Tasks

### 1. データスキーマ定義（Zod）

- [x] `lib/schema.ts` を作成

```typescript
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  price_monthly: z.number().positive(),
  price_annual: z.number().positive(),
  refund_days: z.number().int().nonnegative(),
  japan_ui: z.boolean(),
  japan_payment: z.boolean(),
  japan_support: z.boolean(),
  japan_docs: z.boolean(),
  affiliate_url: z.string().url(),
  last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  source_url: z.string().url(),
});

export type Product = z.infer<typeof ProductSchema>;
```

**注意**: `calculateJapanScore` は `lib/utils.ts` に配置します（次のタスクで実装）

**完了確認**:

```bash
cat lib/schema.ts
npm run type-check  # エラーなし
```

---

### 2. サンプルデータ作成

- [x] `data/products.json` を作成

```json
[
  {
    "id": "surfshark-vpn",
    "name": "Surfshark VPN",
    "price_monthly": 12.95,
    "price_annual": 47.88,
    "refund_days": 30,
    "japan_ui": true,
    "japan_payment": true,
    "japan_support": false,
    "japan_docs": true,
    "affiliate_url": "https://example.com/surfshark?ref=affiliate",
    "last_updated": "2025-10-27",
    "source_url": "https://surfshark.com/pricing"
  },
  {
    "id": "nordvpn",
    "name": "NordVPN",
    "price_monthly": 11.99,
    "price_annual": 59.88,
    "refund_days": 30,
    "japan_ui": true,
    "japan_payment": true,
    "japan_support": true,
    "japan_docs": true,
    "affiliate_url": "https://example.com/nordvpn?ref=affiliate",
    "last_updated": "2025-10-27",
    "source_url": "https://nordvpn.com/pricing"
  },
  {
    "id": "expressvpn",
    "name": "ExpressVPN",
    "price_monthly": 12.95,
    "price_annual": 99.95,
    "refund_days": 30,
    "japan_ui": false,
    "japan_payment": false,
    "japan_support": true,
    "japan_docs": false,
    "affiliate_url": "https://example.com/expressvpn?ref=affiliate",
    "last_updated": "2025-10-27",
    "source_url": "https://expressvpn.com/order"
  }
]
```

**完了確認**:

```bash
cat data/products.json | jq length  # 3が返る
```

---

### 3. バリデーションスクリプト作成

- [x] `scripts/validate-data.js` を作成

```javascript
import { z } from 'zod';
import fs from 'fs';
import { ProductSchema } from '../lib/schema.ts';

try {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf-8'));
  z.array(ProductSchema).parse(products);
  console.log(`✓ Data validation passed (${products.length} products)`);
} catch (error) {
  console.error('✗ Data validation failed:', error.message);
  if (error.errors) {
    console.error('Details:', JSON.stringify(error.errors, null, 2));
  }
  process.exit(1);
}
```

**完了確認**:

```bash
npm run validate-data
# ✓ Data validation passed (3 products)
```

---

### 4. ユーティリティ関数実装

- [x] `lib/utils.ts` に共通関数を追加

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from './schema';

// Tailwind CSS クラス結合
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 価格フォーマット
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  }).format(price);
}

// 日付フォーマット
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ja-JP').format(new Date(dateString));
}

// 日本対応スコアを計算
export function calculateJapanScore(product: Product): number {
  return [
    product.japan_ui,
    product.japan_payment,
    product.japan_support,
    product.japan_docs,
  ].filter(Boolean).length;
}
```

- [x] 依存パッケージ追加

```bash
npm install clsx tailwind-merge
```

**完了確認**:

```bash
npm run type-check
```

---

### 5. 比較表コンポーネント作成

#### 5.1 比較表の型定義

- [x] `components/comparison-table.tsx` を作成

```typescript
'use client';

import { useState } from 'react';
import type { Product } from '@/lib/schema';
import { calculateJapanScore, formatPrice, formatDate } from '@/lib/utils';

interface ComparisonTableProps {
  products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
  const [sortBy, setSortBy] = useState<'japan_score' | 'price_monthly'>('japan_score');

  // ソート処理
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'japan_score') {
      return calculateJapanScore(b) - calculateJapanScore(a);
    } else {
      return a.price_monthly - b.price_monthly;
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSortBy('japan_score')}
          className={`px-4 py-2 rounded ${
            sortBy === 'japan_score' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          日本対応順
        </button>
        <button
          onClick={() => setSortBy('price_monthly')}
          className={`px-4 py-2 rounded ${
            sortBy === 'price_monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          価格順
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 border">商品名</th>
            <th className="px-4 py-2 border">月額</th>
            <th className="px-4 py-2 border">年額</th>
            <th className="px-4 py-2 border">返金保証</th>
            <th className="px-4 py-2 border">日本対応</th>
            <th className="px-4 py-2 border">最終確認日</th>
            <th className="px-4 py-2 border">リンク</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((product) => {
            const japanScore = calculateJapanScore(product);
            return (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border font-semibold">
                  {product.name}
                </td>
                <td className="px-4 py-2 border">
                  {formatPrice(product.price_monthly)}
                  <span className="text-xs text-gray-400 block">
                    /月
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {formatPrice(product.price_annual)}
                  <span className="text-xs text-gray-400 block">
                    /年
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {product.refund_days}日間
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex flex-col gap-1 text-xs">
                    <span>{product.japan_ui ? '✅' : '❌'} UI</span>
                    <span>{product.japan_payment ? '✅' : '❌'} 決済</span>
                    <span>{product.japan_support ? '✅' : '❌'} サポート</span>
                    <span>{product.japan_docs ? '✅' : '❌'} ドキュメント</span>
                    <span className="font-semibold mt-1">
                      {japanScore}/4点
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 border text-xs text-gray-500">
                  {formatDate(product.last_updated)}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex flex-col gap-2">
                    <a
                      href={product.affiliate_url}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      購入する <span className="text-xs">(PR)</span>
                    </a>
                    <a
                      href={product.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline"
                    >
                      公式で確認
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-4">
        ※ 価格は最終確認日時点の情報です。最新情報は公式サイトでご確認ください。
      </p>
    </div>
  );
}
```

**完了確認**:

```bash
npm run type-check
```

---

### 6. 比較ページ実装

- [x] `app/compare/page.tsx` を更新

```typescript
import products from '@/data/products.json';
import { ComparisonTable } from '@/components/comparison-table';

export const metadata = {
  title: '商品比較 | Affiliate Site',
  description: 'VPN商品の価格・機能を比較'
};

export default function ComparePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">商品比較</h1>
      <p className="text-gray-600 mb-6">
        価格・返金保証・日本対応状況を比較できます。
      </p>

      <ComparisonTable products={products} />
    </div>
  );
}
```

**完了確認**:

```bash
npm run dev
# http://localhost:3000/compare で表が表示される
```

---

## Tests

### バリデーションテスト

- [x] データバリデーション実行
  ```bash
  npm run validate-data
  ```
  **期待結果**: `✓ Data validation passed (3 products)`

### ビルドテスト

- [x] SSG成功確認
  ```bash
  npm run build
  ```
  **期待結果**: エラーなし、`/compare` ページが生成される

### 手動テスト

- [x] ブラウザで `/compare` にアクセス
- [x] 商品が3つ表示される
- [x] 「日本対応順」ボタンをクリック → ソート動作
- [x] 「価格順」ボタンをクリック → ソート動作
- [x] 「購入する」リンクをクリック → 新しいタブで開く
- [x] 「公式で確認」リンクをクリック → 新しいタブで開く
- [x] 日本対応スコアが正しく表示（NordVPN: 4/4点）
- [x] 最終確認日が表示される
- [x] 免責文言が表示される

---

## Troubleshooting

### `npm run validate-data` でエラー

**原因**: データ形式が不正
**対処**:

```bash
# JSONの構文チェック
cat data/products.json | jq .

# エラー詳細を確認
npm run validate-data
```

### テーブルが表示されない

**原因**: JSONインポートエラー
**対処**:

```bash
# TypeScript設定を確認
cat tsconfig.json | grep resolveJsonModule
# "resolveJsonModule": true が必要
```

### Playwrightテストが失敗

**原因**: dev serverが起動していない
**対処**:

```bash
# playwright.config.ts の webServer 設定を確認
# または手動でdevサーバーを起動
npm run dev &
npx playwright test
```

---

## Completion Checklist

- [x] すべてのSuccess Criteriaを満たした
- [x] `npm run validate-data` が成功
- [x] `npm run test:e2e` が成功
- [x] `npm run build` が成功
- [x] ブラウザで動作確認完了
- [x] コミット・プッシュ完了
- [x] README.mdの進捗を更新
- [x] このファイルの Status を「✅ Completed」に更新

---

**Status**: ⬜ Not Started → 🔄 In Progress → ✅ Completed
**Completed Date**: YYYY-MM-DD
