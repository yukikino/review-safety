#!/usr/bin/env python3
"""
フローチャート画像を生成するスクリプト（修正版）
- ボックスサイズの最適化
- テキスト配置の改善
- 余白の適切な確保
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import japanize_matplotlib
from pathlib import Path

# 日本語フォント設定（改善版）
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 10
plt.rcParams['axes.unicode_minus'] = False


def create_twitter_crisis_scale_flowchart():
    """Twitter炎上規模の判定フローチャート（改善版）"""
    fig, ax = plt.subplots(figsize=(13, 11))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(5, 9.6, 'Twitter炎上規模の判定フローチャート',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # スタート（ボックスサイズを拡大）
    start_box = FancyBboxPatch((3.8, 8.6), 2.4, 0.7,
                               boxstyle="round,pad=0.12",
                               edgecolor='black', facecolor='#4CAF50', linewidth=2)
    ax.add_patch(start_box)
    ax.text(5, 8.95, '炎上検知', ha='center', va='center', fontsize=11, fontweight='bold', color='white')

    # 矢印（間隔を広げる）
    ax.annotate('', xy=(5, 8.6), xytext=(5, 8.1),
                arrowprops=dict(arrowstyle='->', lw=2))

    # RT数チェック（ボックスサイズを拡大）
    rt_box = FancyBboxPatch((3.2, 7.3), 3.6, 0.75,
                           boxstyle="round,pad=0.12",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(rt_box)
    ax.text(5, 7.675, 'RT数を確認', ha='center', va='center', fontsize=10, fontweight='bold')

    # RT数による分岐（ラベル位置を調整）
    ax.annotate('', xy=(1.8, 6.6), xytext=(3.8, 7.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(2.6, 7.0, 'RT < 100', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

    ax.annotate('', xy=(5, 6.6), xytext=(5, 7.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(5.6, 7.0, '100 ≤ RT < 1000', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

    ax.annotate('', xy=(8.2, 6.6), xytext=(6.2, 7.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(7.4, 7.0, 'RT ≥ 1000', ha='center', va='center', fontsize=9,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

    # レベル1: 小規模炎上（ボックスサイズ拡大）
    level1_box = FancyBboxPatch((0.3, 5.7), 3.2, 0.85,
                               boxstyle="round,pad=0.12",
                               edgecolor='black', facecolor='#90EE90', linewidth=2)
    ax.add_patch(level1_box)
    ax.text(1.9, 6.3, 'レベル1', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(1.9, 5.95, '小規模炎上', ha='center', va='center', fontsize=10)

    # レベル1の対応（ボックスサイズと間隔を調整）
    level1_action = FancyBboxPatch((0.3, 4.1), 3.2, 1.4,
                                  boxstyle="round,pad=0.12",
                                  edgecolor='#388E3C', facecolor='#F1F8E9', linewidth=1.5)
    ax.add_patch(level1_action)
    ax.text(1.9, 5.2, '【対応】', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(0.6, 4.8, '・削除判断', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 4.5, '・個別返信', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 4.2, '・24時間監視', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(1.9, 5.7), xytext=(1.9, 5.5),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # レベル2: 中規模炎上
    level2_box = FancyBboxPatch((3.4, 5.7), 3.2, 0.85,
                               boxstyle="round,pad=0.12",
                               edgecolor='black', facecolor='#FFD54F', linewidth=2)
    ax.add_patch(level2_box)
    ax.text(5, 6.3, 'レベル2', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(5, 5.95, '中規模炎上', ha='center', va='center', fontsize=10)

    # レベル2の対応
    level2_action = FancyBboxPatch((3.4, 3.6), 3.2, 1.9,
                                  boxstyle="round,pad=0.12",
                                  edgecolor='#F57C00', facecolor='#FFF8E1', linewidth=1.5)
    ax.add_patch(level2_action)
    ax.text(5, 5.2, '【対応】', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(3.7, 4.85, '・公式謝罪ツイート', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 4.55, '・削除判断', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 4.25, '・弁護士相談検討', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 3.95, '・エゴサーチ強化', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(5, 5.7), xytext=(5, 5.5),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # レベル3: 大規模炎上
    level3_box = FancyBboxPatch((6.5, 5.7), 3.2, 0.85,
                               boxstyle="round,pad=0.12",
                               edgecolor='black', facecolor='#FF6B6B', linewidth=2)
    ax.add_patch(level3_box)
    ax.text(8.1, 6.3, 'レベル3', ha='center', va='center', fontsize=11, fontweight='bold', color='white')
    ax.text(8.1, 5.95, '大規模炎上', ha='center', va='center', fontsize=10, color='white')

    # レベル3の対応
    level3_action = FancyBboxPatch((6.5, 2.5), 3.2, 3.0,
                                  boxstyle="round,pad=0.12",
                                  edgecolor='#C62828', facecolor='#FFEBEE', linewidth=1.5)
    ax.add_patch(level3_action)
    ax.text(8.1, 5.2, '【緊急対応】', ha='center', va='center', fontsize=9, fontweight='bold', color='#C62828')
    ax.text(6.8, 4.85, '・即座に公式謝罪', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 4.55, '・弁護士即時相談', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 4.25, '・広報コンサル', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 3.95, '・プレスリリース準備', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 3.65, '・問い合わせ対応', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 3.35, '  体制強化', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 3.05, '・経営陣への報告', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(8.1, 5.7), xytext=(8.1, 5.5),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # 凡例（余白を確保）
    legend_y = 1.6
    legend_box = FancyBboxPatch((0.5, legend_y - 0.5), 9, 1.0,
                               boxstyle="round,pad=0.12",
                               edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=1.5)
    ax.add_patch(legend_box)
    ax.text(5, legend_y + 0.35, '【判定基準】', ha='center', va='center', fontsize=9, fontweight='bold', color='#1565C0')
    ax.text(1, legend_y, '小規模: RT < 100, リプライ < 20', ha='left', va='center', fontsize=8)
    ax.text(1, legend_y - 0.3, '中規模: 100 ≤ RT < 1000, リプライ ≥ 50', ha='left', va='center', fontsize=8)
    ax.text(5.5, legend_y, '大規模: RT ≥ 1000, まとめサイト転載', ha='left', va='center', fontsize=8)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/twitter-crisis-scale-flowchart.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_crisis_24hour_timeline():
    """炎上初動24時間のタイムライン（改善版）"""
    fig, ax = plt.subplots(figsize=(15, 8.5))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8.5)
    ax.axis('off')

    # タイトル
    ax.text(7, 8.1, '炎上初動24時間のタイムライン',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # タイムライン軸
    ax.plot([1, 13], [7.0, 7.0], 'k-', linewidth=2)

    # 時間帯
    times = [
        (2, '0-1時間'),
        (5, '1-3時間'),
        (8, '3-6時間'),
        (11, '6-24時間')
    ]

    colors = ['#FF6B6B', '#FFA500', '#FFD700', '#90EE90']

    for i, (x, time_label) in enumerate(times):
        # タイムポイント
        ax.plot(x, 7.0, 'o', markersize=16, color=colors[i], markeredgecolor='black', markeredgewidth=2)
        ax.text(x, 7.5, time_label, ha='center', va='center', fontsize=10, fontweight='bold')

    # 各時間帯の詳細ボックス（サイズと間隔を調整）
    # 0-1時間
    box1 = FancyBboxPatch((0.4, 3.7), 2.8, 2.8,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFE5E5', linewidth=2)
    ax.add_patch(box1)
    ax.text(1.8, 6.2, '【0-1時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#C62828')
    ax.text(1.8, 5.8, '炎上検知', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(0.6, 5.4, '✓ RT数確認', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 5.1, '✓ リプライ数確認', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 4.8, '✓ エゴサーチ', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 4.5, '✓ スクショ保存', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(0.6, 4.2, '✓ 社内報告', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(2, 6.8), xytext=(1.8, 6.5),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#C62828'))

    # 1-3時間
    box2 = FancyBboxPatch((3.5, 3.7), 2.8, 2.8,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFF0E0', linewidth=2)
    ax.add_patch(box2)
    ax.text(4.9, 6.2, '【1-3時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#E65100')
    ax.text(4.9, 5.8, '削除判断', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(3.7, 5.4, '✓ 削除すべきか判断', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 5.1, '✓ 誤情報なら削除', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 4.8, '✓ 拡散済みなら残す', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 4.5, '✓ 削除前にスクショ', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(3.7, 4.2, '✓ 削除を謝罪で言及', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(5, 6.8), xytext=(4.9, 6.5),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#E65100'))

    # 3-6時間
    box3 = FancyBboxPatch((6.6, 3.7), 2.8, 2.8,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFFACD', linewidth=2)
    ax.add_patch(box3)
    ax.text(8.0, 6.2, '【3-6時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#F57C00')
    ax.text(8.0, 5.8, '公式謝罪', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(6.8, 5.4, '✓ 謝罪ツイート作成', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 5.1, '✓ 冒頭で謝罪', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 4.8, '✓ 問題点を説明', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 4.5, '✓ 再発防止策提示', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(6.8, 4.2, '✓ 言い訳は避ける', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(8, 6.8), xytext=(8.0, 6.5),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#F57C00'))

    # 6-24時間
    box4 = FancyBboxPatch((9.7, 3.7), 2.8, 2.8,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#E8F5E9', linewidth=2)
    ax.add_patch(box4)
    ax.text(11.1, 6.2, '【6-24時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#2E7D32')
    ax.text(11.1, 5.8, '継続監視', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(9.9, 5.4, '✓ エゴサーチ継続', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(9.9, 5.1, '✓ SNS監視ツール', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(9.9, 4.8, '✓ 追加対応検討', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(9.9, 4.5, '✓ プレスリリース', ha='left', va='center', fontsize=8, linespacing=1.5)
    ax.text(9.9, 4.2, '✓ 謝罪動画検討', ha='left', va='center', fontsize=8, linespacing=1.5)

    ax.annotate('', xy=(11, 6.8), xytext=(11.1, 6.5),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#2E7D32'))

    # 重要度を示すバー
    ax.text(7, 2.7, '重要度', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.barh([2.2], [12], left=[1], height=0.35, color='#FF6B6B', alpha=0.3, edgecolor='none')
    ax.barh([2.2], [9], left=[1], height=0.35, color='#FF6B6B', alpha=0.5, edgecolor='none')
    ax.barh([2.2], [6], left=[1], height=0.35, color='#FF6B6B', alpha=0.7, edgecolor='none')
    ax.barh([2.2], [3], left=[1], height=0.35, color='#FF6B6B', alpha=1.0, edgecolor='none')

    ax.text(1, 1.7, '最重要', ha='left', va='center', fontsize=8, color='#C62828', fontweight='bold')
    ax.text(13, 1.7, '通常監視', ha='right', va='center', fontsize=8, color='#2E7D32', fontweight='bold')

    # 注釈
    note_box = FancyBboxPatch((1, 0.5), 12, 0.8,
                             boxstyle="round,pad=0.15",
                             edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=1.5)
    ax.add_patch(note_box)
    ax.text(7, 0.9, '※ 初動24時間が最も重要。この期間の対応で被害の規模が決まります。',
            ha='center', va='center', fontsize=9, style='italic')

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/crisis-24hour-timeline.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


# 残りの関数は元のスクリプトから流用（長いため省略）
# create_tweet_deletion_decision_chart()
# create_twitter_report_procedure()
# create_google_removal_request_procedure()
# create_sns_pre_post_checklist()


if __name__ == "__main__":
    print("フローチャート画像を生成中（修正版 - 一部のみ）...")
    print()

    create_twitter_crisis_scale_flowchart()
    create_crisis_24hour_timeline()

    print()
    print("✅ 主要フローチャート画像を生成しました（修正版）！")
    print("※ 残りのフローチャートは元のスクリプトを使用してください")
