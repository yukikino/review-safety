#!/usr/bin/env python3
"""
比較表・一覧表画像を生成するスクリプト（修正版）
- テキストの重なり防止
- 適切な余白確保
- 改行処理の改善
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle
import japanize_matplotlib
from pathlib import Path
import numpy as np
import textwrap

# 日本語フォント設定（改善版）
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 9
plt.rcParams['axes.unicode_minus'] = False  # マイナス記号の文字化け防止


def wrap_text(text, width=20):
    """テキストを指定幅で改行（既に改行されているテキストも処理）"""
    if '\n' in text:
        # 既に改行がある場合はそのまま返す
        return text
    return '\n'.join(textwrap.wrap(str(text), width=width))


def create_table_image(title, headers, rows, output_path, col_widths=None):
    """汎用的なテーブル画像生成関数（改善版）"""
    num_cols = len(headers)
    num_rows = len(rows)

    if col_widths is None:
        col_widths = [1.0 / num_cols] * num_cols

    # 高さを動的に調整
    fig_height = max(8, 3 + num_rows * 0.8)

    fig, ax = plt.subplots(figsize=(14, fig_height))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')

    # タイトル（余白を確保）
    ax.text(0.5, 0.97, title, ha='center', va='top', fontsize=14, fontweight='bold')

    # テーブルのY座標（タイトルとの余白を確保）
    table_top = 0.92
    row_height = 0.75 / (num_rows + 1)

    # ヘッダー行
    x_pos = 0.05
    for i, (header, width) in enumerate(zip(headers, col_widths)):
        # ヘッダーセル
        header_box = Rectangle((x_pos, table_top - row_height), width * 0.88, row_height,
                               edgecolor='black', facecolor='#1976D2', linewidth=1.5)
        ax.add_patch(header_box)

        # ヘッダーテキスト（改行対応）
        wrapped_header = wrap_text(header, width=12)
        ax.text(x_pos + width * 0.44, table_top - row_height / 2,
                wrapped_header, ha='center', va='center', fontsize=9,
                fontweight='bold', color='white', linespacing=1.3)
        x_pos += width * 0.88

    # データ行
    for row_idx, row_data in enumerate(rows):
        x_pos = 0.05
        y_pos = table_top - (row_idx + 2) * row_height

        # 行の背景色（交互）
        bg_color = '#F5F5F5' if row_idx % 2 == 0 else 'white'

        for col_idx, (cell_data, width) in enumerate(zip(row_data, col_widths)):
            # セル
            cell_box = Rectangle((x_pos, y_pos), width * 0.88, row_height,
                                edgecolor='#BDBDBD', facecolor=bg_color, linewidth=1)
            ax.add_patch(cell_box)

            # セルテキスト（改行処理を改善）
            # 既に改行がある場合はそのまま使用、ない場合は幅に応じて改行
            cell_text = str(cell_data)
            if '\n' not in cell_text and len(cell_text) > 15:
                cell_text = wrap_text(cell_text, width=int(width * 50))

            ax.text(x_pos + width * 0.44, y_pos + row_height / 2,
                   cell_text, ha='center', va='center', fontsize=8,
                   linespacing=1.2)
            x_pos += width * 0.88

    plt.tight_layout(pad=1.5)
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_monitoring_tools_comparison():
    """SNS監視ツール比較表"""
    title = 'SNS監視ツール比較表'
    headers = ['ツール名', '月額料金', '対応SNS', '機能', '企業規模']
    rows = [
        ['Brandwatch', '30万円〜', 'Twitter, Instagram,\nFacebook, YouTube', 'リアルタイム監視\n感情分析\nレポート自動生成', '大企業向け'],
        ['Hootsuite', '10万円〜', 'Twitter, Instagram,\nFacebook, LinkedIn', '投稿管理\n監視機能\nチーム管理', '中小企業向け'],
        ['Social Insight', '15万円〜', 'Twitter, Instagram,\nFacebook', '炎上検知\n競合分析\nレポート', '中小企業向け'],
        ['Yahoo!リアルタイム\n検索', '無料', 'Twitter', '基本的な検索\nトレンド表示', '個人・\n小規模'],
        ['Google\nアラート', '無料', 'ウェブ全体', 'キーワード通知\nメール配信', '個人・\n小規模']
    ]

    output_path = Path('content/bridge/images/monitoring-tools-comparison.png')
    create_table_image(title, headers, rows, output_path, col_widths=[0.18, 0.14, 0.22, 0.28, 0.14])


def create_response_tone_comparison():
    """口コミ返信の温度感比較表（改善版）"""
    fig, ax = plt.subplots(figsize=(14, 11))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 11)
    ax.axis('off')

    # タイトル
    ax.text(7, 10.5, '口コミ返信の温度感比較表',
            ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(7, 10.1, '〜口コミの種類別、適切な返信トーン〜',
            ha='center', va='center', fontsize=11, style='italic')

    # ヘッダー（等間隔＋中央寄せ）
    headers = ['口コミ種類', '推奨トーン', 'NG例', 'OK例']
    # セル幅と間隔
    header_widths = [2.2, 2.2, 3.0, 2.2]
    gap = 0.6
    total_width = sum(header_widths) + gap * (len(header_widths) - 1)  # 10.4
    start_x = (14 - total_width) / 2  # 中央寄せのための開始位置: 1.8

    header_x = [
        start_x + header_widths[0] / 2,
        start_x + header_widths[0] + gap + header_widths[1] / 2,
        start_x + header_widths[0] + gap + header_widths[1] + gap + header_widths[2] / 2,
        start_x + header_widths[0] + gap + header_widths[1] + gap + header_widths[2] + gap + header_widths[3] / 2
    ]

    for i, (header, x, w) in enumerate(zip(headers, header_x, header_widths)):
        header_box = FancyBboxPatch((x - w/2, 9.2), w, 0.6,
                                   boxstyle="round,pad=0.1",
                                   edgecolor='black', facecolor='#1976D2', linewidth=2)
        ax.add_patch(header_box)
        ax.text(x, 9.5, header, ha='center', va='center', fontsize=11,
                fontweight='bold', color='white')

    # データ行
    review_types = [
        {
            'type': '高評価\n(★★★★★)',
            'tone': '感謝・\n親しみ',
            'ng': '「ありがとうございます。\n今後ともよろしく\nお願いいたします。」\n\n（事務的すぎる）',
            'ok': '「嬉しいお言葉を\nありがとうございます！\nスタッフ一同励みに\nなります」'
        },
        {
            'type': '具体的な\n改善提案',
            'tone': '誠実・\n前向き',
            'ng': '「ご意見ありがとう\nございます。検討\nいたします。」\n\n（曖昧）',
            'ok': '「貴重なご意見あり\nがとうございます。\n〇〇の件、早速改善\nに取り組みます」'
        },
        {
            'type': '低評価\n(★★以下)',
            'tone': '謝罪・\n改善',
            'ng': '「申し訳ございません。\n今後気をつけます。」\n\n（具体性なし）',
            'ok': '「ご不快な思いをさせ\n申し訳ございません。\n〇〇の件、即座に\n改善いたしました」'
        },
        {
            'type': '誹謗中傷\n攻撃的',
            'tone': '冷静・\n事実',
            'ng': '「そのような事実は\nありません！」\n\n（感情的）',
            'ok': '「ご指摘の件、事実\n確認いたしましたが、\n該当する事象は\n確認できませんでした」'
        },
        {
            'type': '競合他社の\nステマ',
            'tone': '淡々・\n無視',
            'ng': '「競合他社の宣伝は\nおやめください」\n\n（攻撃的）',
            'ok': '返信しない\n\n（無視が最善）'
        }
    ]

    y_start = 8.5
    row_height = 1.6

    for idx, review in enumerate(review_types):
        y = y_start - idx * row_height

        # 背景色（交互）
        if idx % 2 == 0:
            bg_rect = Rectangle((0.3, y - row_height + 0.25), 13.4, row_height - 0.35,
                               edgecolor='none', facecolor='#F5F5F5', alpha=0.5)
            ax.add_patch(bg_rect)

        # 各セル（ヘッダーと同じX座標と幅に調整）
        cells = [
            (review['type'], header_x[0], header_widths[0], '#E3F2FD'),
            (review['tone'], header_x[1], header_widths[1], '#FFF3E0'),
            (review['ng'], header_x[2], header_widths[2], '#FFEBEE'),
            (review['ok'], header_x[3], header_widths[3], '#E8F5E9')
        ]

        for text, x, w, color in cells:
            cell_box = FancyBboxPatch((x - w/2, y - row_height + 0.25), w, row_height - 0.35,
                                     boxstyle="round,pad=0.1",
                                     edgecolor='#BDBDBD', facecolor=color, linewidth=1)
            ax.add_patch(cell_box)
            ax.text(x, y - row_height/2, text, ha='center', va='center',
                   fontsize=8, linespacing=1.3)

    # 凡例（位置を明示的に設定）
    legend_y = y_start - len(review_types) * row_height - 0.8
    legend_box = FancyBboxPatch((0.5, legend_y - 0.9), 13, 0.9,
                               boxstyle="round,pad=0.15",
                               edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(legend_box)
    ax.text(7, legend_y - 0.25, '【重要】返信トーンの基本原則', ha='center', va='center',
            fontsize=10, fontweight='bold', color='#1565C0')
    ax.text(7, legend_y - 0.6, '① 感情的にならない  ② 具体的な改善を示す  ③ 事務的すぎず、人間味を出す  ④ 攻撃的な口コミには冷静に対応',
            ha='center', va='center', fontsize=9)

    # Y軸の範囲を調整して凡例が確実に表示されるようにする
    min_y = legend_y - 1.2
    if min_y < 0:
        ax.set_ylim(min_y - 0.5, 11)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/mild-response/images/response-tone-comparison.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_platform_response_time_table():
    """プラットフォーム別推奨返信時間一覧"""
    title = 'プラットフォーム別推奨返信時間一覧'
    headers = ['プラットフォーム', '推奨返信時間', '理由', '遅延時のリスク']
    rows = [
        ['Google マップ', '24時間以内', 'MEO順位に影響\n返信率が評価される', '検索順位低下\n機会損失'],
        ['食べログ', '48時間以内', '返信率が店舗評価に\n反映', '評価点数低下\n信頼性低下'],
        ['Amazon', '24時間以内', '出品者評価に影響', 'アカウント評価低下\n販売機会損失'],
        ['Instagram', '1時間以内', 'DMは即レス文化\nストーリーズは24時間', 'フォロワー離脱\nエンゲージメント低下'],
        ['Twitter (X)', '1時間以内', '炎上リスク\nRT拡散が早い', '炎上拡大\n信頼失墜'],
        ['App Store', '7日以内', 'レビュー返信は\n必須ではない', '評価改善の\n機会損失'],
        ['楽天トラベル', '24時間以内', '予約検討中の\n顧客が閲覧', '予約機会損失']
    ]

    output_path = Path('content/platform-specific/images/platform-response-time-table.png')
    create_table_image(title, headers, rows, output_path, col_widths=[0.20, 0.18, 0.28, 0.24])


def create_lawyer_consultation_criteria():
    """弁護士相談が必要なケース判定表（改善版）"""
    fig, ax = plt.subplots(figsize=(14, 11))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 11)
    ax.axis('off')

    # タイトル
    ax.text(7, 10.5, '弁護士相談が必要なケース判定表',
            ha='center', va='center', fontsize=14, fontweight='bold')

    # ヘッダー
    ax.text(2.2, 9.8, 'ケース', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(5.5, 9.8, '緊急度', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(8.5, 9.8, '想定費用', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(11.5, 9.8, '対応内容', ha='center', va='center', fontsize=11, fontweight='bold')

    ax.plot([0.5, 13.5], [9.6, 9.6], 'k-', linewidth=2)

    # データ
    cases = [
        {
            'case': '脅迫・恐喝の\nDM・リプライ',
            'urgency': '即時',
            'urgency_color': '#C62828',
            'cost': '10万円〜',
            'action': '警察への被害届\n開示請求\n削除請求'
        },
        {
            'case': '個人情報の\n暴露・晒し',
            'urgency': '即時',
            'urgency_color': '#C62828',
            'cost': '15万円〜',
            'action': '削除仮処分\n発信者情報開示\n損害賠償請求'
        },
        {
            'case': 'デマ拡散で\n営業実害',
            'urgency': '3日以内',
            'urgency_color': '#E65100',
            'cost': '20万円〜',
            'action': '削除請求\n発信者特定\n名誉毀損での訴訟'
        },
        {
            'case': 'まとめサイト\nへの転載',
            'urgency': '1週間以内',
            'urgency_color': '#F57C00',
            'cost': '10万円〜',
            'action': 'サイト管理者への\n削除請求'
        },
        {
            'case': '組織的な\n攻撃・炎上',
            'urgency': '即時',
            'urgency_color': '#C62828',
            'cost': '30万円〜',
            'action': '複数アカウントの\n特定・削除請求'
        },
        {
            'case': '低評価口コミ\nの削除希望',
            'urgency': '相談のみ',
            'urgency_color': '#2E7D32',
            'cost': '5万円〜',
            'action': '削除可能性の判断\n（成功率は低い）'
        }
    ]

    y_start = 9.2
    row_height = 1.3

    for idx, case_data in enumerate(cases):
        y = y_start - idx * row_height

        # 背景
        if idx % 2 == 0:
            bg_rect = Rectangle((0.5, y - row_height + 0.15), 13, row_height - 0.25,
                               edgecolor='none', facecolor='#F5F5F5', alpha=0.5)
            ax.add_patch(bg_rect)

        # ケース
        ax.text(2.2, y - row_height/2, case_data['case'],
                ha='center', va='center', fontsize=9, linespacing=1.3)

        # 緊急度（色付き）
        urgency_box = FancyBboxPatch((4.8, y - row_height + 0.35), 1.4, row_height - 0.7,
                                    boxstyle="round,pad=0.1",
                                    edgecolor='black', facecolor=case_data['urgency_color'],
                                    linewidth=1.5)
        ax.add_patch(urgency_box)
        ax.text(5.5, y - row_height/2, case_data['urgency'],
                ha='center', va='center', fontsize=10, fontweight='bold', color='white')

        # 費用
        ax.text(8.5, y - row_height/2, case_data['cost'],
                ha='center', va='center', fontsize=9)

        # 対応内容
        ax.text(11.5, y - row_height/2, case_data['action'],
                ha='center', va='center', fontsize=8, linespacing=1.3)

    # 注釈
    note_y = y_start - len(cases) * row_height - 0.4
    note_box = FancyBboxPatch((0.5, note_y - 1.1), 13, 1.1,
                             boxstyle="round,pad=0.15",
                             edgecolor='#1976D2', facecolor='#E3F2FD', linewidth=2)
    ax.add_patch(note_box)
    ax.text(7, note_y - 0.35, '【重要】弁護士相談のタイミング', ha='center', va='center',
            fontsize=10, fontweight='bold', color='#1565C0')
    ax.text(7, note_y - 0.65, '・「相談だけ」でも可。多くの弁護士は初回相談無料（30分〜1時間）',
            ha='center', va='center', fontsize=9)
    ax.text(7, note_y - 0.95, '・早期相談で被害拡大を防げます。迷ったらすぐに相談してください。',
            ha='center', va='center', fontsize=9)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/escalation/images/lawyer-consultation-criteria.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_crisis_level_matrix():
    """危機レベルマトリックス（影響度 x 拡散度）（改善版）"""
    fig, ax = plt.subplots(figsize=(12, 10))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 10)
    ax.axis('off')

    # タイトル
    ax.text(6, 9.5, '危機レベルマトリックス',
            ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(6, 9.1, '〜影響度 × 拡散度で判断する対応レベル〜',
            ha='center', va='center', fontsize=11, style='italic')

    # 軸
    ax.arrow(1, 1.5, 0, 6.5, head_width=0.15, head_length=0.2,
             fc='black', ec='black', linewidth=2)
    ax.arrow(1, 1.5, 9.5, 0, head_width=0.15, head_length=0.2,
             fc='black', ec='black', linewidth=2)

    # 軸ラベル
    ax.text(0.3, 5, '影\n響\n度', ha='center', va='center', fontsize=12,
            fontweight='bold', rotation=0)
    ax.text(5.5, 0.8, '拡散度', ha='center', va='center', fontsize=12,
            fontweight='bold')

    # 拡散度ラベル
    ax.text(2.5, 1.2, '低', ha='center', va='center', fontsize=10)
    ax.text(5.5, 1.2, '中', ha='center', va='center', fontsize=10)
    ax.text(8.5, 1.2, '高', ha='center', va='center', fontsize=10)

    # 影響度ラベル
    ax.text(0.7, 2.5, '低', ha='center', va='center', fontsize=10)
    ax.text(0.7, 4.5, '中', ha='center', va='center', fontsize=10)
    ax.text(0.7, 6.5, '高', ha='center', va='center', fontsize=10)

    # マトリックスセル
    cells = [
        # 低影響度
        {'x': 1.5, 'y': 2, 'w': 2.5, 'h': 1.5, 'color': '#C8E6C9', 'level': 'レベル1', 'action': '監視のみ'},
        {'x': 4.5, 'y': 2, 'w': 2.5, 'h': 1.5, 'color': '#FFF9C4', 'level': 'レベル2', 'action': '個別返信'},
        {'x': 7.5, 'y': 2, 'w': 2.5, 'h': 1.5, 'color': '#FFE0B2', 'level': 'レベル3', 'action': '公式返信\n検討'},

        # 中影響度
        {'x': 1.5, 'y': 4, 'w': 2.5, 'h': 1.5, 'color': '#FFF9C4', 'level': 'レベル2', 'action': '個別返信'},
        {'x': 4.5, 'y': 4, 'w': 2.5, 'h': 1.5, 'color': '#FFE0B2', 'level': 'レベル3', 'action': '公式謝罪'},
        {'x': 7.5, 'y': 4, 'w': 2.5, 'h': 1.5, 'color': '#FFCDD2', 'level': 'レベル4', 'action': 'プレス\nリリース'},

        # 高影響度
        {'x': 1.5, 'y': 6, 'w': 2.5, 'h': 1.5, 'color': '#FFE0B2', 'level': 'レベル3', 'action': '公式謝罪'},
        {'x': 4.5, 'y': 6, 'w': 2.5, 'h': 1.5, 'color': '#FFCDD2', 'level': 'レベル4', 'action': '弁護士\n相談'},
        {'x': 7.5, 'y': 6, 'w': 2.5, 'h': 1.5, 'color': '#EF9A9A', 'level': 'レベル5', 'action': '危機管理\nチーム招集'}
    ]

    for cell in cells:
        cell_box = FancyBboxPatch((cell['x'], cell['y']), cell['w'], cell['h'],
                                 boxstyle="round,pad=0.1",
                                 edgecolor='black', facecolor=cell['color'],
                                 linewidth=1.5)
        ax.add_patch(cell_box)
        ax.text(cell['x'] + cell['w']/2, cell['y'] + cell['h']/2 + 0.35,
                cell['level'], ha='center', va='center', fontsize=11, fontweight='bold')
        ax.text(cell['x'] + cell['w']/2, cell['y'] + cell['h']/2 - 0.25,
                cell['action'], ha='center', va='center', fontsize=9, linespacing=1.2)

    # 判定基準
    criteria_box = FancyBboxPatch((0.5, 8.0), 11, 0.9,
                                 boxstyle="round,pad=0.1",
                                 edgecolor='#1976D2', facecolor='#E3F2FD',
                                 linewidth=2)
    ax.add_patch(criteria_box)
    ax.text(6, 8.65, '【判定基準】', ha='center', va='center', fontsize=10, fontweight='bold', color='#1565C0')
    ax.text(6, 8.35, '拡散度: 低=RT<100, 中=100-1000, 高=1000以上  |  影響度: 低=個人的不満, 中=サービス問題, 高=法的リスク・社会問題',
            ha='center', va='center', fontsize=8)

    plt.tight_layout(pad=1.5)

    output_path = Path('content/platform-specific/images/crisis-level-matrix.png')
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


if __name__ == "__main__":
    print("比較表・一覧表画像を生成中（修正版）...")
    print()

    create_monitoring_tools_comparison()
    create_response_tone_comparison()
    create_platform_response_time_table()
    create_lawyer_consultation_criteria()
    create_crisis_level_matrix()

    print()
    print("✅ すべての比較表・一覧表画像を生成しました（修正版）！")
