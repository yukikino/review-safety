'use client';

import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function CTAMeoTool() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleClick = () => {
    trackCTAClick({
      ctaType: 'meo',
      position: 'article_bottom',
      serviceName: 'MEO管理ツール',
      destinationUrl: 'https://example.com/meo-tool',
      articleSlug,
    });
  };

  return (
    <div className="card p-8 border-2" style={{
      borderColor: 'var(--primary-blue-light)',
      background: 'linear-gradient(to right, #eff6ff, #ffffff)'
    }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">🔔</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
            口コミチェック、毎日手動でやっていませんか?
          </h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            Googleマップやホットペッパーの口コミを自動で監視し、低評価レビューが入ったら即座に通知。返信テンプレートも管理できるツールがあります。
          </p>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>★1〜★3の低評価レビューを即座に通知</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>状況別の返信テンプレートをライブラリ化して管理</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>店長不在でもスタッフが初動対応できる仕組み</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>対応履歴を自動記録、改善活動のエビデンスに</span>
            </li>
          </ul>
          <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
            まずは無料トライアルで、口コミ対応の工数削減を実感してください。
          </p>
          <a
            href="https://example.com/meo-tool"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn-primary inline-block"
            onClick={handleClick}
          >
            MEO管理ツールを無料で試す →
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--foreground-muted)' }}>
            ※ 導入実績3,000店舗以上・飲食/美容/サービス業に特化
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
