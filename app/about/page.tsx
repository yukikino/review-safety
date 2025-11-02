import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サイトについて',
  description: '未入金・支払い催促実務ガイドは、取引先からの未入金や支払い遅延に悩む事業者の方々に向けて、実務的な対応方法を解説するサイトです。',
  openGraph: {
    title: 'サイトについて | 未入金・支払い催促実務ガイド',
    description: '未入金・支払い催促実務ガイドは、取引先からの未入金や支払い遅延に悩む事業者の方々に向けて、実務的な対応方法を解説するサイトです。',
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
              「未入金・支払い催促実務ガイド」は、取引先からの未入金や支払い遅延に悩む事業者の方々に向けて、
              実務的な対応方法を段階的に解説するサイトです。
            </p>

            <h2>提供する情報</h2>
            <ul>
              <li>催促メールのタイミングと文面テンプレート</li>
              <li>内容証明郵便の書き方と送付方法</li>
              <li>支払督促・少額訴訟などの法的手続きの流れ</li>
              <li>債権回収の時効と注意点</li>
              <li>請求管理ツールや専門家サービスの紹介</li>
            </ul>

            <h2>運営方針</h2>
            <p>
              当サイトは、実務経験に基づいた情報提供を心がけています。
              ただし、法的判断が必要な場合は必ず弁護士・司法書士などの専門家にご相談ください。
            </p>

            <h2>アフィリエイト広告について</h2>
            <p>
              当サイトは、請求管理ツールや法律相談サービスなどのアフィリエイトプログラムに参加しています。
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
