'use client';

import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function CTAReputation() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleClick = () => {
    trackCTAClick({
      ctaType: 'reputation',
      position: 'article_bottom',
      serviceName: '風評対策コンサル',
      destinationUrl: 'https://example.com/reputation-consulting',
      articleSlug,
    });
  };

  return (
    <div className="card p-8 border-2" style={{
      borderColor: '#fbbf24',
      background: 'linear-gradient(to right, #fef3c7, #ffffff)'
    }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">⚖️</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
            事実と異なる口コミ・攻撃的なレビューで困っていませんか?
          </h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            名誉毀損や営業妨害に該当する可能性のある口コミは、法的手続きを含めた専門的な対応が必要です。風評対策の専門家が無料で相談に乗ります。
          </p>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: '#f59e0b' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>削除可否の判断を法律の専門家が無料で診断</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#f59e0b' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>プラットフォームへの削除依頼を代行</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#f59e0b' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>投稿者の特定・法的措置まで一貫サポート</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: '#f59e0b' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>ネガティブ情報の検索順位を下げるSEO対策</span>
            </li>
          </ul>
          <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
            初回相談は無料。まずは今の状況を専門家に相談してみてください。
          </p>
          <a
            href="https://example.com/reputation-consulting"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn-primary inline-block"
            onClick={handleClick}
          >
            風評対策の無料相談に申し込む →
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--foreground-muted)' }}>
            ※ 弁護士監修・対応実績5,000件以上
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
