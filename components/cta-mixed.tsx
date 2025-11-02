'use client';

import { trackCTAClick } from '@/lib/gtag';
import { usePathname } from 'next/navigation';

export function CTAMixed() {
  const pathname = usePathname();
  const articleSlug = pathname?.split('/').pop();

  const handleMakeLeapsClick = () => {
    trackCTAClick({
      ctaType: 'mixed',
      position: 'article_bottom',
      serviceName: 'MakeLeaps',
      destinationUrl: 'https://www.makeleaps.com/',
      articleSlug,
    });
  };

  const handleBengo4Click = () => {
    trackCTAClick({
      ctaType: 'mixed',
      position: 'article_bottom',
      serviceName: '弁護士ドットコム',
      destinationUrl: 'https://www.bengo4.com/',
      articleSlug,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gray-900)' }}>
        いまのあなたはどちら？
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* フェーズ1: やさしい催促 */}
        <div className="card p-6 border-2" style={{
          borderColor: 'var(--primary-blue-light)',
          background: '#eff6ff'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">💡</div>
            <h4 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
              フェーズ1
            </h4>
          </div>
          <h5 className="font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
            まだ関係を維持しながら催促したい
          </h5>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            1〜2回目の催促段階で、相手との関係を維持しながら入金を促したい方
          </p>
          <ul className="text-sm space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>未入金案件を自動でリスト化</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>催促メールをテンプレで送信</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>対応履歴を自動記録</span>
            </li>
          </ul>
          <a
            href="https://www.makeleaps.com/"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="btn-primary block text-center"
            onClick={handleMakeLeapsClick}
          >
            MakeLeapsを試す →
          </a>
        </div>

        {/* フェーズ2: 法的手続き検討 */}
        <div className="card p-6 border-2" style={{
          borderColor: 'var(--accent-orange)',
          background: '#fef3c7'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">⚖️</div>
            <h4 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
              フェーズ2
            </h4>
          </div>
          <h5 className="font-semibold mb-3" style={{ color: 'var(--gray-900)' }}>
            法的手続きを検討している
          </h5>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            2〜3回催促しても反応がなく、内容証明や法的手続きを検討している方
          </p>
          <ul className="text-sm space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>弁護士・司法書士による無料相談</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>回収可能性を客観的に判断</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-orange)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>内容証明〜訴訟まで代行可能</span>
            </li>
          </ul>
          <a
            href="https://www.bengo4.com/"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="block text-center px-6 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
            style={{
              background: 'var(--accent-orange)',
            }}
            onClick={handleBengo4Click}
          >
            弁護士に無料相談 →
          </a>
        </div>
      </div>

      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
