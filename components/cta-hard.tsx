'use client';

import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function CTAHard() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleClick = () => {
    trackCTAClick({
      ctaType: 'hard',
      position: 'article_bottom',
      serviceName: '弁護士ドットコム',
      destinationUrl: 'https://www.bengo4.com/',
      articleSlug,
    });
  };

  return (
    <div className="card p-8 border-2" style={{
      borderColor: 'var(--accent-orange)',
      background: 'linear-gradient(to right, #fef3c7, #ffffff)'
    }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">⚖️</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
            未払いが長期化している場合は、専門家への相談をおすすめします
          </h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            内容証明の送付や法的手続きを検討される場合、弁護士・司法書士による無料相談サービスがあります。
          </p>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>債権回収に強い弁護士・司法書士による初回無料相談</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>「この案件は回収できそうか？」だけでも相談OK</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>内容証明の文面チェックから支払督促・訴訟まで代行可能</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>回収成功時の成功報酬型プランも選択できます</span>
            </li>
          </ul>
          <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
            まずは無料相談で、回収の可能性や取るべき手段について、専門家の意見を聞いてみることをおすすめします。
          </p>
          <a
            href="https://www.bengo4.com/"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
            style={{
              background: 'var(--accent-orange)',
            }}
            onClick={handleClick}
          >
            弁護士ドットコムで無料相談 →
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--foreground-muted)' }}>
            ※ 登録弁護士数23,000人以上・相談実績210万件以上
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
