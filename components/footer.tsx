import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto" style={{ borderColor: 'var(--gray-200)' }}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* サイトリンク */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--gray-900)' }}>
              未入金・支払い催促実務ガイド
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--foreground-muted)' }}>
              取引先からの未入金・支払い遅延に悩む事業者の方々に向けて、実務的な対応方法を解説するサイトです。
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--gray-900)' }}>
              コンテンツ
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:underline" style={{ color: 'var(--foreground-muted)' }}>
                  トップページ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline" style={{ color: 'var(--foreground-muted)' }}>
                  サイトについて
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--gray-900)' }}>
              ポリシー
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:underline" style={{ color: 'var(--foreground-muted)' }}>
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 免責事項 */}
        <div className="mb-6 pt-6 border-t" style={{ borderColor: 'var(--gray-200)' }}>
          <h3 className="font-bold mb-3 text-sm" style={{ color: 'var(--gray-900)' }}>
            免責事項
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            本サイトは一般的な情報提供を目的としており、法的助言ではありません。
            個別の状況に応じて、弁護士や司法書士などの専門家にご相談ください。
            本サイトの情報を使用した結果生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </div>

        {/* アフィリエイト開示 */}
        <div className="mb-6">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            ※ 当サイトはアフィリエイトプログラムに参加しており、
            紹介リンクから登録・契約された場合に報酬を得ることがあります。
            掲載情報は各記事の最終確認日時点のものです。最新情報は各サービスの公式サイトでご確認ください。
          </p>
        </div>

        {/* コピーライト */}
        <div className="pt-6 border-t" style={{ borderColor: 'var(--gray-200)' }}>
          <p className="text-sm text-center" style={{ color: 'var(--foreground-muted)' }}>
            © 2025 未入金・支払い催促実務ガイド. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
