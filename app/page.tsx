import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAllArticles } from '@/lib/markdown';
import { FAQSchema } from '@/components/faq-schema';

const FAQAccordion = dynamic(() => import('@/components/faq-accordion').then(mod => ({ default: mod.FAQAccordion })), {
  loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>,
  ssr: true,
});

export const metadata = {
  title: '低評価口コミ・クレーム対応マニュアル｜返信テンプレ＋対応フロー',
  description:
    '悪い口コミやクレーム対応に困っている店舗オーナー向けの実務メディア。Googleマップやホットペッパーの★1レビューへの返信テンプレートから、削除依頼、法的対応まで段階別に解説。',
};

export default async function HomePage() {
  // 各カテゴリから記事を取得
  const mildResponseArticles = await getAllArticles('mild-response');
  const escalationArticles = await getAllArticles('escalation');
  const industrySpecificArticles = await getAllArticles('industry-specific');
  const playbookArticles = await getAllArticles('playbook');

  // FAQ データ
  const faqs = [
    {
      question: '★1レビューが来たらすぐに返信すべき？',
      answer: '24時間以内の返信が理想的です。迅速な対応が、第三者（潜在顧客）への信頼につながります。ただし、感情的にならず、冷静に事実確認してから返信することが重要です。',
    },
    {
      question: '事実と違う口コミは削除できる？',
      answer: '明らかに虚偽の内容（来店していない、定休日に来店したと書かれている等）であれば、プラットフォームに削除依頼を出せます。ただし、主観的な評価（「まずい」「高い」等）は削除されにくいです。',
    },
    {
      question: '公開返信で反論してもいい？',
      answer: '冷静に事実のみを簡潔に伝えることは問題ありませんが、長文の反論や感情的な表現は避けるべきです。第三者（潜在顧客）が見ているため、誠実な対応を心がけましょう。',
    },
    {
      question: '名誉毀損で訴えることはできる？',
      answer: '「詐欺」「ぼったくり」など、明らかに名誉を毀損する内容であれば、法的措置を取れる可能性があります。まずは削除依頼を試し、削除されない場合は弁護士に相談しましょう。費用は着手金20〜50万円程度です。',
    },
    {
      question: 'スタッフへのヒアリングはどうすればいい？',
      answer: 'スタッフを責めるのではなく、事実確認が目的であることを伝えましょう。「いつ、誰が、何があったか」を記録に残すことが重要です。記憶が新しいうちに（24時間以内）ヒアリングしましょう。',
    },
    {
      question: '美容クリニックの口コミ返信で注意すべきことは？',
      answer: '薬機法・医療広告ガイドラインに注意が必要です。「必ず痩せます」「シワが消えます」などの効果の断定、ビフォーアフター写真の提示、比較優良広告は禁止されています。「効果には個人差がございます」という表現を使いましょう。',
    },
    {
      question: '飲食店で「お腹を壊した」と書かれたらどうする？',
      answer: 'まず保健所に報告し、内部調査（食材の仕入れ記録、調理記録等）を行います。公開返信では「心よりお見舞い申し上げます」と体調への配慮を示し、詳細確認のため直接連絡をお願いする旨を伝えましょう。',
    },
    {
      question: '口コミ対応を自動化する方法は？',
      answer: 'MEO/口コミ管理ツールを使うと、低評価レビューが入ったら即座に通知が飛び、返信テンプレートをワンクリックで使えます。対応履歴も自動で記録されるため、スタッフ教育にも活用できます。',
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="min-h-screen" style={{ background: 'var(--background-secondary)' }}>
        {/* ヒーローセクション */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-16 max-w-5xl text-center">
            <div className="mb-6">
              <span className="badge-primary">店舗オーナー向け実務マニュアル</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fadeInUp"
              style={{ color: 'var(--gray-900)' }}
            >
              低評価口コミ・<br className="md:hidden" />クレーム対応マニュアル
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed animate-fadeInUp" style={{
              color: 'var(--foreground-muted)',
              animationDelay: '0.1s'
            }}>
              Googleマップで★1レビューを書かれた…どう返信すべき？<br />
              返信テンプレートから削除依頼、法的対応まで段階別に解説。
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm animate-fadeInUp"
              style={{
                color: 'var(--foreground-muted)',
                animationDelay: '0.2s'
              }}>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>コピペで使える返信テンプレ</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>業種別のNG表現集</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>削除依頼の手順</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* まず読んでほしい記事（Playbook） */}
          {playbookArticles.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  📊 まず読んでほしい：全体フロー
                </h2>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  低評価レビューが来たら、何から手をつければいい？全体の流れを理解しましょう。
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {playbookArticles.slice(0, 1).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/playbook/${article.slug}`}
                    className="group block p-8 rounded-lg border transition-all hover:shadow-xl bg-white"
                    style={{ borderColor: 'var(--primary-blue)' }}
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.frontmatter.tags?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="badge-primary text-xs px-3 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:underline" style={{ color: 'var(--gray-900)' }}>
                      {article.frontmatter.title}
                    </h3>
                    <p className="text-base mb-4" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                    <span className="text-blue-600 group-hover:underline font-semibold">
                      続きを読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 通常対応（mild-response） */}
          {mildResponseArticles.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  😌 まだ角を立てずに対応したい
                </h2>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  「待たされた」「態度が悪い」など、丁寧に謝罪して立て直したいケース
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mildResponseArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/mild-response/${article.slug}`}
                    className="group block p-6 rounded-lg border transition-all hover:shadow-lg bg-white"
                    style={{ borderColor: 'var(--gray-200)' }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.frontmatter.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="badge-primary text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:underline" style={{ color: 'var(--gray-900)' }}>
                      {article.frontmatter.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                    <span className="text-sm text-blue-600 group-hover:underline">
                      続きを読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 強め案件対応（escalation） */}
          {escalationArticles.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  ⚠️ 事実と違う・精神的にギリギリ
                </h2>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  削除依頼を出すべき？法的対応を取るべき？線を引きたいケース
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {escalationArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/escalation/${article.slug}`}
                    className="group block p-6 rounded-lg border transition-all hover:shadow-lg bg-white"
                    style={{ borderColor: 'var(--gray-200)' }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.frontmatter.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge-primary text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:underline" style={{ color: 'var(--gray-900)' }}>
                      {article.frontmatter.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                    <span className="text-sm text-blue-600 group-hover:underline">
                      続きを読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 業種別対応（industry-specific） */}
          {industrySpecificArticles.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  🏥 業種別の注意点
                </h2>
                <p style={{ color: 'var(--foreground-muted)' }}>
                  美容クリニック、飲食店など、業種ごとに絶対に言ってはいけない表現
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industrySpecificArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/industry-specific/${article.slug}`}
                    className="group block p-6 rounded-lg border transition-all hover:shadow-lg bg-white"
                    style={{ borderColor: 'var(--gray-200)' }}
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.frontmatter.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="badge-primary text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:underline" style={{ color: 'var(--gray-900)' }}>
                      {article.frontmatter.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                    <span className="text-sm text-blue-600 group-hover:underline">
                      続きを読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ セクション */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                💡 よくある質問
              </h2>
            </div>
            <div className="bg-white rounded-lg border p-6 md:p-8" style={{ borderColor: 'var(--gray-200)' }}>
              <FAQAccordion faqs={faqs} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
