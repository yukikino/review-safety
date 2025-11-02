import { google } from 'googleapis';
import fs from 'fs';

// Dry-run mode: don't actually send to Slack
const DRY_RUN = process.env.DRY_RUN !== 'false';

async function getGA4Data() {
  // GA4 Data API integration
  // Requires: GOOGLE_SERVICE_ACCOUNT_KEY, GA4_PROPERTY_ID
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GA4_PROPERTY_ID) {
    console.warn(
      '⚠️  GA4環境変数が設定されていません。サンプルデータを使用します。'
    );
    return {
      pageviews: 12345,
      users: 3456,
      topPages: [
        { path: '/review/surfshark-vpn-review', views: 1234, cvr: 5.2 },
        { path: '/compare', views: 987, cvr: 3.8 },
        { path: '/', views: 765, cvr: 2.1 },
      ],
    };
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

    const response = await analyticsData.properties.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'yesterday',
          },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'conversions' },
        ],
        dimensions: [{ name: 'pagePath' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      },
    });

    const rows = response.data.rows || [];
    const totals = response.data.totals?.[0]?.metricValues || [];

    return {
      pageviews: parseInt(totals[0]?.value || '0'),
      users: parseInt(totals[1]?.value || '0'),
      topPages: rows.map((row) => ({
        path: row.dimensionValues[0].value,
        views: parseInt(row.metricValues[0].value),
        cvr:
          (parseInt(row.metricValues[2].value) /
            parseInt(row.metricValues[0].value)) *
          100,
      })),
    };
  } catch (error) {
    console.error('GA4データ取得エラー:', error.message);
    throw error;
  }
}

async function countNewArticles() {
  const contentDir = 'content/review';
  if (!fs.existsSync(contentDir)) {
    return 0;
  }

  const files = fs.readdirSync(contentDir);
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  let count = 0;
  for (const file of files) {
    const stats = fs.statSync(`${contentDir}/${file}`);
    if (stats.mtimeMs > oneWeekAgo) {
      count++;
    }
  }

  return count;
}

function generateSlackMessage(data) {
  const { pageviews, users, topPages } = data.analytics;
  const newArticles = data.newArticles;

  const topPagesText = topPages
    .map(
      (page, i) =>
        `${i + 1}. \`${page.path}\`\n   📊 ${page.views.toLocaleString()} views | CVR: ${page.cvr.toFixed(1)}%`
    )
    .join('\n');

  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📊 週次レポート',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*ページビュー（先週）:*\n${pageviews.toLocaleString()}`,
          },
          {
            type: 'mrkdwn',
            text: `*ユーザー数:*\n${users.toLocaleString()}`,
          },
          {
            type: 'mrkdwn',
            text: `*新規記事:*\n${newArticles}件`,
          },
          {
            type: 'mrkdwn',
            text: `*平均PV/ユーザー:*\n${(pageviews / users).toFixed(1)}`,
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*📈 トップ10記事*\n\n${topPagesText}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Generated at ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST`,
          },
        ],
      },
    ],
  };
}

async function sendToSlack(message) {
  if (!process.env.SLACK_WEBHOOK_URL) {
    console.warn('⚠️  SLACK_WEBHOOK_URLが設定されていません。');
    return false;
  }

  try {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Slack送信エラー:', error.message);
    throw error;
  }
}

async function main() {
  console.log('📊 週次レポート生成開始\n');

  if (DRY_RUN) {
    console.log('🧪 DRY RUN MODE（実際には送信しません）\n');
  }

  // データ収集
  console.log('データ収集中...');
  const analytics = await getGA4Data();
  const newArticles = await countNewArticles();

  const data = {
    analytics,
    newArticles,
  };

  // レポート生成
  const message = generateSlackMessage(data);

  console.log('\n' + '='.repeat(60));
  console.log('📊 週次レポート\n');
  console.log(`ページビュー: ${analytics.pageviews.toLocaleString()}`);
  console.log(`ユーザー数: ${analytics.users.toLocaleString()}`);
  console.log(`新規記事: ${newArticles}件`);
  console.log(
    `平均PV/ユーザー: ${(analytics.pageviews / analytics.users).toFixed(1)}`
  );
  console.log('\nトップ10記事:');
  analytics.topPages.forEach((page, i) => {
    console.log(
      `  ${i + 1}. ${page.path} (${page.views.toLocaleString()} views, CVR: ${page.cvr.toFixed(1)}%)`
    );
  });
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('\n✅ DRY RUN完了（Slackには送信していません）');
    console.log('\n送信予定のメッセージ:');
    console.log(JSON.stringify(message, null, 2));
    process.exit(0);
  }

  // Slack送信
  console.log('\nSlackに送信中...');
  await sendToSlack(message);
  console.log('✅ Slack送信完了');

  process.exit(0);
}

main().catch((error) => {
  console.error('エラー:', error);
  process.exit(1);
});
