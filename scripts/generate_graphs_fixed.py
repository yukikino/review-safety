#!/usr/bin/env python3
"""
グラフ画像を生成するスクリプト（修正版）
- 凡例の配置改善
- 軸ラベルの重なり防止
- 余白の適切な確保
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import japanize_matplotlib
from pathlib import Path
import numpy as np

# 日本語フォント設定（改善版）
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 10
plt.rcParams['axes.unicode_minus'] = False  # マイナス記号の文字化け防止


def create_rating_recovery_graph():
    """評価回復グラフ（炎上後の評価推移）（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 7.5))

    # 時系列データ
    months = np.arange(0, 13)
    # 炎上前
    before_crisis = np.array([4.2] * 3)
    # 炎上発生（月3）
    crisis_point = np.array([4.2, 2.8])
    # 対応なしケース
    no_action = np.array([2.8, 2.7, 2.6, 2.5, 2.5, 2.4, 2.4, 2.3, 2.3, 2.3])
    # 適切な対応ケース
    good_action = np.array([2.8, 3.0, 3.3, 3.5, 3.7, 3.9, 4.0, 4.1, 4.2, 4.3])

    # プロット
    ax.plot([0, 1, 2], before_crisis, 'o-', color='#4CAF50', linewidth=2.5,
            markersize=8, label='炎上前')
    ax.plot([2, 3], crisis_point, 'o-', color='#F44336', linewidth=2.5,
            markersize=10, label='炎上発生')
    ax.plot(months[3:], no_action, 'o--', color='#9E9E9E', linewidth=2,
            markersize=6, label='対応なしケース', alpha=0.7)
    ax.plot(months[3:], good_action, 'o-', color='#2196F3', linewidth=2.5,
            markersize=8, label='適切な対応ケース')

    # 炎上ポイントを強調
    ax.annotate('炎上発生', xy=(3, 2.8), xytext=(4.2, 2.0),
                arrowprops=dict(arrowstyle='->', color='#F44336', lw=2),
                fontsize=11, fontweight='bold', color='#F44336')

    # 回復ポイントを強調
    ax.annotate('適切な対応で\n評価回復', xy=(10, 4.2), xytext=(7.5, 4.7),
                arrowprops=dict(arrowstyle='->', color='#2196F3', lw=2),
                fontsize=10, fontweight='bold', color='#2196F3')

    # 対応なしの悪化を強調
    ax.annotate('対応なしだと\nさらに悪化', xy=(10, 2.3), xytext=(7, 1.7),
                arrowprops=dict(arrowstyle='->', color='#9E9E9E', lw=2),
                fontsize=10, fontweight='bold', color='#616161')

    # グラフ設定
    ax.set_xlabel('経過月数', fontsize=12, fontweight='bold')
    ax.set_ylabel('平均評価（★）', fontsize=12, fontweight='bold')
    ax.set_title('炎上後の評価推移グラフ', fontsize=14, fontweight='bold', pad=20)
    ax.set_ylim(1.5, 5.2)
    ax.set_xlim(-0.5, 12.5)
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.legend(loc='lower right', fontsize=10, framealpha=0.9)

    # 星評価の目安線
    for rating in [2.0, 3.0, 4.0, 5.0]:
        ax.axhline(y=rating, color='#E0E0E0', linestyle=':', linewidth=1, alpha=0.5)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/bridge/images/rating-recovery-graph.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_response_time_impact_graph():
    """返信速度と顧客満足度の相関グラフ（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 7.5))

    # データ
    response_hours = np.array([1, 3, 6, 12, 24, 48, 72, 168])
    satisfaction_rate = np.array([92, 88, 82, 75, 68, 58, 48, 35])

    # 棒グラフ
    colors = ['#4CAF50', '#66BB6A', '#81C784', '#FDD835', '#FFB300', '#FF8F00', '#FF6F00', '#E65100']
    bars = ax.bar(range(len(response_hours)), satisfaction_rate, color=colors,
                   edgecolor='black', linewidth=1.5, alpha=0.8, width=0.7)

    # 値をバーの上に表示
    for i, (bar, rate) in enumerate(zip(bars, satisfaction_rate)):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 2,
                f'{rate}%', ha='center', va='bottom', fontsize=9, fontweight='bold')

    # 理想ラインを引く
    ax.axhline(y=80, color='#2196F3', linestyle='--', linewidth=2, label='理想水準（80%以上）')

    # グラフ設定
    ax.set_xlabel('返信までの時間', fontsize=12, fontweight='bold')
    ax.set_ylabel('顧客満足度（%）', fontsize=12, fontweight='bold')
    ax.set_title('返信速度と顧客満足度の相関', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticks(range(len(response_hours)))
    ax.set_xticklabels(['1時間', '3時間', '6時間', '12時間', '24時間', '48時間', '3日', '1週間'],
                       rotation=15, ha='right')
    ax.set_ylim(0, 100)
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.legend(loc='upper right', fontsize=10)

    # 推奨ゾーンを強調
    ax.axvspan(-0.5, 3.5, alpha=0.1, color='green')
    ax.text(1.5, 95, '推奨ゾーン', ha='center', va='center', fontsize=11,
            fontweight='bold', color='#2E7D32',
            bbox=dict(boxstyle='round', facecolor='#C8E6C9', alpha=0.7))

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/response-time-impact-graph.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_meo_ranking_improvement_graph():
    """MEO順位改善グラフ（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 7.5))

    # 返信率とMEO順位のデータ
    response_rate = np.array([0, 20, 40, 60, 80, 100])
    meo_ranking = np.array([15, 12, 8, 5, 3, 2])

    # 折れ線グラフ
    ax.plot(response_rate, meo_ranking, 'o-', color='#FF9800', linewidth=3,
            markersize=12, markeredgecolor='black', markeredgewidth=1.5)

    # 各ポイントに順位を表示
    for x, y in zip(response_rate, meo_ranking):
        ax.text(x, y - 0.8, f'{y}位', ha='center', va='top',
                fontsize=11, fontweight='bold', color='#E65100')

    # グラフ設定
    ax.set_xlabel('口コミ返信率（%）', fontsize=12, fontweight='bold')
    ax.set_ylabel('MEO検索順位', fontsize=12, fontweight='bold')
    ax.set_title('口コミ返信率とMEO順位の関係', fontsize=14, fontweight='bold', pad=20)
    ax.set_xlim(-5, 105)
    ax.set_ylim(16, 0)
    ax.grid(True, alpha=0.3, linestyle='--')

    # 目標ラインを引く
    ax.axhline(y=3, color='#4CAF50', linestyle='--', linewidth=2, label='目標順位（3位以内）')
    ax.axvline(x=80, color='#2196F3', linestyle='--', linewidth=2, label='推奨返信率（80%以上）')

    # 推奨ゾーンを強調
    ax.fill_between([80, 100], 0, 16, alpha=0.1, color='green')
    ax.text(90, 14, '推奨ゾーン\n（返信率80%以上）', ha='center', va='center',
            fontsize=10, fontweight='bold', color='#2E7D32',
            bbox=dict(boxstyle='round', facecolor='#C8E6C9', alpha=0.7))

    ax.legend(loc='upper right', fontsize=10)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/bridge/images/meo-ranking-improvement-graph.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_review_response_roi_graph():
    """口コミ返信のROIグラフ（改善版）"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6.5))

    # 左側：コスト vs 売上増加
    categories = ['対応なし', '月10件\n返信', '月30件\n返信', '全件返信']
    costs = [0, 2, 5, 10]
    revenue_increase = [0, 15, 35, 60]

    x = np.arange(len(categories))
    width = 0.35

    bars1 = ax1.bar(x - width/2, costs, width, label='コスト（万円/月）',
                    color='#FF6B6B', edgecolor='black', linewidth=1.5)
    bars2 = ax1.bar(x + width/2, revenue_increase, width, label='売上増加（万円/月）',
                    color='#4CAF50', edgecolor='black', linewidth=1.5)

    # 値を表示
    for bars in [bars1, bars2]:
        for bar in bars:
            height = bar.get_height()
            ax1.text(bar.get_x() + bar.get_width()/2., height + 1.5,
                    f'{height}万円', ha='center', va='bottom', fontsize=9)

    ax1.set_xlabel('返信対応レベル', fontsize=11, fontweight='bold')
    ax1.set_ylabel('金額（万円/月）', fontsize=11, fontweight='bold')
    ax1.set_title('コストと売上増加', fontsize=12, fontweight='bold')
    ax1.set_xticks(x)
    ax1.set_xticklabels(categories, fontsize=9)
    ax1.legend(loc='upper left', fontsize=9)
    ax1.grid(axis='y', alpha=0.3, linestyle='--')

    # 右側：ROI
    roi = [0, 650, 600, 500]

    bars3 = ax2.bar(categories, roi, color=['#BDBDBD', '#81C784', '#66BB6A', '#4CAF50'],
                    edgecolor='black', linewidth=1.5, width=0.6)

    # 値を表示
    for bar, r in zip(bars3, roi):
        height = bar.get_height()
        if r > 0:
            ax2.text(bar.get_x() + bar.get_width()/2., height + 20,
                    f'{r}%', ha='center', va='bottom', fontsize=10, fontweight='bold')

    ax2.set_xlabel('返信対応レベル', fontsize=11, fontweight='bold')
    ax2.set_ylabel('ROI（%）', fontsize=11, fontweight='bold')
    ax2.set_title('投資対効果（ROI）', fontsize=12, fontweight='bold')
    ax2.set_xticklabels(categories, fontsize=9)
    ax2.grid(axis='y', alpha=0.3, linestyle='--')

    # 目標ラインを引く
    ax2.axhline(y=500, color='#2196F3', linestyle='--', linewidth=2, label='目標ROI（500%）')
    ax2.legend(loc='upper right', fontsize=9)

    plt.tight_layout(pad=2.0)

    output_path = Path('content/bridge/images/review-response-roi-graph.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_crisis_damage_comparison():
    """炎上被害額の比較グラフ（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 8.5))

    # データ
    damage_categories = ['売上減少', '広告費\n増加', 'レピュテーション\nマネジメント費用',
                        '弁護士費用', '人件費\n（対応工数）']

    no_response = [500, 200, 0, 100, 50]
    bad_response = [400, 150, 50, 80, 80]
    good_response = [100, 50, 100, 30, 100]

    x = np.arange(len(damage_categories))
    width = 0.25

    bars1 = ax.bar(x - width, no_response, width, label='対応なし',
                   color='#E57373', edgecolor='black', linewidth=1.5)
    bars2 = ax.bar(x, bad_response, width, label='不適切な対応',
                   color='#FFB74D', edgecolor='black', linewidth=1.5)
    bars3 = ax.bar(x + width, good_response, width, label='適切な対応',
                   color='#81C784', edgecolor='black', linewidth=1.5)

    # 各バーの上に値を表示
    for bars in [bars1, bars2, bars3]:
        for bar in bars:
            height = bar.get_height()
            if height > 0:
                ax.text(bar.get_x() + bar.get_width()/2., height + 10,
                       f'{int(height)}万', ha='center', va='bottom', fontsize=8)

    # 合計を表示
    total_no = sum(no_response)
    total_bad = sum(bad_response)
    total_good = sum(good_response)

    ax.text(len(damage_categories) - 1 - width, total_no + 60,
            f'合計: {total_no}万円', ha='center', va='bottom',
            fontsize=10, fontweight='bold', color='#C62828',
            bbox=dict(boxstyle='round', facecolor='#FFCDD2', alpha=0.8))
    ax.text(len(damage_categories) - 1, total_bad + 60,
            f'合計: {total_bad}万円', ha='center', va='bottom',
            fontsize=10, fontweight='bold', color='#E65100',
            bbox=dict(boxstyle='round', facecolor='#FFE0B2', alpha=0.8))
    ax.text(len(damage_categories) - 1 + width, total_good + 60,
            f'合計: {total_good}万円', ha='center', va='bottom',
            fontsize=10, fontweight='bold', color='#2E7D32',
            bbox=dict(boxstyle='round', facecolor='#C8E6C9', alpha=0.8))

    # グラフ設定
    ax.set_xlabel('被害項目', fontsize=12, fontweight='bold')
    ax.set_ylabel('被害額（万円）', fontsize=12, fontweight='bold')
    ax.set_title('炎上被害額の比較（対応別）', fontsize=14, fontweight='bold', pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(damage_categories, fontsize=9)
    ax.legend(loc='upper left', fontsize=10)
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.set_ylim(0, 650)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/crisis-damage-comparison.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_review_volume_trend():
    """口コミ件数推移グラフ（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 7.5))

    # 月次データ
    months = np.arange(1, 13)
    before_policy = np.array([5, 4, 6, 5, 7, 8])
    after_policy = np.array([8, 12, 15, 18, 20, 22])

    # エリアプロット
    ax.plot(months[:6], before_policy, 'o-', color='#9E9E9E', linewidth=2.5,
            markersize=8, label='返信施策前')
    ax.plot(months[6:], after_policy, 'o-', color='#4CAF50', linewidth=2.5,
            markersize=8, label='返信施策後')

    # 施策開始ラインを引く
    ax.axvline(x=6, color='#F44336', linestyle='--', linewidth=2, label='返信施策開始')

    # 施策開始を強調
    ax.annotate('返信施策開始', xy=(6, 20), xytext=(7.8, 23),
                arrowprops=dict(arrowstyle='->', color='#F44336', lw=2),
                fontsize=10, fontweight='bold', color='#F44336')

    # 増加を強調
    ax.annotate('口コミ件数\n2.75倍に増加', xy=(12, 22), xytext=(9.5, 25),
                arrowprops=dict(arrowstyle='->', color='#4CAF50', lw=2),
                fontsize=10, fontweight='bold', color='#2E7D32')

    # グラフ設定
    ax.set_xlabel('月', fontsize=12, fontweight='bold')
    ax.set_ylabel('口コミ件数（件/月）', fontsize=12, fontweight='bold')
    ax.set_title('口コミ件数推移（返信施策前後）', fontsize=14, fontweight='bold', pad=20)
    ax.set_xlim(0.5, 12.5)
    ax.set_ylim(0, 28)
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.legend(loc='upper left', fontsize=10)

    # 背景色で期間を分ける
    ax.axvspan(0.5, 6, alpha=0.1, color='gray')
    ax.axvspan(6, 12.5, alpha=0.1, color='green')

    plt.tight_layout(pad=1.5)

    output_path = Path('content/bridge/images/review-volume-trend.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


if __name__ == "__main__":
    print("グラフ画像を生成中（修正版）...")
    print()

    create_rating_recovery_graph()
    create_response_time_impact_graph()
    create_meo_ranking_improvement_graph()
    create_review_response_roi_graph()
    create_crisis_damage_comparison()
    create_review_volume_trend()

    print()
    print("✅ すべてのグラフ画像を生成しました（修正版）！")
