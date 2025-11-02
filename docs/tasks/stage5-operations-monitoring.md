# Stage 5: 運用ツール + モニタリング

**Goal**: 週次メンテナンスとパフォーマンス監視を自動化
**Status**: ✅ Completed
**Started**: 2025-10-29
**Completed**: 2025-10-29
**Prerequisites**: ✅ Stage 1, 2, 3, 4 完了

---

## Success Criteria

- [x] Lighthouse CI が PR でスコア表示
- [x] 週次レポートが Slack に通知
- [x] リンク切れチェックが動作
- [x] 画像が自動で WebP 変換
- [x] GA4 データが取得可能

---

## チェックリスト形式タスク

### Lighthouse CI 設定

- [x] `lighthouserc.json` 作成
- [x] パフォーマンス閾値設定（0.9以上）
- [x] アクセシビリティ閾値設定（0.9以上）
- [x] SEO閾値設定（0.95以上）
- [x] `.github/workflows/lighthouse.yml` 作成
- [x] PR コメントにスコア表示設定

### リンク切れチェック

- [x] `scripts/check-links.js` 作成
- [x] linkinator ライブラリ導入
- [x] 内部リンクチェック
- [x] 外部リンクチェック（タイムアウト設定）
- [x] レポート生成

### 画像最適化

- [x] `next.config.mjs` に Image 設定追加
- [x] WebP/AVIF フォーマット有効化
- [x] デバイスサイズ設定
- [x] リモートパターン設定

### 週次レポートスクリプト

- [x] `scripts/weekly-report.js` 作成
- [x] GA4 Data API 連携
  - [x] Google Cloud で Analytics API 有効化
  - [x] サービスアカウントにGA4権限付与
  - [x] プロパティID設定
- [x] Slack Webhook 設定
- [x] レポート内容設計
  - [x] 先週のPV/UU
  - [x] 上位10記事のCVR
  - [x] 新規追加記事数
  - [x] Lighthouse スコア変化

### GitHub Actions スケジュール

- [x] `.github/workflows/weekly.yml` 作成
- [x] cron設定（毎週月曜10:00 JST）
- [x] 手動トリガー設定
- [x] Slack通知設定

### AB テスト準備（オプション）

- [x] Vercel Edge Config セットアップ
- [x] `middleware.ts` 作成
- [x] A/Bテストロジック実装
- [x] GA4イベント送信設定

---

## 詳細手順

各タスクの詳細は [IMPLEMENTATION_PLAN.md Stage 5](../IMPLEMENTATION_PLAN.md#stage-5-運用ツール--モニタリング) を参照

---

## Tests

- [x] `npm run check-links` 実行成功
  ```json
  {
    "scripts": {
      "check-links": "node scripts/check-links.js"
    }
  }
  ```
- [x] `npm run weekly-report` (dry-run) 成功
  ```json
  {
    "scripts": {
      "weekly-report": "node scripts/weekly-report.js"
    }
  }
  ```
- [x] `npm run optimize-images` 画像最適化確認
  - ビルド時に自動実行されるか確認
  - WebP/AVIF形式で配信されるか確認
- [x] Lighthouse CI が PR で動作
- [x] Slack 通知が届く
- [x] 画像が WebP で配信される（Developer Toolsで確認）

---

## Completion Checklist

- [x] すべてのSuccess Criteriaを満たした
- [x] テスト全て合格
- [x] README.mdの進捗を更新
- [x] IMPLEMENTATION_PLAN.md を削除
- [x] このファイルの Status を「✅ Completed」に更新

**Status**: ⬜ Not Started → 🔄 In Progress → ✅ Completed
**Completed Date**: YYYY-MM-DD

---

## 🎉 全ステージ完了後のアクション

1. `docs/IMPLEMENTATION_PLAN.md` を削除
2. 運用を `docs/OPERATIONS.md` に移行
3. リリース記念コミット作成
4. 運用チームにハンドオフ
