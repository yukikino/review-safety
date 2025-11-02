'use client';

import { CTAAccounting } from './cta-accounting';
import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function SidebarCTA() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleFactoringClick = () => {
    trackCTAClick({
      ctaType: 'factoring',
      position: 'sidebar',
      serviceName: 'No.1ファクタリング',
      destinationUrl: 'https://no1service.co.jp/',
      articleSlug,
    });
  };

  const handleBusinessLoanClick = () => {
    trackCTAClick({
      ctaType: 'accounting',
      position: 'sidebar',
      serviceName: 'アコムビジネスローン',
      destinationUrl: 'https://www.acom.co.jp/business/',
      articleSlug,
    });
  };

  return (
    <div className="space-y-6">
      {/* クラウド会計ソフト */}
      <CTAAccounting />

      {/* ファクタリング（資金繰り） */}
      <div className="card p-6 border-2" style={{
        borderColor: 'var(--success-green)',
        background: '#f0fdf4'
      }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">💰</div>
          <div className="flex-1">
            <h4 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
              入金前に資金化できます
            </h4>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              売掛金を早期に現金化するファクタリングサービス
            </p>
            <ul className="text-xs space-y-1 mb-4">
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--success-green)' }}>✓</span>
                <span style={{ color: 'var(--foreground)' }}>最短即日入金</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--success-green)' }}>✓</span>
                <span style={{ color: 'var(--foreground)' }}>担保・保証人不要</span>
              </li>
            </ul>
            <a
              href="https://no1service.co.jp/"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block text-center px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors hover:opacity-90"
              style={{
                background: 'var(--success-green)',
              }}
              onClick={handleFactoringClick}
              aria-label="No.1ファクタリングで無料見積りを申し込む"
            >
              無料見積り →
            </a>
          </div>
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--foreground-muted)' }}>
          ※ アフィリエイト広告
        </p>
      </div>

      {/* ビジネスローン（事業資金） */}
      <div className="card p-6 border-2" style={{
        borderColor: 'var(--accent-orange)',
        background: '#fef3c7'
      }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">🏦</div>
          <div className="flex-1">
            <h4 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
              事業資金が必要な方へ
            </h4>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              資金繰り改善のためのビジネスローン
            </p>
            <ul className="text-xs space-y-1 mb-4">
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--accent-orange)' }}>✓</span>
                <span style={{ color: 'var(--foreground)' }}>オンライン完結</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: 'var(--accent-orange)' }}>✓</span>
                <span style={{ color: 'var(--foreground)' }}>最短即日融資可能</span>
              </li>
            </ul>
            <a
              href="https://www.acom.co.jp/business/"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block text-center px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors hover:opacity-90"
              style={{
                background: 'var(--accent-orange)',
              }}
              onClick={handleBusinessLoanClick}
              aria-label="アコムビジネスローンで事業資金の相談をする"
            >
              事業資金の相談 →
            </a>
          </div>
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--foreground-muted)' }}>
          ※ アフィリエイト広告
        </p>
      </div>
    </div>
  );
}
