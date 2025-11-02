import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibarai-guide.com';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '未入金・支払い催促実務ガイドのプライバシーポリシー（個人情報保護方針）について掲載しています。',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: 'プライバシーポリシー | 未入金・支払い催促実務ガイド',
    description: '未入金・支払い催促実務ガイドのプライバシーポリシー（個人情報保護方針）について掲載しています。',
    url: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--gray-900)' }}>
          プライバシーポリシー
        </h1>

        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <p className="text-sm mb-8" style={{ color: 'var(--foreground-muted)' }}>
              未入金・支払い催促実務ガイド（以下「当サイト」）は、ユーザーの個人情報保護の重要性について認識し、
              個人情報の保護に関する法律（個人情報保護法）を遵守すると共に、以下のプライバシーポリシー（個人情報保護方針）に従って、
              適切な取扱い及び保護に努めます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              1. 個人情報の定義
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、
              すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
              特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）、
              もしくは個人識別符号が含まれる情報を意味するものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              2. 個人情報の利用目的
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトでは、お問い合わせ等により取得した個人情報を、以下の目的で利用します。
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: 'var(--foreground-muted)' }}>
              <li>お問い合わせへの対応のため</li>
              <li>当サイトのサービス向上・改善のため</li>
              <li>当サイトに関する情報提供のため</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              3. 個人情報の第三者提供
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは、個人情報保護法その他の法令により認められる場合を除き、
              ご本人の同意を得ずに、第三者に個人情報を提供することはありません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              4. アクセス解析ツールについて
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
              このGoogleアナリティクスはデータの収集のためにCookieを使用しています。
              このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、
              お使いのブラウザの設定をご確認ください。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              Googleアナリティクスの利用規約に関する説明については
              <a
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Googleアナリティクス利用規約
              </a>
              を、
              Googleのプライバシーポリシーに関する説明については
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Googleプライバシーポリシー
              </a>
              をご覧ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              5. アフィリエイトプログラムについて
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは、Amazon.co.jp、楽天市場、その他のアフィリエイトプログラムに参加しており、
              商品やサービスの紹介リンクから登録・購入があった場合に報酬を得ることがあります。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              アフィリエイトプログラムにおいて、Cookie等を使用してユーザーの行動履歴を収集する場合があります。
              収集された情報は各アフィリエイトサービス提供者のプライバシーポリシーに基づいて管理されます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              6. 免責事項
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトに掲載されている情報の正確性については万全を期しておりますが、
              利用者が当サイトの情報を用いて行う一切の行為について、当サイトは一切の責任を負いません。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは、予告なしに内容を変更または削除する場合がありますので、予めご了承ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              7. 著作権・肖像権について
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトで掲載している文章や画像などについて、無断転載を禁止します。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは著作権や肖像権の侵害を目的としたものではありません。
              著作権や肖像権に関して問題がございましたら、お問い合わせよりご連絡ください。迅速に対応いたします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              8. リンクについて
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは、リンクフリーです。事前の許可なくリンクを貼っていただいて構いません。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトからリンクやバナーなどによって他のサイトに移動された場合、
              移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
              9. プライバシーポリシーの変更
            </h2>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、
              本ポリシーの内容を適宜見直しその改善に努めます。
            </p>
            <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm mt-12" style={{ color: 'var(--foreground-muted)' }}>
              制定日：2025年1月1日<br />
              最終更新日：2025年1月1日
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
