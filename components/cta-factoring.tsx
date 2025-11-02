export function CTAFactoring() {
  return (
    <div className="card p-8 border-2" style={{
      borderColor: 'var(--success-green)',
      background: 'linear-gradient(to right, #f0fdf4, #ffffff)'
    }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">💰</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
            未入金で資金繰りにお困りの方へ
          </h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground-muted)' }}>
            入金を待つ間の資金繰りには、ファクタリング（売掛債権の早期資金化）という選択肢があります。
          </p>
          <ul className="space-y-2 mb-6 text-sm">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--success-green)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>最短即日で売掛金を資金化</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--success-green)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>審査は取引先の信用力で判断（自社の信用情報不問）</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--success-green)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>借入ではないので返済不要、担保・保証人不要</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--success-green)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>オンライン完結で来店不要</span>
            </li>
          </ul>
          <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
            まずは無料見積りで、いくら資金化できるか確認してみましょう。
          </p>
          <a
            href="https://no1service.co.jp/"
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
            style={{
              background: 'var(--success-green)',
            }}
          >
            ファクタリング無料見積り →
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--foreground-muted)' }}>
            ※ 業界最大手・最短即日入金・手数料1%〜
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-6" style={{ color: 'var(--foreground-muted)' }}>
        ※ 当サイトはアフィリエイト広告を掲載しています
      </p>
    </div>
  );
}
