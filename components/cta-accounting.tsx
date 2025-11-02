export function CTAAccounting() {
  return (
    <div className="card p-6 border-2" style={{
      borderColor: 'var(--primary-blue-light)',
      background: '#f8fafc'
    }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="text-3xl">📊</div>
        <div className="flex-1">
          <h4 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
            請求・入金管理も会計ソフトで一元化
          </h4>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            クラウド会計ソフトなら、請求書発行から入金確認、経理処理まで全てつながります。
          </p>
          <ul className="text-xs space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>銀行口座と自動連携で入金確認が楽</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>請求書・見積書作成も可能</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--primary-blue)' }}>✓</span>
              <span style={{ color: 'var(--foreground)' }}>確定申告もスムーズに</span>
            </li>
          </ul>
          <div className="space-y-2">
            <a
              href="https://www.freee.co.jp/"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block text-center px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors hover:opacity-90"
              style={{
                background: 'var(--primary-blue)',
              }}
              aria-label="freee会計の無料トライアルを試す"
            >
              freee会計を試す →
            </a>
            <a
              href="https://biz.moneyforward.com/"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="block text-center px-4 py-2 rounded-lg font-semibold text-white text-sm transition-colors hover:opacity-90"
              style={{
                background: 'var(--primary-blue)',
              }}
              aria-label="マネーフォワードクラウド会計の無料トライアルを試す"
            >
              マネーフォワードを試す →
            </a>
          </div>
        </div>
      </div>
      <p className="text-xs text-center mt-4" style={{ color: 'var(--foreground-muted)' }}>
        ※ アフィリエイト広告
      </p>
    </div>
  );
}
