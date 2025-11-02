'use client';

import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function CTASoft() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleClick = () => {
    trackCTAClick({
      ctaType: 'soft',
      position: 'article_bottom',
      serviceName: 'MakeLeaps',
      destinationUrl: 'https://www.makeleaps.com/',
      articleSlug,
    });
  };

  return (
    <div className="card p-8 border-2" style={{
      borderColor: 'var(--primary-blue-light)',
      background: 'linear-gradient(to right, #eff6ff, #ffffff)'
    }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">💡</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
            催促メールの作成、毎回大変ではありませんか？
          </h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            請求書の送付から入金確認、催促メールの送信まで、請求・入金管理を一元化できるツールがあります。
          </p>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>請求書の送付から入金確認まで自動化</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>未入金案件を自動でリスト化、対応状況を一目で把握</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>催促メールテンプレをワンクリックで送信</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>経営者や上司にリアルタイムで未回収状況を共有</span>
            </li>
          </ul>
          <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
            まずは無料トライアルで、請求・入金業務の効率化を実感してください。
          </p>
          <a
            href="https://www.makeleaps.com/"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn-primary inline-block"
            onClick={handleClick}
          >
            MakeLeapsを無料で試す →
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--foreground-muted)' }}>
            ※ 実績5,400社以上・リコーグループの請求管理クラウド
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
