# Stage 3: Googleシート自動同期

**Goal**: Googleシート編集が自動でGitHubにコミットされる
**Status**: ✅ Completed
**Started**: 2025-10-29
**Completed**: 2025-10-29
**Prerequisites**: ✅ Stage 1, 2 完了

---

## Success Criteria

- [x] Google Apps Script が動作（onEdit トリガー）
- [x] GitHub Actions がシートデータを取得
- [x] データが変更された場合のみコミット
- [x] 6時間ごとのフォールバック同期
- [x] Vercel が自動デプロイ

---

## Tasks

### 1. Google Cloud Platform セットアップ

#### 1.1 プロジェクト作成

- [x] [Google Cloud Console](https://console.cloud.google.com/) にアクセス
- [x] 新しいプロジェクトを作成
  - プロジェクト名: `affiliate-site-sheets` (任意)
  - プロジェクトIDをメモ

**完了確認**: プロジェクトダッシュボードが表示される

#### 1.2 Sheets API 有効化

- [x] 「APIとサービス」→「ライブラリ」を開く
- [x] 「Google Sheets API」を検索
- [x] 「有効にする」をクリック

**完了確認**: APIが有効化されたことを確認

#### 1.3 サービスアカウント作成

- [x] 「APIとサービス」→「認証情報」を開く
- [x] 「認証情報を作成」→「サービスアカウント」を選択
- [x] サービスアカウント名: `sheets-reader` (任意)
- [x] 役割: なし（シート個別に権限付与）
- [x] 「完了」をクリック

**完了確認**: サービスアカウントが作成される

#### 1.4 JSON キーをダウンロード

- [x] 作成したサービスアカウントをクリック
- [x] 「キー」タブを開く
- [x] 「鍵を追加」→「新しい鍵を作成」
- [x] 「JSON」を選択 →「作成」
- [x] ダウンロードされたJSONファイルを安全な場所に保存

**完了確認**: JSONファイルの内容を確認

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "sheets-reader@....iam.gserviceaccount.com",
  ...
}
```

⚠️ **セキュリティ注意**: このファイルは絶対にGitにコミットしない！

---

### 2. Googleシート準備

#### 2.1 テンプレートシート作成

- [x] [Google Sheets](https://sheets.google.com/) で新しいスプレッドシートを作成
- [x] シート名を「商品管理シート」に変更
- [x] タブ名を「products」に変更
- [x] シートIDをメモ（URLの`/d/`と`/edit`の間の文字列）

**完了確認**: URLが以下の形式

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
```

#### 2.2 列定義作成

- [x] 1行目（ヘッダー）に以下を入力

| A   | B    | C             | D            | E           | F        | G             | H             | I          | J             | K            | L          |
| --- | ---- | ------------- | ------------ | ----------- | -------- | ------------- | ------------- | ---------- | ------------- | ------------ | ---------- |
| id  | name | price_monthly | price_annual | refund_days | japan_ui | japan_payment | japan_support | japan_docs | affiliate_url | last_updated | source_url |

- [x] 2行目以降にサンプルデータを入力（Stage 2のJSONデータをコピー）

**例**:

```
id: surfshark-vpn
name: Surfshark VPN
price_monthly: 12.95
price_annual: 47.88
refund_days: 30
japan_ui: TRUE
japan_payment: TRUE
japan_support: FALSE
japan_docs: TRUE
affiliate_url: https://example.com/surfshark?ref=affiliate
last_updated: 2025-10-27
source_url: https://surfshark.com/pricing
```

**完了確認**: 3行のサンプルデータが入力されている

#### 2.3 サービスアカウントに閲覧権限を付与

- [x] シートの「共有」ボタンをクリック
- [x] JSONファイルの `client_email` をコピー
  - 例: `sheets-reader@your-project.iam.gserviceaccount.com`
- [x] 上記メールアドレスを共有相手に追加
- [x] 権限: 「閲覧者」
- [x] 「送信」をクリック（通知は不要）

**完了確認**: 共有設定に上記メールが表示される

---

### 3. Apps Script 実装

#### 3.1 Apps Script エディタを開く

- [x] Googleシートで「拡張機能」→「Apps Script」を選択
- [x] 新しいプロジェクトが開く
- [x] プロジェクト名: 「Sheet to GitHub Sync」（任意）

**完了確認**: エディタが表示される

#### 3.2 スクリプトコード作成

- [x] `Code.gs` の内容を以下に置き換え

```javascript
// グローバル変数で最終更新時刻を管理
const DEBOUNCE_MS = 60000; // 1分間のデバウンス

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== 'products') return;

  // LockServiceで連続編集を制御
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) {
    Logger.log('別の更新処理が実行中のためスキップ');
    return;
  }

  try {
    const scriptProps = PropertiesService.getScriptProperties();
    const lastTrigger = scriptProps.getProperty('LAST_TRIGGER_TIME');
    const now = Date.now();

    // デバウンス: 前回から1分以内なら発火しない
    if (lastTrigger && now - parseInt(lastTrigger) < DEBOUNCE_MS) {
      Logger.log('デバウンス期間中のためスキップ');
      return;
    }

    // GitHub repository_dispatch を呼び出し
    const url = 'https://api.github.com/repos/{OWNER}/{REPO}/dispatches';
    const payload = {
      event_type: 'sheet_updated',
      client_payload: {
        timestamp: new Date().toISOString(),
        editor: Session.getActiveUser().getEmail(),
      },
    };

    const response = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + scriptProps.getProperty('GITHUB_TOKEN'),
        Accept: 'application/vnd.github+json',
        'User-Agent': 'Google-Apps-Script',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    if (response.getResponseCode() === 204) {
      scriptProps.setProperty('LAST_TRIGGER_TIME', now.toString());
      Logger.log('GitHub Actions トリガー成功');
    } else {
      Logger.log('エラー: ' + response.getContentText());
    }
  } finally {
    lock.releaseLock();
  }
}
```

- [x] `{OWNER}`と`{REPO}`を実際の値に置換
  - 例: `yukikino/affiliate-template`

**完了確認**: コードが保存される

#### 3.3 スクリプトプロパティ設定

- [x] GitHub Personal Access Token（PAT）を作成
  - [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
  - 「Generate new token」をクリック
  - Token name: `Apps Script to Actions`
  - Expiration: 90 days（任意）
  - Repository access: Only select repositories → 対象リポジトリを選択
  - Permissions:
    - Contents: Read and write
    - Metadata: Read-only
  - 「Generate token」をクリック
  - トークンをコピー

- [x] Apps Scriptのプロパティに設定
  - エディタで「プロジェクトの設定」（⚙アイコン）をクリック
  - 「スクリプト プロパティ」セクションで「プロパティを追加」
  - プロパティ: `GITHUB_TOKEN`
  - 値: 上記でコピーしたトークン
  - 「保存」

**完了確認**: プロパティが設定されている

#### 3.4 トリガー設定

- [x] 「トリガー」アイコン（時計マーク）をクリック
- [x] 「トリガーを追加」をクリック
- [x] 設定:
  - 実行する関数: `onEdit`
  - イベントのソース: スプレッドシートから
  - イベントの種類: 編集時
- [x] 「保存」をクリック
- [x] 権限の承認が求められたら許可

**完了確認**: トリガーが一覧に表示される

---

### 4. データ取得スクリプト作成

- [x] `scripts/fetch-sheet.js` を作成

```javascript
import { google } from 'googleapis';
import { z } from 'zod';
import fs from 'fs';
import { ProductSchema } from '../lib/schema.ts';

// サービスアカウント認証（非公開シート対応）
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

try {
  // シートデータ取得
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'products!A2:L', // ヘッダー行を除く
    valueRenderOption: 'UNFORMATTED_VALUE', // 型情報を保持
  });

  if (!response.data.values || response.data.values.length === 0) {
    console.warn('警告: シートにデータがありません');
    process.exit(0);
  }

  // 行をオブジェクトに変換
  const products = response.data.values.map((row, index) => {
    try {
      return {
        id: row[0]?.toString().trim() || '',
        name: row[1]?.toString().trim() || '',
        price_monthly: parseFloat(row[2]) || 0,
        price_annual: parseFloat(row[3]) || 0,
        refund_days: parseInt(row[4]) || 0,
        japan_ui: row[5] === true || row[5] === 'TRUE',
        japan_payment: row[6] === true || row[6] === 'TRUE',
        japan_support: row[7] === true || row[7] === 'TRUE',
        japan_docs: row[8] === true || row[8] === 'TRUE',
        affiliate_url: row[9]?.toString().trim() || '',
        last_updated: row[10]?.toString().trim() || '',
        source_url: row[11]?.toString().trim() || '',
      };
    } catch (err) {
      console.error(`行 ${index + 2} の解析エラー:`, err.message);
      throw err;
    }
  });

  // Zodでバリデーション
  const validated = z.array(ProductSchema).parse(products);

  // 日本対応スコアでソート（高い順）
  validated.sort((a, b) => {
    const scoreA = [
      a.japan_ui,
      a.japan_payment,
      a.japan_support,
      a.japan_docs,
    ].filter(Boolean).length;
    const scoreB = [
      b.japan_ui,
      b.japan_payment,
      b.japan_support,
      b.japan_docs,
    ].filter(Boolean).length;
    return scoreB - scoreA;
  });

  // JSON出力
  fs.writeFileSync('data/products.json', JSON.stringify(validated, null, 2));
  console.log(`✓ ${validated.length}件の商品データを取得しました`);
} catch (error) {
  console.error('エラー:', error.message);
  if (error.errors) {
    console.error(
      'バリデーションエラー:',
      JSON.stringify(error.errors, null, 2)
    );
  }
  process.exit(1);
}
```

**完了確認**:

```bash
cat scripts/fetch-sheet.js
```

---

### 5. GitHub Actions ワークフロー作成

- [x] `.github/workflows/sync-sheet.yml` を作成

```yaml
name: Sync Google Sheets
on:
  repository_dispatch:
    types: [sheet_updated]
  schedule:
    - cron: '0 */6 * * *' # フォールバック：6時間ごと

# 同時実行を防ぐ（前回のジョブが完了するまで待機）
concurrency:
  group: sync-sheet
  cancel-in-progress: false

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write # git push に必要
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Fetch Google Sheets
        run: node scripts/fetch-sheet.js
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
          GOOGLE_SHEETS_ID: ${{ secrets.GOOGLE_SHEETS_ID }}

      - name: Validate Data
        run: npm run validate-data

      - name: Commit if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git config pull.ff only
          git add data/products.json
          if ! git diff --staged --quiet; then
            git commit -m "chore: update products data [skip ci]

            Updated by: ${{ github.event.client_payload.editor || 'scheduled job' }}
            Timestamp: ${{ github.event.client_payload.timestamp || github.event.repository.updated_at }}"
            git pull --rebase
            git push
          else
            echo "No changes detected"
          fi
```

**完了確認**:

```bash
cat .github/workflows/sync-sheet.yml
```

---

### 6. GitHub Secrets 設定

- [x] GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」を開く
- [x] 「New repository secret」をクリック

#### 6.1 GOOGLE_SERVICE_ACCOUNT_KEY

- [x] Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
- [x] Secret: サービスアカウントのJSON全体をコピー＆ペースト
  ```json
  {
    "type": "service_account",
    "project_id": "...",
    ...
  }
  ```
- [x] 「Add secret」をクリック

#### 6.2 GOOGLE_SHEETS_ID

- [x] Name: `GOOGLE_SHEETS_ID`
- [x] Secret: シートのID（URLから取得）
  - 例: `1AbC...XyZ`
- [x] 「Add secret」をクリック

**完了確認**: Secretsに2つ登録されている

---

### 7. ローカルテスト

- [x] 環境変数を設定（`.env.local` は gitignore されている）

  ```bash
  # .env.local を作成（テスト用、本番はGitHub Secrets使用）
  cat > .env.local <<EOF
  GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
  GOOGLE_SHEETS_ID='your-sheet-id'
  EOF
  ```

- [x] スクリプト実行
  ```bash
  source .env.local
  npm run fetch-sheet
  ```

**期待結果**: `✓ 3件の商品データを取得しました`

- [x] データ確認
  ```bash
  cat data/products.json | jq length
  # 3
  ```

---

### 8. 動作確認（段階的テスト）

#### 8.1 Apps Script テスト

- [x] Googleシートで任意のセルを編集（例: 価格を変更）
- [x] Apps Script エディタで「実行ログ」を確認
  - 「表示」→「ログ」
  - 「GitHub Actions トリガー成功」が表示されればOK

**トラブルシューティング**:

- エラーログが表示される場合、`GITHUB_TOKEN`が正しいか確認

#### 8.2 GitHub Actions テスト

- [x] GitHubリポジトリの「Actions」タブを開く
- [x] 「Sync Google Sheets」ワークフローを選択
- [x] 最新の実行を確認
  - ステータスが緑色（成功）ならOK
  - 赤色（失敗）の場合、ログを確認

#### 8.3 コミット確認

- [x] GitHubリポジトリの「Commits」を開く
- [x] `chore: update products data [skip ci]` というコミットが追加されているか確認

#### 8.4 Vercel自動デプロイ確認

- [x] [Vercel Dashboard](https://vercel.com/dashboard) を開く
- [x] 最新のデプロイを確認
- [x] Production URLにアクセス
- [x] `/compare` で変更した価格が反映されているか確認

---

## Tests

### ローカルテスト

- [x] `npm run fetch-sheet` が成功
- [x] `npm run validate-data` が成功
- [x] `data/products.json` が更新される

### 手動E2Eテスト

1. Googleシートを編集
2. 1分待つ（デバウンス）
3. GitHub Actionsが自動実行
4. コミットが作成される
5. Vercelが自動デプロイ
6. Production URLで変更が反映

**所要時間**: 5-10分

---

## Troubleshooting

### Apps Scriptのログに「エラー: 403」

**原因**: GitHub PATの権限不足
**対処**:

1. PATの権限を確認（`contents: write`）
2. 新しいトークンを発行して再設定

### GitHub Actionsが「データがありません」

**原因**: シートID or サービスアカウント権限
**対処**:

1. `GOOGLE_SHEETS_ID`が正しいか確認
2. サービスアカウントに「閲覧者」権限があるか確認

### コミットが作成されない

**原因**: データに変更がない
**対処**:

1. シートを編集して実際に値を変更
2. ログで「No changes detected」が表示されているか確認

---

## Completion Checklist

- [x] すべてのSuccess Criteriaを満たした
- [x] Apps Scriptトリガーが動作
- [x] GitHub Actionsが成功
- [x] データ変更がコミットされる
- [x] Vercel自動デプロイが動作
- [x] E2Eテストが成功
- [x] README.mdの進捗を更新
- [x] このファイルの Status を「✅ Completed」に更新

---

**Status**: ⬜ Not Started → 🔄 In Progress → ✅ Completed
**Completed Date**: YYYY-MM-DD
