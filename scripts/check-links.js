import { LinkChecker } from 'linkinator';
import path from 'path';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const timeout = 10000; // 10 seconds

async function checkLinks() {
  console.log('🔗 リンク切れチェック開始\n');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Timeout: ${timeout}ms\n`);

  const checker = new LinkChecker();

  checker.on('link', (result) => {
    if (result.state === 'BROKEN') {
      console.log(`❌ BROKEN: ${result.url}`);
      console.log(`   From: ${result.parent || 'unknown'}`);
      console.log(`   Status: ${result.status}\n`);
    } else if (result.state === 'SKIPPED') {
      // Skip logging for skipped links (too verbose)
    } else {
      console.log(`✅ OK: ${result.url}`);
    }
  });

  try {
    const result = await checker.check({
      path: baseUrl,
      recurse: true,
      timeout,
      linksToSkip: [
        // Skip external domains that may block bots
        'https://www.google.com',
        'https://www.facebook.com',
        'https://twitter.com',
        'https://www.linkedin.com',
        // Skip placeholder URLs
        'https://example.com',
        'https://your-domain.com',
      ],
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 リンクチェック結果\n');
    console.log(`Total links: ${result.links.length}`);
    console.log(`Passed: ${result.passed.length}`);
    console.log(`Failed: ${result.failed.length}`);
    console.log(`Skipped: ${result.skipped.length}`);
    console.log('='.repeat(60));

    if (result.failed.length > 0) {
      console.log('\n❌ リンク切れが見つかりました:');
      result.failed.forEach((link) => {
        console.log(`  - ${link.url} (Status: ${link.status})`);
        console.log(`    From: ${link.parent || 'unknown'}`);
      });
      process.exit(1);
    } else {
      console.log('\n✅ 全てのリンクが正常です！');
      process.exit(0);
    }
  } catch (error) {
    console.error('エラー:', error.message);
    process.exit(1);
  }
}

checkLinks();
