#!/usr/bin/env python3
"""
BGM音量管理ガイド画像を生成するスクリプト
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch
import japanize_matplotlib
from pathlib import Path

# 日本語フォント設定
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 10
plt.rcParams['axes.unicode_minus'] = False


def create_bgm_volume_management():
    """BGM音量管理ガイド"""
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(7, 9.5, 'BGM音量管理ガイド',
            ha='center', va='center', fontsize=16, fontweight='bold')
    ax.text(7, 9.0, '〜時間帯別の適切な音量設定〜',
            ha='center', va='center', fontsize=12, style='italic')

    # 時間帯別音量設定
    time_slots = [
        {
            'time': '朝 7:00-10:00',
            'level': '小音量',
            'volume': '30-40%',
            'reason': 'モーニング客の読書・仕事に配慮',
            'color': '#E3F2FD',
            'y': 7.5
        },
        {
            'time': '昼 12:00-14:00',
            'level': '中音量',
            'volume': '50-60%',
            'reason': 'ランチ客の会話を妨げない程度',
            'color': '#FFF3E0',
            'y': 6.2
        },
        {
            'time': '夕方 17:00-19:00',
            'level': '中音量',
            'volume': '50-60%',
            'reason': 'ディナー客に落ち着いた雰囲気',
            'color': '#F3E5F5',
            'y': 4.9
        },
        {
            'time': '夜 20:00以降',
            'level': '中〜大音量',
            'volume': '60-70%',
            'reason': 'バー営業・お酒メインの雰囲気',
            'color': '#FFEBEE',
            'y': 3.6
        }
    ]

    for slot in time_slots:
        # ボックス
        box = FancyBboxPatch((0.5, slot['y'] - 1.0), 13, 1.0,
                            boxstyle="round,pad=0.15",
                            edgecolor='#1976D2', facecolor=slot['color'], linewidth=2)
        ax.add_patch(box)

        # 時間帯
        ax.text(1.5, slot['y'] - 0.3, slot['time'],
                ha='left', va='center', fontsize=11, fontweight='bold')

        # 音量レベル
        ax.text(4.5, slot['y'] - 0.3, slot['level'],
                ha='left', va='center', fontsize=11, fontweight='bold', color='#1976D2')

        # 音量パーセント
        ax.text(6.5, slot['y'] - 0.3, slot['volume'],
                ha='left', va='center', fontsize=10)

        # 理由
        ax.text(1.5, slot['y'] - 0.7, slot['reason'],
                ha='left', va='center', fontsize=9, style='italic')

    # 注意事項
    note_box = FancyBboxPatch((0.5, 0.5), 13, 2.0,
                             boxstyle="round,pad=0.15",
                             edgecolor='#E65100', facecolor='#FFF3E0', linewidth=2)
    ax.add_patch(note_box)

    ax.text(7, 2.2, '【重要な注意点】',
            ha='center', va='center', fontsize=12, fontweight='bold', color='#E65100')

    notes = [
        '• 音量は店内の混雑状況に応じて調整してください',
        '• 顧客から「うるさい」と言われたら、すぐに音量を下げる',
        '• スタッフ全員が音量調整方法を理解していることを確認',
        '• 定期的に客席で音量をチェックする（スピーカー近くは音が大きく聞こえる）'
    ]

    y_pos = 1.7
    for note in notes:
        ax.text(1, y_pos, note,
                ha='left', va='center', fontsize=9)
        y_pos -= 0.3

    plt.tight_layout(pad=1.5)

    output_path = Path('public/mild-response/images/bgm-volume-management.png')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


if __name__ == "__main__":
    print("BGM音量管理ガイド画像を生成中...")
    create_bgm_volume_management()
    print("✅ BGM音量管理ガイド画像を生成しました！")
