export function FlowDiagram() {
  const steps = [
    {
      number: 0,
      title: '支払期日を過ぎた',
      description: 'まずは3〜5日待つ',
      detail: '振込手違いの可能性',
      timing: '期日当日',
      color: 'gray',
      icon: '📅',
    },
    {
      number: 1,
      title: '1回目の入金確認メール',
      description: 'やわらかく「確認」のスタンスで連絡',
      detail: '丁寧な表現・関係維持',
      timing: '期日から3〜7日後',
      color: 'blue',
      icon: '📧',
      successRate: '回収率: 約70%',
    },
    {
      number: 2,
      title: '2回目の催促メール',
      description: '「お支払いをお願いします」と明確に伝える',
      detail: '明確な依頼・期限設定',
      timing: '1回目から7〜10日後',
      color: 'blue',
      icon: '📨',
      successRate: '回収率: 約50%',
    },
    {
      number: 3,
      title: '最終手前の催促',
      description: '「然るべき対応を検討」と伝える',
      detail: '最終警告・法的措置の示唆',
      timing: '2回目から7〜10日後',
      color: 'orange',
      icon: '⚠️',
      successRate: '回収率: 約30%',
    },
    {
      number: 4,
      title: '内容証明郵便',
      description: '法的な証拠を残す正式な通知',
      detail: '時効中断・心理的プレッシャー',
      timing: '支払期日から1ヶ月以上経過後',
      color: 'orange',
      icon: '📮',
      cost: '費用: 約1,500円',
    },
    {
      number: 5,
      title: '法的手続き',
      description: '支払督促・少額訴訟・通常訴訟',
      detail: '専門家相談推奨',
      timing: '内容証明送付から2週間後以降',
      color: 'red',
      icon: '⚖️',
      cost: '費用: 数万〜数十万円',
    },
  ];

  const getStepColor = (color: string) => {
    switch (color) {
      case 'gray':
        return {
          bg: '#f8fafc',
          border: '#94a3b8',
          number: '#64748b',
        };
      case 'blue':
        return {
          bg: '#eff6ff',
          border: '#3b82f6',
          number: '#1e40af',
        };
      case 'orange':
        return {
          bg: '#fef3c7',
          border: '#f59e0b',
          number: '#d97706',
        };
      case 'red':
        return {
          bg: '#fef2f2',
          border: '#dc2626',
          number: '#b91c1c',
        };
      default:
        return {
          bg: '#f8fafc',
          border: '#94a3b8',
          number: '#64748b',
        };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {steps.map((step, index) => {
        const colors = getStepColor(step.color);
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="relative">
            {/* ステップカード */}
            <div
              className="rounded-xl border-2 p-6 transition-all hover:shadow-lg"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-start gap-4">
                {/* アイコン & 番号 */}
                <div className="flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2"
                    style={{ backgroundColor: colors.number }}
                  >
                    {step.number}
                  </div>
                  <div className="text-3xl text-center">{step.icon}</div>
                </div>

                {/* コンテンツ */}
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--gray-900)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {step.description}
                  </p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: colors.number,
                        color: 'white',
                      }}
                    >
                      ⏱ {step.timing}
                    </span>
                    {step.successRate && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        ✓ {step.successRate}
                      </span>
                    )}
                    {step.cost && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        💰 {step.cost}
                      </span>
                    )}
                  </div>

                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    💡 {step.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* 矢印（最後のステップ以外） */}
            {!isLast && (
              <div className="flex justify-center py-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-1 h-8 mb-1"
                    style={{ backgroundColor: colors.border }}
                  ></div>
                  <div
                    className="text-2xl"
                    style={{ color: colors.border }}
                  >
                    ▼
                  </div>
                  {index === 0 && (
                    <span
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      3〜5日待つ
                    </span>
                  )}
                  {index === 1 && (
                    <span
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      7〜10日待つ
                    </span>
                  )}
                  {index === 2 && (
                    <span
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      7〜10日待つ
                    </span>
                  )}
                  {index === 3 && (
                    <span
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      1週間待つ
                    </span>
                  )}
                  {index === 4 && (
                    <span
                      className="text-xs mt-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--gray-100)',
                        color: 'var(--foreground-muted)',
                      }}
                    >
                      2週間待つ
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
