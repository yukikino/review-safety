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
