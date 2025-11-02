import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getAllArticles } from '@/lib/markdown';
import { FAQSchema } from '@/components/faq-schema';

const FAQAccordion = dynamic(() => import('@/components/faq-accordion').then(mod => ({ default: mod.FAQAccordion })), {
  loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>,
  ssr: true,
});

export const metadata = {
  title: '未入金・支払い催促実務ガイド｜催促メールから内容証明まで',
  description:
    '取引先からの未入金・支払い遅延に悩む方のための実務ガイド。1回目の催促メールから内容証明、法的手続きまでのフローを段階別に解説。コピペで使えるテンプレート付き。',
};

export default async function HomePage() {
  // 記事を取得
  const articles = await getAllArticles('guide');

  // カテゴリ別に分類
  const mildReminderArticles = articles.filter(
    (a) => a.frontmatter.category === 'mild-reminder'
  );
  const finalWarningArticles = articles.filter(
    (a) => a.frontmatter.category === 'final-warning'
  );
  const aboutProcessArticles = articles.filter(
    (a) => a.frontmatter.category === 'about-process'
  );

  // FAQ データ
  const faqs = [
    {
      question: '催促メールはいつ送るべき?',
      answer: '支払期日から3〜7日後が目安です。単なる忘れや手違いの可能性が高いため、最初は丁寧な「確認」のトーンで送りましょう。期日当日や翌日に送ると、相手が入金手続き中の可能性もあり、関係悪化のリスクがあります。',
    },
    {
      question: '内容証明の費用はいくらかかる?',
      answer: '郵便局から送る場合、約1,500円程度です(通常郵便料金 + 内容証明料440円 + 配達証明料320円 + 書留料435円)。弁護士や司法書士に依頼する場合は、別途1〜3万円程度の作成費用がかかります。',
    },
    {
      question: '弁護士費用の相場はどれくらい?',
      answer: '着手金は20〜30万円、成功報酬は回収額の10〜20%が一般的です。ただし、無料相談を実施している事務所も多く、少額案件では成功報酬型のみで対応してくれる場合もあります。回収額が100万円未満の場合は費用対効果を慎重に検討しましょう。',
    },
    {
      question: '少額訴訟と通常訴訟の違いは?',
      answer: '少額訴訟は60万円以下の金銭請求で利用でき、原則1回の審理で判決が出ます。費用は1万円程度で、弁護士なしでも対応可能です。通常訴訟は金額制限がなく複雑な案件にも対応できますが、数ヶ月〜1年以上かかり、弁護士費用も高額になります。',
    },
    {
      question: '売掛金の時効は何年?',
      answer: '2020年4月の民法改正後は、原則5年です(権利を行使できることを知った時から)。ただし、飲食店の売掛金など一部の債権は1年と短いケースもあります。内容証明の送付や訴訟提起により時効を中断できるため、長期化している場合は早めに専門家に相談しましょう。',
    },
    {
      question: '何度催促しても無視される場合はどうする?',
      answer: '2〜3回の催促メールに反応がない場合、内容証明郵便の送付を検討しましょう。それでも無視される場合は、支払督促や少額訴訟などの法的手続きに進みます。無視が続く場合は意図的な未払いの可能性が高く、早期の法的対応が回収率を高めます。',
    },
    {
      question: '継続取引先にも内容証明を送っていい?',
      answer: '関係維持が重要な継続取引先の場合、内容証明は慎重に判断すべきです。まずは3回程度の催促メールと電話で対応し、それでも反応がない場合に最終手段として検討しましょう。ただし、未払いが常態化している場合は、関係見直しも含めて対応が必要です。',
    },
    {
      question: '催促メールで避けるべき表現は?',
      answer: '「法的措置を取る」「訴える」などの脅迫的表現、深夜や早朝の連絡、第三者への開示を示唆する内容は避けましょう。感情的な表現や人格否定も厳禁です。ビジネスライクで冷静な文面を心がけ、証拠として使えるよう正確な記録を残すことが重要です。',
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
            <span className="badge-primary">実務ガイド</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fadeInUp"
            style={{ color: 'var(--gray-900)' }}
          >
            未入金・支払い催促<br className="md:hidden" />実務ガイド
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed animate-fadeInUp" style={{
            color: 'var(--foreground-muted)',
            animationDelay: '0.1s'
          }}>
            請求書を送ったのに入金がない…そんな時の対応フローを段階別に解説。<br />
            1回目の催促メールから内容証明、法的手続きまで。
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm animate-fadeInUp"
            style={{
              color: 'var(--foreground-muted)',
              animationDelay: '0.2s'
            }}>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>コピペで使えるテンプレート</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>段階別の対応フロー</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>法的手続きの基礎知識</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* こんな悩みありませんか？ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--gray-900)' }}>
            こんな悩みありませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    請求書を送ったのに期日を過ぎても入金がない
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    いつまで待つべきか、いつ連絡すべきか判断に迷う
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    催促メールを送りたいが関係が悪化しないか不安
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    継続取引先なので、言い方に気を遣う
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔁</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    何度催促しても無視される、言い訳ばかり
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    次のステップに進むべきか判断できない
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    内容証明や法的手続きを検討すべきか迷っている
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    費用対効果や手続きの複雑さが心配
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    弁護士に相談すべきか、費用が気になる
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    回収額より費用が高くつかないか不安
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                    時効になってしまわないか心配
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    何ヶ月も放置してしまい、回収が難しくなっていないか
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* よくある失敗パターン */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            よくある失敗パターン
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            これらの対応は関係悪化や回収失敗のリスクが高まります
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="card p-5 border-2" style={{
              borderColor: 'var(--accent-red)',
              background: '#fef2f2'
            }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    期日後すぐに強い口調で催促
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    単なる手違いや入金遅延の場合、関係が一気に悪化。まずは「確認」のスタンスで。
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-2" style={{
              borderColor: 'var(--accent-red)',
              background: '#fef2f2'
            }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    何ヶ月も放置してしまう
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    時間が経つほど回収は困難に。時効リスクも。早期対応が回収率を高めます。
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-2" style={{
              borderColor: 'var(--accent-red)',
              background: '#fef2f2'
            }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    感情的なメールを送ってしまう
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    脅迫と取られる表現は法的に不利。冷静なビジネス文書が証拠として有効。
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-5 border-2" style={{
              borderColor: 'var(--accent-red)',
              background: '#fef2f2'
            }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    口頭での約束だけで証拠を残さない
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    電話で「来週払う」と言われても、メールで確認しないと証拠になりません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フロー図 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            対応フロー
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            未入金発生から法的手続きまでの5ステップ
          </p>
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="card p-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: 'var(--primary-blue)' }}>
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                      1回目の入金確認メール
                    </h3>
                    <span className="badge-primary">期日+3〜7日</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>
                    やわらかく「確認」のスタンスで連絡。単なる手違いや忘れの可能性が高い段階。
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="badge-primary">丁寧な表現</span>
                    <span className="badge-primary">関係維持</span>
                    <span className="badge-success">回収率: 約70%</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ ポイント: 相手のミスを責めず、「確認させてください」というトーン
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-2xl" style={{ color: 'var(--gray-300)' }}>↓</div>

            <div className="card p-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: 'var(--primary-blue)' }}>
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                      2回目の催促メール
                    </h3>
                    <span className="badge-primary">1回目+7〜10日</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>
                    「お支払いをお願いします」と明確に依頼。丁寧さは保ちつつ、意思を明確に。
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="badge-primary">明確な依頼</span>
                    <span className="badge-success">回収率: 約50%</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ ポイント: 具体的な期日を提示し、入金予定日を確認
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-2xl" style={{ color: 'var(--gray-300)' }}>↓</div>

            <div className="card p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: 'var(--accent-orange)' }}>
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                      最終手前の催促
                    </h3>
                    <span className="badge-warning">2回目+7〜10日</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>
                    「然るべき対応を検討せざるを得ません」と伝える。これが最後のチャンス。
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="badge-warning">最終警告</span>
                    <span className="badge-success">回収率: 約30%</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ⚠️ ここで反応がない場合、意図的な未払いの可能性
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-2xl" style={{ color: 'var(--gray-300)' }}>↓</div>

            <div className="card p-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: 'var(--accent-red)' }}>
                  4
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                      内容証明郵便
                    </h3>
                    <span className="badge-warning">期日+1ヶ月以上</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>
                    法的な証拠を残す正式な通知。心理的プレッシャーが大きく、これで入金するケースも。
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="badge-warning">法的証拠</span>
                    <span className="badge-warning">公的手続き</span>
                    <span className="badge-warning">費用: 約1,500円</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 時効の中断効果あり。訴訟の証拠としても有効
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-2xl" style={{ color: 'var(--gray-300)' }}>↓</div>

            <div className="card p-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: 'var(--accent-red)' }}>
                  5
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
                      法的手続き
                    </h3>
                    <span className="badge-warning">内容証明+2週間後</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>
                    支払督促・少額訴訟・通常訴訟を検討。金額・証拠の有無で選択。
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="badge-warning">専門家相談推奨</span>
                    <span className="badge-warning">費用: 数万〜数十万円</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ⚠️ 弁護士費用と回収額のバランスを考慮。無料相談で判断を
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* タイムライン早見表 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--gray-900)' }}>
            タイムライン早見表
          </h2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ background: 'var(--gray-50)' }}>
                  <tr>
                    <th className="p-4 text-left font-semibold" style={{ color: 'var(--gray-900)' }}>タイミング</th>
                    <th className="p-4 text-left font-semibold" style={{ color: 'var(--gray-900)' }}>推奨アクション</th>
                    <th className="p-4 text-left font-semibold" style={{ color: 'var(--gray-900)' }}>トーン</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>支払期日当日</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>特になし（様子見）</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>—</td>
                  </tr>
                  <tr className="border-t" style={{ background: '#eff6ff' }}>
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>期日+3〜7日</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>1回目の入金確認メール</td>
                    <td className="p-4">
                      <span className="badge-primary">丁寧・確認</span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>期日+10〜14日</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>2回目の催促メール</td>
                    <td className="p-4">
                      <span className="badge-primary">明確な依頼</span>
                    </td>
                  </tr>
                  <tr className="border-t" style={{ background: '#fef3c7' }}>
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>期日+21〜28日</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>最終警告メール</td>
                    <td className="p-4">
                      <span className="badge-warning">厳格</span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>期日+30〜45日</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>内容証明郵便の送付</td>
                    <td className="p-4">
                      <span className="badge-warning">法的</span>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium" style={{ color: 'var(--gray-900)' }}>期日+60日以降</td>
                    <td className="p-4" style={{ color: 'var(--foreground-muted)' }}>法的手続き検討</td>
                    <td className="p-4">
                      <span className="badge-warning">専門家相談</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: 'var(--foreground-muted)' }}>
            ※ タイミングは目安です。相手の反応や関係性によって調整してください。
          </p>
        </div>

        {/* 金額別・関係性別ガイド */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--gray-900)' }}>
            金額別・関係性別の対応ガイド
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 border-t-4" style={{ borderColor: 'var(--success-green)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                10万円未満
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>継続取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    2〜3回の催促メールで様子見。関係維持を最優先に。
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>単発取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    早めに内容証明。弁護士費用を考えると少額訴訟（60万円以下）が現実的。
                  </p>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: 'var(--gray-200)' }}>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    💡 少額訴訟: 費用1万円程度、1日で判決
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-t-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                10〜100万円
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>継続取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    内容証明まで進める価値あり。弁護士への初回無料相談を活用。
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>単発取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    支払督促 or 通常訴訟を検討。証拠がしっかりしていれば勝訴可能性高。
                  </p>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: 'var(--gray-200)' }}>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    💡 支払督促: 費用2〜5万円、書面審査のみ
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-t-4" style={{ borderColor: 'var(--accent-orange)' }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                100万円以上
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>継続取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    早めに弁護士相談。分割払い交渉も含めて専門家に任せるのが得策。
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>単発取引先</p>
                  <p style={{ color: 'var(--foreground-muted)' }}>
                    弁護士必須。通常訴訟になる可能性大。成功報酬型も検討。
                  </p>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: 'var(--gray-200)' }}>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ⚠️ 弁護士費用: 着手金20〜30万円+成功報酬
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* よくある質問（FAQ） */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            よくある質問（FAQ）
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            未入金・催促に関する疑問を解消
          </p>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>

        {/* 回収成功事例 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            回収成功事例
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            適切な対応で未入金を回収できたケース
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--success-green)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-success">成功事例1</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                30万円の売掛金、2回目の催促で全額回収
              </h3>
              <div className="space-y-3 text-sm mb-4" style={{ color: 'var(--foreground-muted)' }}>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>状況</p>
                  <p>継続取引先からの30万円の売掛金が期日を2週間超過</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>対応</p>
                  <p>1回目: 期日+5日に丁寧な確認メール → 反応なし<br />
                  2回目: 期日+12日に明確な催促メール → 即日返信あり</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>結果</p>
                  <p>経理担当者の見落としが原因と判明。謝罪とともに3日後に全額入金。関係も維持。</p>
                </div>
              </div>
              <div className="pt-3 border-t text-xs" style={{ borderColor: 'var(--gray-200)', color: 'var(--foreground-muted)' }}>
                💡 ポイント: 丁寧さを保ちつつ明確に依頼することで、関係を損なわず回収
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--primary-blue)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-primary">成功事例2</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                150万円の未払い、内容証明送付で即日回収
              </h3>
              <div className="space-y-3 text-sm mb-4" style={{ color: 'var(--foreground-muted)' }}>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>状況</p>
                  <p>単発取引先からの150万円が期日を1ヶ月超過。3回の催促メールに一切反応なし。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>対応</p>
                  <p>司法書士に依頼し内容証明を送付(費用: 2.5万円)。「7日以内に支払いがない場合は法的手続き」と明記。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>結果</p>
                  <p>内容証明到達の翌日に先方から連絡があり、3日後に全額入金。法的手続き不要。</p>
                </div>
              </div>
              <div className="pt-3 border-t text-xs" style={{ borderColor: 'var(--gray-200)', color: 'var(--foreground-muted)' }}>
                💡 ポイント: 内容証明の心理的プレッシャーが効果的。費用対効果が高い
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-orange)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-warning">成功事例3</span>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                500万円の長期未払い、弁護士介入で和解成立
              </h3>
              <div className="space-y-3 text-sm mb-4" style={{ color: 'var(--foreground-muted)' }}>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>状況</p>
                  <p>元継続取引先からの500万円が3ヶ月未払い。相手の資金繰り悪化が原因。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>対応</p>
                  <p>弁護士に相談(着手金30万円)。訴訟ではなく、分割払いでの和解交渉を提案。</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>結果</p>
                  <p>月100万円×5回の分割払いで合意。公正証書を作成し、計画通り全額回収。</p>
                </div>
              </div>
              <div className="pt-3 border-t text-xs" style={{ borderColor: 'var(--gray-200)', color: 'var(--foreground-muted)' }}>
                💡 ポイント: 高額案件は専門家の交渉力が重要。訴訟より和解が早い
              </div>
            </div>
          </div>
        </div>

        {/* やってはいけないこと */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            やってはいけないこと
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            これらの行為は法的に問題となる可能性があります
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-red)', background: '#fef2f2' }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">🚫</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    脅迫的な言葉を使う
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                    「訴えるぞ」「家に押しかける」「SNSで晒す」などの表現は脅迫罪に該当する可能性があります。
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 正しい表現: 「ご入金が確認できない場合、やむを得ず法的手続きを検討させていただきます」
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-red)', background: '#fef2f2' }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">🚫</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    深夜・早朝に電話やメールをする
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                    午後9時〜午前8時の連絡は、貸金業法で禁止されている行為であり、債権回収でも不適切とされます。
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 推奨時間帯: 平日午前9時〜午後6時、メールは時間外でも送信予約を活用
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-red)', background: '#fef2f2' }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">🚫</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    第三者(家族・同僚)に未払いを伝える
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                    本人以外に債務の事実を伝えることは、プライバシー侵害となり、名誉毀損で訴えられる可能性があります。
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 正しい対応: 必ず本人または法人代表者・経理担当者にのみ連絡
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-red)', background: '#fef2f2' }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">🚫</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    一方的に遅延損害金を請求する
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                    契約書に遅延損害金の規定がない場合、勝手に請求すると関係悪化やトラブルの原因になります。
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 正しい対応: 契約書に記載がある場合のみ請求可能。通常は年3〜14.6%
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 border-l-4" style={{ borderColor: 'var(--accent-red)', background: '#fef2f2' }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">🚫</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent-red)' }}>
                    感情的な表現で人格を否定する
                  </h3>
                  <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>
                    「詐欺師」「信用できない」などの表現は名誉毀損や侮辱罪に該当する可能性があり、逆に訴えられるリスクがあります。
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                    ✓ 正しい対応: 事実のみを淡々と記載。感情は一切表に出さない
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 専門家への相談タイミング */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-3" style={{ color: 'var(--gray-900)' }}>
            専門家への相談タイミング
          </h2>
          <p className="text-center mb-10" style={{ color: 'var(--foreground-muted)' }}>
            以下のいずれかに当てはまる場合は、弁護士・司法書士への相談を検討しましょう
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="card p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      未払い金額が100万円以上
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      高額案件は専門家の交渉力とノウハウが重要。費用対効果が見合う。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      3回以上の催促を完全に無視されている
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      意図的な未払いの可能性が高く、法的手続きを検討すべきタイミング。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      内容証明を送っても反応がない
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      次のステップは法的手続き。支払督促や訴訟の判断は専門家に相談を。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      期日から3ヶ月以上経過している
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      時効の進行が心配。法的手続きで時効を中断する必要がある。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      相手が「払えない」と主張している
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      分割払い交渉や資産調査が必要。専門家の交渉スキルが有効。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'var(--background-secondary)' }}>
                  <input type="checkbox" className="mt-1 w-5 h-5" style={{ accentColor: 'var(--primary-blue)' }} disabled />
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                      契約内容や証拠が不十分
                    </p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      口頭契約のみ、請求書がない等。証拠収集と訴訟戦略は専門家に。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--gray-200)' }}>
                <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                  💡 多くの法律事務所が<strong style={{ color: 'var(--gray-900)' }}>初回相談無料</strong>。専門家のアドバイスを受けることで、より確実な債権回収が可能になります。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* まずはここから */}
        {aboutProcessArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: 'var(--gray-900)' }}>
              まずはここから
            </h2>
            <div className="max-w-3xl mx-auto">
              {aboutProcessArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/guide/${article.slug}`}
                  className="block card p-8 hover:shadow-lg transition-shadow"
                  style={{ background: 'linear-gradient(to right, #eff6ff, #ffffff)' }}
                >
                  <div className="flex items-start gap-6">
                    <div className="text-5xl">📊</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                        {article.frontmatter.title}
                      </h3>
                      <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground-muted)' }}>
                        {article.frontmatter.description}
                      </p>
                      <div className="flex items-center font-semibold text-sm" style={{ color: 'var(--primary-blue)' }}>
                        <span>詳しく見る</span>
                        <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 記事一覧 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* やさしい催促 */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">💡</div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
                フェーズ1: やさしい催促
              </h2>
            </div>
            <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--primary-blue)' }}>
              対象: 期日から1ヶ月以内・関係維持重視
            </p>
            <p className="mb-6" style={{ color: 'var(--foreground-muted)' }}>
              相手との関係を維持しながら、丁寧に入金確認を行いたい方向け
            </p>
            <div className="space-y-3">
              {mildReminderArticles.length > 0 ? (
                mildReminderArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/guide/${article.slug}`}
                    className="block p-4 rounded-lg transition-all hover:shadow-md"
                    style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold flex-1" style={{ color: 'var(--gray-900)' }}>
                        {article.frontmatter.title}
                      </h3>
                      <span className="badge-primary text-xs">5分</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                  </Link>
                ))
              ) : (
                <p style={{ color: 'var(--foreground-muted)' }}>記事がありません</p>
              )}
            </div>
          </div>

          {/* 最終通告・法的手続き */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">⚖️</div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
                フェーズ2: 最終通告・法的手続き
              </h2>
            </div>
            <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent-orange)' }}>
              対象: 期日から1ヶ月以上・催促無視
            </p>
            <p className="mb-6" style={{ color: 'var(--foreground-muted)' }}>
              2〜3回催促しても反応がなく、法的手続きを検討している方向け
            </p>
            <div className="space-y-3">
              {finalWarningArticles.length > 0 ? (
                finalWarningArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/guide/${article.slug}`}
                    className="block p-4 rounded-lg transition-all hover:shadow-md"
                    style={{
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold flex-1" style={{ color: 'var(--gray-900)' }}>
                        {article.frontmatter.title}
                      </h3>
                      <span className="badge-warning text-xs">10分</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      {article.frontmatter.description}
                    </p>
                  </Link>
                ))
              ) : (
                <p style={{ color: 'var(--foreground-muted)' }}>記事がありません</p>
              )}
            </div>
          </div>
        </div>

        {/* 免責 */}
        <div className="card p-6 border-2" style={{
          borderColor: 'var(--accent-orange)',
          background: '#fef3c7'
        }}>
          <h3 className="font-bold mb-3 flex items-center gap-2 text-lg" style={{ color: 'var(--gray-900)' }}>
            <span>⚠️</span>
            <span>免責事項</span>
          </h3>
          <p className="leading-relaxed text-sm" style={{ color: 'var(--foreground)' }}>
            本サイトは一般的な情報提供を目的としており、法的助言ではありません。個別の状況に応じて、弁護士や司法書士などの専門家にご相談ください。本サイトの情報を使用した結果生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
