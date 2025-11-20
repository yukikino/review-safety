#!/usr/bin/env python3
"""
フローチャート画像を生成するスクリプト
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import japanize_matplotlib
from pathlib import Path

# 日本語フォント設定
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 10

def create_twitter_crisis_scale_flowchart():
    """Twitter炎上規模の判定フローチャート"""
    fig, ax = plt.subplots(figsize=(12, 10))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(5, 9.5, 'Twitter炎上規模の判定フローチャート',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # スタート
    start_box = FancyBboxPatch((4, 8.5), 2, 0.6,
                               boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='#4CAF50', linewidth=2)
    ax.add_patch(start_box)
    ax.text(5, 8.8, '炎上検知', ha='center', va='center', fontsize=11, fontweight='bold', color='white')

    # 矢印
    ax.annotate('', xy=(5, 8.5), xytext=(5, 8.0),
                arrowprops=dict(arrowstyle='->', lw=2))

    # RT数チェック
    rt_box = FancyBboxPatch((3.5, 7.2), 3, 0.7,
                           boxstyle="round,pad=0.1",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(rt_box)
    ax.text(5, 7.55, 'RT数を確認', ha='center', va='center', fontsize=10, fontweight='bold')

    # RT数による分岐
    ax.annotate('', xy=(2, 6.5), xytext=(4, 7.2),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(2.8, 6.9, 'RT < 100', ha='center', va='center', fontsize=9)

    ax.annotate('', xy=(5, 6.5), xytext=(5, 7.2),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(5.5, 6.9, '100 ≤ RT < 1000', ha='center', va='center', fontsize=9)

    ax.annotate('', xy=(8, 6.5), xytext=(6, 7.2),
                arrowprops=dict(arrowstyle='->', lw=1.5))
    ax.text(7.2, 6.9, 'RT ≥ 1000', ha='center', va='center', fontsize=9)

    # レベル1: 小規模炎上
    level1_box = FancyBboxPatch((0.5, 5.5), 3, 0.8,
                               boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='#90EE90', linewidth=2)
    ax.add_patch(level1_box)
    ax.text(2, 6.1, 'レベル1', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(2, 5.8, '小規模炎上', ha='center', va='center', fontsize=10)

    # レベル1の対応
    level1_action = FancyBboxPatch((0.5, 4.0), 3, 1.3,
                                  boxstyle="round,pad=0.1",
                                  edgecolor='#388E3C', facecolor='#F1F8E9', linewidth=1.5)
    ax.add_patch(level1_action)
    ax.text(2, 5.0, '【対応】', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(2, 4.65, '・削除判断', ha='left', va='center', fontsize=8)
    ax.text(2, 4.35, '・個別返信', ha='left', va='center', fontsize=8)
    ax.text(2, 4.05, '・24時間監視', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(2, 5.5), xytext=(2, 5.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # レベル2: 中規模炎上
    level2_box = FancyBboxPatch((3.5, 5.5), 3, 0.8,
                               boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='#FFD54F', linewidth=2)
    ax.add_patch(level2_box)
    ax.text(5, 6.1, 'レベル2', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(5, 5.8, '中規模炎上', ha='center', va='center', fontsize=10)

    # レベル2の対応
    level2_action = FancyBboxPatch((3.5, 3.5), 3, 1.8,
                                  boxstyle="round,pad=0.1",
                                  edgecolor='#F57C00', facecolor='#FFF8E1', linewidth=1.5)
    ax.add_patch(level2_action)
    ax.text(5, 5.0, '【対応】', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(5, 4.65, '・公式謝罪ツイート', ha='left', va='center', fontsize=8)
    ax.text(5, 4.35, '・削除判断', ha='left', va='center', fontsize=8)
    ax.text(5, 4.05, '・弁護士相談検討', ha='left', va='center', fontsize=8)
    ax.text(5, 3.75, '・エゴサーチ強化', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(5, 5.5), xytext=(5, 5.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # レベル3: 大規模炎上
    level3_box = FancyBboxPatch((6.5, 5.5), 3, 0.8,
                               boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='#FF6B6B', linewidth=2)
    ax.add_patch(level3_box)
    ax.text(8, 6.1, 'レベル3', ha='center', va='center', fontsize=11, fontweight='bold', color='white')
    ax.text(8, 5.8, '大規模炎上', ha='center', va='center', fontsize=10, color='white')

    # レベル3の対応
    level3_action = FancyBboxPatch((6.5, 2.5), 3, 2.8,
                                  boxstyle="round,pad=0.1",
                                  edgecolor='#C62828', facecolor='#FFEBEE', linewidth=1.5)
    ax.add_patch(level3_action)
    ax.text(8, 5.0, '【緊急対応】', ha='center', va='center', fontsize=9, fontweight='bold', color='#C62828')
    ax.text(8, 4.65, '・即座に公式謝罪', ha='left', va='center', fontsize=8)
    ax.text(8, 4.35, '・弁護士即時相談', ha='left', va='center', fontsize=8)
    ax.text(8, 4.05, '・広報コンサル', ha='left', va='center', fontsize=8)
    ax.text(8, 3.75, '・プレスリリース準備', ha='left', va='center', fontsize=8)
    ax.text(8, 3.45, '・問い合わせ対応', ha='left', va='center', fontsize=8)
    ax.text(8, 3.15, '  体制強化', ha='left', va='center', fontsize=8)
    ax.text(8, 2.85, '・経営陣への報告', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(8, 5.5), xytext=(8, 5.3),
                arrowprops=dict(arrowstyle='->', lw=1.5))

    # 凡例
    legend_y = 1.5
    ax.text(5, legend_y + 0.3, '【判定基準】', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(1.5, legend_y, '小規模: RT < 100, リプライ < 20', ha='left', va='center', fontsize=8)
    ax.text(1.5, legend_y - 0.3, '中規模: 100 ≤ RT < 1000, リプライ ≥ 50', ha='left', va='center', fontsize=8)
    ax.text(1.5, legend_y - 0.6, '大規模: RT ≥ 1000, まとめサイト転載', ha='left', va='center', fontsize=8)

    plt.tight_layout()

    output_path = Path('content/platform-specific/images/twitter-crisis-scale-flowchart.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_crisis_24hour_timeline():
    """炎上初動24時間のタイムライン"""
    fig, ax = plt.subplots(figsize=(14, 8))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 8)
    ax.axis('off')

    # タイトル
    ax.text(7, 7.5, '炎上初動24時間のタイムライン',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # タイムライン軸
    ax.plot([1, 13], [6.5, 6.5], 'k-', linewidth=2)

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
        ax.plot(x, 6.5, 'o', markersize=15, color=colors[i], markeredgecolor='black', markeredgewidth=2)
        ax.text(x, 7.0, time_label, ha='center', va='center', fontsize=10, fontweight='bold')

    # 各時間帯の詳細ボックス
    # 0-1時間
    box1 = FancyBboxPatch((0.5, 3.5), 2.5, 2.5,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFE5E5', linewidth=2)
    ax.add_patch(box1)
    ax.text(1.75, 5.7, '【0-1時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#C62828')
    ax.text(1.75, 5.3, '炎上検知', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(0.7, 4.9, '✓ RT数確認', ha='left', va='center', fontsize=8)
    ax.text(0.7, 4.6, '✓ リプライ数確認', ha='left', va='center', fontsize=8)
    ax.text(0.7, 4.3, '✓ エゴサーチ', ha='left', va='center', fontsize=8)
    ax.text(0.7, 4.0, '✓ スクショ保存', ha='left', va='center', fontsize=8)
    ax.text(0.7, 3.7, '✓ 社内報告', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(2, 6.3), xytext=(1.75, 6.0),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#C62828'))

    # 1-3時間
    box2 = FancyBboxPatch((3.5, 3.5), 2.5, 2.5,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFF0E0', linewidth=2)
    ax.add_patch(box2)
    ax.text(4.75, 5.7, '【1-3時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#E65100')
    ax.text(4.75, 5.3, '削除判断', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(3.7, 4.9, '✓ 削除すべきか判断', ha='left', va='center', fontsize=8)
    ax.text(3.7, 4.6, '✓ 誤情報なら削除', ha='left', va='center', fontsize=8)
    ax.text(3.7, 4.3, '✓ 拡散済みなら残す', ha='left', va='center', fontsize=8)
    ax.text(3.7, 4.0, '✓ 削除前にスクショ', ha='left', va='center', fontsize=8)
    ax.text(3.7, 3.7, '✓ 削除を謝罪で言及', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(5, 6.3), xytext=(4.75, 6.0),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#E65100'))

    # 3-6時間
    box3 = FancyBboxPatch((6.5, 3.5), 2.5, 2.5,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#FFFACD', linewidth=2)
    ax.add_patch(box3)
    ax.text(7.75, 5.7, '【3-6時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#F57C00')
    ax.text(7.75, 5.3, '公式謝罪', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(6.7, 4.9, '✓ 謝罪ツイート作成', ha='left', va='center', fontsize=8)
    ax.text(6.7, 4.6, '✓ 冒頭で謝罪', ha='left', va='center', fontsize=8)
    ax.text(6.7, 4.3, '✓ 問題点を説明', ha='left', va='center', fontsize=8)
    ax.text(6.7, 4.0, '✓ 再発防止策提示', ha='left', va='center', fontsize=8)
    ax.text(6.7, 3.7, '✓ 言い訳は避ける', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(8, 6.3), xytext=(7.75, 6.0),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#F57C00'))

    # 6-24時間
    box4 = FancyBboxPatch((9.5, 3.5), 2.5, 2.5,
                          boxstyle="round,pad=0.15",
                          edgecolor='black', facecolor='#E8F5E9', linewidth=2)
    ax.add_patch(box4)
    ax.text(10.75, 5.7, '【6-24時間】', ha='center', va='center', fontsize=10, fontweight='bold', color='#2E7D32')
    ax.text(10.75, 5.3, '継続監視', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(9.7, 4.9, '✓ エゴサーチ継続', ha='left', va='center', fontsize=8)
    ax.text(9.7, 4.6, '✓ SNS監視ツール', ha='left', va='center', fontsize=8)
    ax.text(9.7, 4.3, '✓ 追加対応検討', ha='left', va='center', fontsize=8)
    ax.text(9.7, 4.0, '✓ プレスリリース', ha='left', va='center', fontsize=8)
    ax.text(9.7, 3.7, '✓ 謝罪動画検討', ha='left', va='center', fontsize=8)

    ax.annotate('', xy=(11, 6.3), xytext=(10.75, 6.0),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='#2E7D32'))

    # 重要度を示すバー
    ax.text(7, 2.5, '重要度', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.barh([2], [12], left=[1], height=0.3, color='#FF6B6B', alpha=0.3)
    ax.barh([2], [9], left=[1], height=0.3, color='#FF6B6B', alpha=0.5)
    ax.barh([2], [6], left=[1], height=0.3, color='#FF6B6B', alpha=0.7)
    ax.barh([2], [3], left=[1], height=0.3, color='#FF6B6B', alpha=1.0)

    ax.text(1, 1.5, '最重要', ha='left', va='center', fontsize=8, color='#C62828')
    ax.text(13, 1.5, '通常監視', ha='right', va='center', fontsize=8, color='#2E7D32')

    # 注釈
    ax.text(7, 0.8, '※ 初動24時間が最も重要。この期間の対応で被害の規模が決まります。',
            ha='center', va='center', fontsize=9, style='italic')

    plt.tight_layout()

    output_path = Path('content/platform-specific/images/crisis-24hour-timeline.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_tweet_deletion_decision_chart():
    """ツイート削除判断チャート"""
    fig, ax = plt.subplots(figsize=(12, 9))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 9)
    ax.axis('off')

    # タイトル
    ax.text(6, 8.5, 'ツイート削除判断チャート',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # スタート
    start_box = FancyBboxPatch((4.5, 7.5), 3, 0.6,
                               boxstyle="round,pad=0.1",
                               edgecolor='black', facecolor='#2196F3', linewidth=2)
    ax.add_patch(start_box)
    ax.text(6, 7.8, '炎上ツイート発見', ha='center', va='center', fontsize=11, fontweight='bold', color='white')

    # 質問1: 誤情報・差別的表現・法的リスク
    ax.annotate('', xy=(6, 7.5), xytext=(6, 7.0),
                arrowprops=dict(arrowstyle='->', lw=2))

    q1_box = FancyBboxPatch((3, 6.0), 6, 0.9,
                           boxstyle="round,pad=0.1",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(q1_box)
    ax.text(6, 6.6, '明らかな誤情報・差別的表現・', ha='center', va='center', fontsize=10)
    ax.text(6, 6.3, '法的リスクが含まれているか？', ha='center', va='center', fontsize=10)

    # YES -> 削除
    ax.annotate('', xy=(9.5, 6.45), xytext=(9, 6.45),
                arrowprops=dict(arrowstyle='->', lw=2, color='#4CAF50'))
    ax.text(9.2, 6.7, 'YES', ha='center', va='center', fontsize=9, fontweight='bold', color='#4CAF50')

    delete_box1 = FancyBboxPatch((9.5, 6.0), 2, 0.9,
                                boxstyle="round,pad=0.1",
                                edgecolor='#4CAF50', facecolor='#C8E6C9', linewidth=2)
    ax.add_patch(delete_box1)
    ax.text(10.5, 6.6, '削除すべき', ha='center', va='center', fontsize=10, fontweight='bold', color='#2E7D32')
    ax.text(10.5, 6.25, '（即座に削除）', ha='center', va='center', fontsize=8, color='#2E7D32')

    # NO -> 次の質問
    ax.annotate('', xy=(6, 6.0), xytext=(6, 5.5),
                arrowprops=dict(arrowstyle='->', lw=2))
    ax.text(6.3, 5.75, 'NO', ha='left', va='center', fontsize=9, fontweight='bold')

    # 質問2: RT数
    q2_box = FancyBboxPatch((3.5, 4.5), 5, 0.9,
                           boxstyle="round,pad=0.1",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(q2_box)
    ax.text(6, 5.1, 'RT数は100以下で', ha='center', va='center', fontsize=10)
    ax.text(6, 4.8, 'まだ拡散していないか？', ha='center', va='center', fontsize=10)

    # YES -> 削除
    ax.annotate('', xy=(9, 4.95), xytext=(8.5, 4.95),
                arrowprops=dict(arrowstyle='->', lw=2, color='#4CAF50'))
    ax.text(8.7, 5.2, 'YES', ha='center', va='center', fontsize=9, fontweight='bold', color='#4CAF50')

    delete_box2 = FancyBboxPatch((9, 4.5), 2.5, 0.9,
                                boxstyle="round,pad=0.1",
                                edgecolor='#4CAF50', facecolor='#C8E6C9', linewidth=2)
    ax.add_patch(delete_box2)
    ax.text(10.25, 5.1, '削除すべき', ha='center', va='center', fontsize=10, fontweight='bold', color='#2E7D32')
    ax.text(10.25, 4.75, '（早期削除が有効）', ha='center', va='center', fontsize=8, color='#2E7D32')

    # NO -> 次の質問
    ax.annotate('', xy=(6, 4.5), xytext=(6, 4.0),
                arrowprops=dict(arrowstyle='->', lw=2))
    ax.text(6.3, 4.25, 'NO', ha='left', va='center', fontsize=9, fontweight='bold')

    # 質問3: まとめサイト転載
    q3_box = FancyBboxPatch((3.5, 3.0), 5, 0.9,
                           boxstyle="round,pad=0.1",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(q3_box)
    ax.text(6, 3.6, 'まとめサイトに', ha='center', va='center', fontsize=10)
    ax.text(6, 3.3, '転載されているか？', ha='center', va='center', fontsize=10)

    # YES -> 残す
    ax.annotate('', xy=(9, 3.45), xytext=(8.5, 3.45),
                arrowprops=dict(arrowstyle='->', lw=2, color='#F44336'))
    ax.text(8.7, 3.7, 'YES', ha='center', va='center', fontsize=9, fontweight='bold', color='#F44336')

    keep_box1 = FancyBboxPatch((9, 3.0), 2.5, 0.9,
                              boxstyle="round,pad=0.1",
                              edgecolor='#F44336', facecolor='#FFCDD2', linewidth=2)
    ax.add_patch(keep_box1)
    ax.text(10.25, 3.6, '残すべき', ha='center', va='center', fontsize=10, fontweight='bold', color='#C62828')
    ax.text(10.25, 3.25, '（削除しても無意味）', ha='center', va='center', fontsize=8, color='#C62828')

    # NO -> 次の質問
    ax.annotate('', xy=(6, 3.0), xytext=(6, 2.5),
                arrowprops=dict(arrowstyle='->', lw=2))
    ax.text(6.3, 2.75, 'NO', ha='left', va='center', fontsize=9, fontweight='bold')

    # 質問4: 謝罪での対応可能性
    q4_box = FancyBboxPatch((3.5, 1.5), 5, 0.9,
                           boxstyle="round,pad=0.1",
                           edgecolor='black', facecolor='#FFE082', linewidth=2)
    ax.add_patch(q4_box)
    ax.text(6, 2.1, '謝罪ツイートで', ha='center', va='center', fontsize=10)
    ax.text(6, 1.8, '誠実に対応できるか？', ha='center', va='center', fontsize=10)

    # YES -> 残す
    ax.annotate('', xy=(9, 1.95), xytext=(8.5, 1.95),
                arrowprops=dict(arrowstyle='->', lw=2, color='#F44336'))
    ax.text(8.7, 2.2, 'YES', ha='center', va='center', fontsize=9, fontweight='bold', color='#F44336')

    keep_box2 = FancyBboxPatch((9, 1.5), 2.5, 0.9,
                              boxstyle="round,pad=0.1",
                              edgecolor='#F44336', facecolor='#FFCDD2', linewidth=2)
    ax.add_patch(keep_box2)
    ax.text(10.25, 2.1, '残すべき', ha='center', va='center', fontsize=10, fontweight='bold', color='#C62828')
    ax.text(10.25, 1.75, '（謝罪で対応）', ha='center', va='center', fontsize=8, color='#C62828')

    # NO -> 削除検討
    ax.annotate('', xy=(3, 1.95), xytext=(3.5, 1.95),
                arrowprops=dict(arrowstyle='->', lw=2, color='#FF9800'))
    ax.text(3.3, 2.2, 'NO', ha='center', va='center', fontsize=9, fontweight='bold', color='#FF9800')

    consider_box = FancyBboxPatch((0.5, 1.5), 2.5, 0.9,
                                 boxstyle="round,pad=0.1",
                                 edgecolor='#FF9800', facecolor='#FFE0B2', linewidth=2)
    ax.add_patch(consider_box)
    ax.text(1.75, 2.1, '削除を検討', ha='center', va='center', fontsize=10, fontweight='bold', color='#E65100')
    ax.text(1.75, 1.75, '（弁護士相談）', ha='center', va='center', fontsize=8, color='#E65100')

    # 重要な注意事項
    note_box = FancyBboxPatch((0.5, 0.2), 11, 0.9,
                             boxstyle="round,pad=0.1",
                             edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(note_box)
    ax.text(6, 0.85, '【重要】削除する場合の必須事項', ha='center', va='center', fontsize=9, fontweight='bold', color='#1565C0')
    ax.text(6, 0.55, '① 削除前に必ずスクリーンショットを保存  ② 削除したことを謝罪ツイートで言及  ③ 削除理由を明確に説明',
            ha='center', va='center', fontsize=8, color='#1565C0')

    plt.tight_layout()

    output_path = Path('content/platform-specific/images/tweet-deletion-decision-chart.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_twitter_report_procedure():
    """Twitter通報手順のスクリーンショット付き解説"""
    fig, ax = plt.subplots(figsize=(12, 10))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(6, 9.5, 'Twitter通報手順（誹謗中傷・脅迫への対応）',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # 手順1
    step1_box = FancyBboxPatch((0.5, 7.5), 5, 1.5,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(step1_box)
    ax.text(3, 8.9, 'STEP 1', ha='center', va='center', fontsize=11, fontweight='bold', color='#1565C0')
    ax.text(3, 8.5, '該当リプライの「…」をタップ', ha='center', va='center', fontsize=10)
    ax.text(0.8, 8.1, '・問題のリプライを表示', ha='left', va='center', fontsize=9)
    ax.text(0.8, 7.8, '・右上の「…」（メニュー）をタップ', ha='left', va='center', fontsize=9)

    # 矢印
    ax.annotate('', xy=(6.5, 8.3), xytext=(5.5, 8.3),
                arrowprops=dict(arrowstyle='->', lw=3, color='#1976D2'))

    # 手順2
    step2_box = FancyBboxPatch((6.5, 7.5), 5, 1.5,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#FFF3E0', linewidth=2)
    ax.add_patch(step2_box)
    ax.text(9, 8.9, 'STEP 2', ha='center', va='center', fontsize=11, fontweight='bold', color='#E65100')
    ax.text(9, 8.5, '「報告する」を選択', ha='center', va='center', fontsize=10)
    ax.text(6.8, 8.1, '・メニューから「報告する」を選択', ha='left', va='center', fontsize=9)
    ax.text(6.8, 7.8, '・通報画面に移動', ha='left', va='center', fontsize=9)

    # 矢印
    ax.annotate('', xy=(6, 7.5), xytext=(6, 7.0),
                arrowprops=dict(arrowstyle='->', lw=3, color='#1976D2'))

    # 手順3
    step3_box = FancyBboxPatch((0.5, 5.0), 5, 1.9,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#FFF9C4', linewidth=2)
    ax.add_patch(step3_box)
    ax.text(3, 6.7, 'STEP 3', ha='center', va='center', fontsize=11, fontweight='bold', color='#F57C00')
    ax.text(3, 6.3, '違反理由を選択', ha='center', va='center', fontsize=10)
    ax.text(0.8, 5.9, '以下から適切な理由を選択：', ha='left', va='center', fontsize=9)
    ax.text(1.0, 5.6, '・攻撃的または有害である', ha='left', va='center', fontsize=8)
    ax.text(1.0, 5.35, '・脅迫している', ha='left', va='center', fontsize=8)
    ax.text(1.0, 5.1, '・個人情報を投稿している', ha='left', va='center', fontsize=8)

    # 矢印
    ax.annotate('', xy=(6.5, 6.0), xytext=(5.5, 6.0),
                arrowprops=dict(arrowstyle='->', lw=3, color='#1976D2'))

    # 手順4
    step4_box = FancyBboxPatch((6.5, 5.0), 5, 1.9,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#E8F5E9', linewidth=2)
    ax.add_patch(step4_box)
    ax.text(9, 6.7, 'STEP 4', ha='center', va='center', fontsize=11, fontweight='bold', color='#2E7D32')
    ax.text(9, 6.3, '詳細を記入して送信', ha='center', va='center', fontsize=10)
    ax.text(6.8, 5.9, '・具体的な被害内容を記載', ha='left', va='center', fontsize=9)
    ax.text(6.8, 5.6, '・スクリーンショットを添付（可能なら）', ha='left', va='center', fontsize=9)
    ax.text(6.8, 5.3, '・「送信」をタップ', ha='left', va='center', fontsize=9)
    ax.text(6.8, 5.0, '※ Twitter社の審査には数日〜数週間', ha='left', va='center', fontsize=8, style='italic')

    # 重要な注意事項
    note_box = FancyBboxPatch((0.5, 3.0), 11, 1.5,
                             boxstyle="round,pad=0.15",
                             edgecolor='#C62828', facecolor='#FFEBEE', linewidth=2)
    ax.add_patch(note_box)
    ax.text(6, 4.2, '【通報すべき誹謗中傷の例】', ha='center', va='center', fontsize=10, fontweight='bold', color='#C62828')
    ax.text(1, 3.8, '✓ 「死ね」「殺す」などの脅迫（脅迫罪の可能性）', ha='left', va='center', fontsize=9)
    ax.text(1, 3.5, '✓ 名誉毀損にあたる虚偽の事実（名誉毀損罪の可能性）', ha='left', va='center', fontsize=9)
    ax.text(1, 3.2, '✓ 個人情報の暴露（プライバシー侵害）', ha='left', va='center', fontsize=9)

    # 弁護士相談が必要なケース
    lawyer_box = FancyBboxPatch((0.5, 1.0), 11, 1.5,
                               boxstyle="round,pad=0.15",
                               edgecolor='#1565C0', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(lawyer_box)
    ax.text(6, 2.2, '【弁護士相談が必要なケース】', ha='center', va='center', fontsize=10, fontweight='bold', color='#1565C0')
    ax.text(1, 1.8, '✓ 脅迫・恐喝のリプライが来た場合', ha='left', va='center', fontsize=9)
    ax.text(1, 1.5, '✓ 個人情報が晒された場合', ha='left', va='center', fontsize=9)
    ax.text(1, 1.2, '✓ デマが拡散され営業に実害が出ている場合', ha='left', va='center', fontsize=9)

    # 補足
    ax.text(6, 0.5, '※ Twitter通報だけでは削除されないこともあります。法的措置が必要な場合は弁護士に相談してください。',
            ha='center', va='center', fontsize=8, style='italic', color='#666')

    plt.tight_layout()

    output_path = Path('content/platform-specific/images/twitter-report-procedure.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_google_removal_request_procedure():
    """Google検索結果からの削除依頼手順"""
    fig, ax = plt.subplots(figsize=(12, 10))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(6, 9.5, 'Google検索結果からの削除依頼手順',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # ステップ1: まとめサイトへの削除依頼
    step1_box = FancyBboxPatch((0.5, 7.0), 5.5, 2.0,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(step1_box)
    ax.text(3.25, 8.8, 'STEP 1: まとめサイトへの削除依頼', ha='center', va='center', fontsize=11, fontweight='bold', color='#1565C0')
    ax.text(0.8, 8.4, '① まとめサイトの「お問い合わせ」を探す', ha='left', va='center', fontsize=9)
    ax.text(0.8, 8.1, '② 削除依頼メールを送信', ha='left', va='center', fontsize=9)
    ax.text(1.0, 7.8, '・記事URL', ha='left', va='center', fontsize=8)
    ax.text(1.0, 7.55, '・削除理由（誤情報、名誉毀損など）', ha='left', va='center', fontsize=8)
    ax.text(1.0, 7.3, '・連絡先', ha='left', va='center', fontsize=8)

    # 矢印
    ax.annotate('', xy=(6.5, 8.0), xytext=(6.0, 8.0),
                arrowprops=dict(arrowstyle='->', lw=3, color='#1976D2'))

    # 判断ポイント
    decision_box = FancyBboxPatch((6.5, 7.0), 5, 2.0,
                                 boxstyle="round,pad=0.15",
                                 edgecolor='black', facecolor='#FFF9C4', linewidth=2)
    ax.add_patch(decision_box)
    ax.text(9, 8.8, 'サイト管理者の対応は？', ha='center', va='center', fontsize=11, fontweight='bold', color='#F57C00')
    ax.text(6.8, 8.4, '削除してくれた → 成功！', ha='left', va='center', fontsize=9, color='#2E7D32')
    ax.text(6.8, 8.0, '削除してくれない → STEP 2へ', ha='left', va='center', fontsize=9, color='#C62828')
    ax.text(6.8, 7.5, '※ 多くの悪質サイトは削除依頼を', ha='left', va='center', fontsize=8, style='italic')
    ax.text(6.8, 7.2, '  無視します', ha='left', va='center', fontsize=8, style='italic')

    # ステップ2: 弁護士を通じた削除請求
    step2_box = FancyBboxPatch((0.5, 4.5), 5.5, 2.0,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#FFEBEE', linewidth=2)
    ax.add_patch(step2_box)
    ax.text(3.25, 6.3, 'STEP 2: 弁護士を通じた削除請求', ha='center', va='center', fontsize=11, fontweight='bold', color='#C62828')
    ax.text(0.8, 5.9, '弁護士ができること：', ha='left', va='center', fontsize=9, fontweight='bold')
    ax.text(1.0, 5.6, '・法的根拠を示した削除請求書の送付', ha='left', va='center', fontsize=8)
    ax.text(1.0, 5.35, '・削除されない場合の裁判所への仮処分申請', ha='left', va='center', fontsize=8)
    ax.text(1.0, 5.1, '・サイト管理者の特定（開示請求）', ha='left', va='center', fontsize=8)
    ax.text(0.8, 4.7, '費用: 10万円〜30万円（1サイトあたり）', ha='left', va='center', fontsize=9, color='#E65100')

    # 矢印
    ax.annotate('', xy=(6.5, 5.5), xytext=(6.0, 5.5),
                arrowprops=dict(arrowstyle='->', lw=3, color='#1976D2'))

    # ステップ3: Google削除リクエスト
    step3_box = FancyBboxPatch((6.5, 4.5), 5, 2.0,
                              boxstyle="round,pad=0.15",
                              edgecolor='black', facecolor='#E8F5E9', linewidth=2)
    ax.add_patch(step3_box)
    ax.text(9, 6.3, 'STEP 3: Google削除リクエスト', ha='center', va='center', fontsize=11, fontweight='bold', color='#2E7D32')
    ax.text(6.8, 5.9, '※ サイトが削除されなくても、', ha='left', va='center', fontsize=9)
    ax.text(6.8, 5.65, '  Google検索結果からは削除できる', ha='left', va='center', fontsize=9)
    ax.text(6.8, 5.3, '① Google削除リクエストフォームへ', ha='left', va='center', fontsize=8)
    ax.text(6.8, 5.05, '② 削除理由を選択', ha='left', va='center', fontsize=8)
    ax.text(6.8, 4.8, '③ 該当URLを入力して申請', ha='left', va='center', fontsize=8)

    # 成功率（ボックスを拡大）
    success_box = FancyBboxPatch((0.5, 2.2), 11, 1.9,
                                boxstyle="round,pad=0.15",
                                edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(success_box)
    ax.text(6, 3.9, '【各手法の成功率と費用】', ha='center', va='center', fontsize=10, fontweight='bold', color='#1565C0')

    # 表形式で表示（Y座標を調整）
    ax.text(1.5, 3.5, '手法', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(4.5, 3.5, '成功率', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(7.5, 3.5, '費用', ha='center', va='center', fontsize=9, fontweight='bold')
    ax.text(10, 3.5, '期間', ha='center', va='center', fontsize=9, fontweight='bold')

    ax.plot([0.7, 11.3], [3.35, 3.35], 'k-', linewidth=1)

    ax.text(1.5, 3.05, 'まとめサイト削除依頼', ha='center', va='center', fontsize=8)
    ax.text(4.5, 3.05, '10%', ha='center', va='center', fontsize=8, color='#C62828')
    ax.text(7.5, 3.05, '無料', ha='center', va='center', fontsize=8, color='#2E7D32')
    ax.text(10, 3.05, '1週間', ha='center', va='center', fontsize=8)

    ax.text(1.5, 2.7, '弁護士削除請求', ha='center', va='center', fontsize=8)
    ax.text(4.5, 2.7, '60%', ha='center', va='center', fontsize=8, color='#F57C00')
    ax.text(7.5, 2.7, '10〜30万円', ha='center', va='center', fontsize=8, color='#C62828')
    ax.text(10, 2.7, '1〜3ヶ月', ha='center', va='center', fontsize=8)

    ax.text(1.5, 2.35, 'Google削除リクエスト', ha='center', va='center', fontsize=8)
    ax.text(4.5, 2.35, '30%', ha='center', va='center', fontsize=8, color='#FF9800')
    ax.text(7.5, 2.35, '無料', ha='center', va='center', fontsize=8, color='#2E7D32')
    ax.text(10, 2.35, '2〜4週間', ha='center', va='center', fontsize=8)

    # 重要な注意（位置を下にずらす）
    note_box = FancyBboxPatch((0.5, 0.2), 11, 1.5,
                             boxstyle="round,pad=0.15",
                             edgecolor='#E65100', facecolor='#FFF3E0', linewidth=2)
    ax.add_patch(note_box)
    ax.text(6, 1.5, '【重要】デジタルタトゥー対策は完全削除が困難', ha='center', va='center', fontsize=10, fontweight='bold', color='#E65100')
    ax.text(1, 1.1, '・一度拡散した情報は、完全に消すことはほぼ不可能です', ha='left', va='center', fontsize=9)
    ax.text(1, 0.8, '・削除よりも、新しいポジティブな情報を増やす「レピュテーションマネジメント」が効果的', ha='left', va='center', fontsize=9)
    ax.text(1, 0.5, '・費用: 月額20万円〜100万円（レピュテーションマネジメント会社）', ha='left', va='center', fontsize=9)

    plt.tight_layout()

    output_path = Path('content/platform-specific/images/google-removal-request-procedure.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_sns_pre_post_checklist():
    """SNS投稿前チェックリスト"""
    # カテゴリ数と項目数から高さを動的に計算
    total_categories = 5
    total_items = 4 + 4 + 4 + 4 + 4  # 各カテゴリ4項目
    fig_height = max(16, 4.5 + total_categories * 1.2 + total_items * 0.55 + 2.5)

    fig, ax = plt.subplots(figsize=(12, fig_height))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, fig_height)
    ax.axis('off')

    # タイトル
    title_y = fig_height - 0.5
    ax.text(6, title_y, 'SNS投稿前チェックリスト',
            ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(6, title_y - 0.4, '〜炎上を防ぐための10のポイント〜',
            ha='center', va='center', fontsize=11, style='italic')

    # チェックリスト項目
    checklist_items = [
        ('基本チェック', [
            '誤字脱字はないか？',
            '文法的に正しいか？',
            'リンクは正しく機能するか？',
            '画像・動画は適切か？'
        ], '#E3F2FD', '#1565C0'),
        ('内容チェック', [
            '誤解を招く表現はないか？',
            '事実と異なる情報はないか？',
            '過度な誇張はないか？',
            '他社を批判していないか？'
        ], '#FFF3E0', '#E65100'),
        ('炎上リスクチェック', [
            '差別的表現はないか？',
            '政治・宗教・ジェンダーに触れていないか？',
            '特定の個人・団体を攻撃していないか？',
            '不謹慎と受け取られる可能性はないか？'
        ], '#FFEBEE', '#C62828'),
        ('タイミングチェック', [
            '災害・事故発生直後ではないか？',
            '選挙期間中ではないか？',
            '大型連休中（炎上しやすい）ではないか？',
            '深夜・早朝（判断力が鈍る）ではないか？'
        ], '#F3E5F5', '#6A1B9A'),
        ('最終確認', [
            '複数人（2名以上）でチェックしたか？',
            '上司・責任者の承認を得たか？',
            '投稿後の監視体制は整っているか？',
            '炎上時の対応フローは把握しているか？'
        ], '#E8F5E9', '#2E7D32')
    ]

    y_position = title_y - 1.2
    item_spacing = 0.55  # 項目間の間隔をさらに広げる
    category_spacing = 0.7  # カテゴリ間の間隔をさらに広げる

    for category, items, bg_color, text_color in checklist_items:
        # カテゴリボックス
        category_box = FancyBboxPatch((0.5, y_position - 0.55), 11, 0.65,
                                     boxstyle="round,pad=0.1",
                                     edgecolor=text_color, facecolor=bg_color, linewidth=2)
        ax.add_patch(category_box)
        ax.text(1, y_position - 0.225, category, ha='left', va='center',
                fontsize=11, fontweight='bold', color=text_color)

        y_position -= 0.85

        # チェック項目
        for item in items:
            # チェックボックス
            checkbox = FancyBboxPatch((1.2, y_position - 0.15), 0.25, 0.25,
                                     boxstyle="round,pad=0.02",
                                     edgecolor='black', facecolor='white', linewidth=1.5)
            ax.add_patch(checkbox)

            # 項目テキスト
            ax.text(1.7, y_position, item, ha='left', va='center', fontsize=9)

            y_position -= item_spacing

        y_position -= category_spacing

    # 使い方ガイド（位置を調整）
    guide_y = y_position - 0.5
    guide_box = FancyBboxPatch((0.5, guide_y - 0.6), 11, 1.0,
                              boxstyle="round,pad=0.15",
                              edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(guide_box)
    ax.text(6, guide_y + 0.2, '【使い方】', ha='center', va='center', fontsize=10, fontweight='bold', color='#1565C0')
    ax.text(1, guide_y - 0.1, '① 投稿前にこのチェックリストを印刷またはデジタルで用意', ha='left', va='center', fontsize=9)
    ax.text(1, guide_y - 0.35, '② 必ず2名以上で全項目をチェック', ha='left', va='center', fontsize=9)

    # Y軸の下限を調整してガイドボックスが確実に表示されるようにする
    min_y = guide_y - 0.8
    if min_y < 0:
        ax.set_ylim(min_y - 0.5, fig_height)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/sns-pre-post-checklist.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


if __name__ == "__main__":
    print("フローチャート画像を生成中...")
    print()

    create_twitter_crisis_scale_flowchart()
    create_crisis_24hour_timeline()
    create_tweet_deletion_decision_chart()
    create_twitter_report_procedure()
    create_google_removal_request_procedure()
    create_sns_pre_post_checklist()

    print()
    print("✅ すべてのフローチャート画像を生成しました！")
