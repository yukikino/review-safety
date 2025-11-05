import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サイトについて',
  description: '低評価口コミ・クレーム対応マニュアルは、Googleマップやホットペッパーなどの低評価レビューに悩む店舗オーナーの方々に向けて、実務的な対応方法を解説するサイトです。',
  openGraph: {
    title: 'サイトについて | 口コミ対応マニュアル',
    description: '低評価口コミ・クレーム対応マニュアルは、Googleマップやホットペッパーなどの低評価レビューに悩む店舗オーナーの方々に向けて、実務的な対応方法を解説するサイトです。',
  },
};

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--background-secondary)' }} className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="card p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--gray-900)' }}>
            サイトについて
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2>当サイトの目的</h2>
            <p>
              「低評価口コミ・クレーム対応マニュアル」は、Googleマップやホットペッパーなどの低評価レビューに悩む店舗オーナーの方々に向けて、
              実務的な対応方法を段階的に解説するサイトです。
            </p>

            <h2>提供する情報</h2>
            <ul>
              <li>★1レビューへの返信テンプレートと文例集</li>
              <li>誹謗中傷・虚偽口コミへの削除依頼方法</li>
              <li>名誉毀損に該当する場合の法的対応の流れ</li>
              <li>業種別（飲食店・美容クリニック・エステなど）の対応例</li>
              <li>MEO管理ツールや風評被害対策サービスの紹介</li>
            </ul>

            <h2>運営方針</h2>
            <p>
              当サイトは、実務経験に基づいた情報提供を心がけています。
              ただし、法的判断が必要な場合は必ず弁護士などの専門家にご相談ください。
            </p>

            <h2>アフィリエイト広告について</h2>
            <p>
              当サイトは、MEO管理ツールや風評被害対策サービスなどのアフィリエイトプログラムに参加しています。
              記事内で紹介しているサービスの一部は、アフィリエイトリンクを含みます。
            </p>

            <h2>お問い合わせ</h2>
            <p>
              サイトに関するご質問やご意見がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
