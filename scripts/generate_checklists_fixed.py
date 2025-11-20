#!/usr/bin/env python3
"""
チェックリスト画像を生成するスクリプト（修正版）
- 項目数に応じた動的サイズ調整
- チェックボックスサイズの調整
- カテゴリ間の余白増加
"""
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, Rectangle
import japanize_matplotlib
from pathlib import Path

# 日本語フォント設定（改善版）
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', 'Meirio', 'Takao', 'IPAexGothic', 'IPAPGothic']
plt.rcParams['font.size'] = 9
plt.rcParams['axes.unicode_minus'] = False


def create_checklist(title, subtitle, categories, output_path, note=None):
    """汎用的なチェックリスト画像生成関数（改善版）"""
    # カテゴリ数と項目数から高さを動的に計算
    total_items = sum(len(items) for items in categories.values())
    num_categories = len(categories)

    # 高さを動的に調整（より大きく）
    fig_height = max(12, 4.0 + num_categories * 1.2 + total_items * 0.5)
    if note:
        fig_height += 1.8

    # Y軸のスケールも動的に調整
    y_scale = fig_height

    fig, ax = plt.subplots(figsize=(14, fig_height))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, y_scale)
    ax.axis('off')

    # タイトル（Y軸スケールに合わせて調整）
    title_y = y_scale - 0.8
    ax.text(7, title_y, title, ha='center', va='center', fontsize=15, fontweight='bold')
    if subtitle:
        ax.text(7, title_y - 0.6, subtitle, ha='center', va='center', fontsize=12, style='italic')

    y_position = title_y - 1.2 if subtitle else title_y - 0.8
    item_spacing = 0.5  # 項目間の余白を増加
    category_spacing = 0.8  # カテゴリ間の余白を増加

    for category, items in categories.items():
        # カテゴリヘッダー（サイズを拡大）
        category_box = FancyBboxPatch((0.8, y_position - 0.6), 12.4, 0.65,
                                     boxstyle="round,pad=0.12",
                                     edgecolor='#1976D2', facecolor='#E3F2FD',
                                     linewidth=2)
        ax.add_patch(category_box)
        ax.text(1.5, y_position - 0.275, category, ha='left', va='center',
                fontsize=11, fontweight='bold', color='#1565C0')

        y_position -= 1.0

        # チェック項目
        for item in items:
            # チェックボックス（サイズを拡大）
            checkbox = FancyBboxPatch((1.8, y_position - 0.2), 0.35, 0.35,
                                     boxstyle="round,pad=0.03",
                                     edgecolor='black', facecolor='white',
                                     linewidth=1.5)
            ax.add_patch(checkbox)

            # 項目テキスト
            ax.text(2.4, y_position, item, ha='left', va='center', fontsize=10)

            y_position -= item_spacing

        y_position -= category_spacing

    # 注記（余白を追加して確実に表示）
    if note:
        note_y = y_position - 1.0
        note_box = FancyBboxPatch((0.8, note_y - 1.0), 12.4, 1.0,
                                 boxstyle="round,pad=0.15",
                                 edgecolor='#1976D2', facecolor='#E3F2FD',
                                 linewidth=2)
        ax.add_patch(note_box)
        ax.text(7, note_y - 0.5, note, ha='center', va='center', fontsize=10)

        # Y軸の下限を調整して注記が確実に表示されるようにする
        min_y = note_y - 1.2
        if min_y < 0:
            ax.set_ylim(min_y - 0.5, y_scale)

    plt.tight_layout(pad=1.5)
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def create_crisis_management_checklist():
    """炎上対応チェックリスト（改善版）"""
    title = '炎上対応チェックリスト'
    subtitle = '〜初動24時間で確認すべき項目〜'

    categories = {
        '【0〜1時間】炎上検知・情報収集': [
            'RT数・リプライ数を確認したか？',
            'エゴサーチで拡散状況を確認したか？',
            'まとめサイトへの転載を確認したか？',
            '炎上ツイート・リプライのスクリーンショットを保存したか？',
            '経営者・広報担当・弁護士に報告したか？'
        ],
        '【1〜3時間】削除判断': [
            '明らかな誤情報・差別的表現が含まれているか確認したか？',
            'RT数が100以下でまだ拡散していないか確認したか？',
            'まとめサイトに転載されていないか確認したか？',
            '削除する場合、削除前にスクリーンショットを保存したか？',
            '削除したことを謝罪ツイートで言及する準備をしたか？'
        ],
        '【3〜6時間】公式謝罪': [
            '謝罪ツイートを作成したか？',
            '冒頭で謝罪しているか？',
            '何が問題だったか具体的に説明しているか？',
            '再発防止策を提示しているか？',
            '言い訳・責任転嫁をしていないか確認したか？'
        ],
        '【6〜24時間】継続監視': [
            'エゴサーチを継続しているか？',
            '謝罪ツイート後も炎上が収まらない場合の追加対応を検討したか？',
            '建設的なリプライには返信したか？',
            '攻撃的なリプライをTwitterに通報したか？',
            '弁護士・広報コンサルタントへの相談が必要か判断したか？'
        ]
    }

    note = '【重要】このチェックリストを印刷し、炎上発生時にすぐに使えるようにしてください。'

    output_path = Path('content/platform-specific/images/crisis-management-checklist.png')
    create_checklist(title, subtitle, categories, output_path, note)


def create_review_response_checklist():
    """口コミ返信前チェックリスト（改善版）"""
    title = '口コミ返信前チェックリスト'
    subtitle = '〜返信する前に必ず確認〜'

    categories = {
        '【基本チェック】': [
            '誤字脱字はないか？',
            '文法的に正しいか？',
            '顧客名を正しく記載しているか？（記載する場合）',
            '敬語は適切か？'
        ],
        '【内容チェック】': [
            '感情的な表現はないか？',
            '言い訳・責任転嫁をしていないか？',
            '具体的な改善策を示しているか？',
            '顧客の指摘に対して真摯に向き合っているか？'
        ],
        '【トーンチェック】': [
            '高評価には感謝と親しみを示しているか？',
            '低評価には謝罪と改善を示しているか？',
            '事務的すぎず、人間味があるか？',
            '攻撃的な口コミには冷静に対応しているか？'
        ],
        '【リスクチェック】': [
            '個人情報を記載していないか？',
            '他の顧客を不快にさせる表現はないか？',
            '法的リスクのある表現はないか？',
            'ステマ・やらせと受け取られる表現はないか？'
        ],
        '【最終確認】': [
            '複数人（2名以上）でチェックしたか？',
            '上司・責任者の承認を得たか？',
            '返信後の監視体制は整っているか？'
        ]
    }

    note = '【使い方】返信を作成したら、このチェックリストで全項目を確認し、問題がなければ投稿してください。'

    output_path = Path('content/mild-response/images/review-response-checklist.png')
    create_checklist(title, subtitle, categories, output_path, note)


def create_google_maps_optimization_checklist():
    """Googleマップ最適化チェックリスト（改善版）"""
    title = 'Googleマップ最適化チェックリスト'
    subtitle = '〜MEO対策で検索順位を上げる〜'

    categories = {
        '【Googleビジネスプロフィール基本設定】': [
            '店舗名・住所・電話番号は正確に記載されているか？',
            '営業時間は最新の情報に更新されているか？',
            'カテゴリは適切に設定されているか？（メイン1つ、サブ最大9つ）',
            '店舗説明文は750文字を有効活用しているか？',
            'ウェブサイトURLは設定されているか？'
        ],
        '【写真・動画】': [
            '店舗外観の写真を掲載しているか？',
            '店舗内部の写真を掲載しているか？',
            '商品・メニューの写真を掲載しているか？',
            'スタッフの写真を掲載しているか？',
            '定期的に新しい写真を追加しているか？（月1回以上）'
        ],
        '【口コミ対応】': [
            '全ての口コミに返信しているか？',
            '24時間以内に返信しているか？',
            '低評価口コミにも誠実に対応しているか？',
            '高評価口コミには感謝を示しているか？'
        ],
        '【投稿機能】': [
            '週1回以上、最新情報を投稿しているか？',
            'イベント・キャンペーン情報を投稿しているか？',
            '写真付きで投稿しているか？'
        ],
        '【Q&A】': [
            'よくある質問に事前に回答を用意しているか？',
            'ユーザーからの質問に24時間以内に回答しているか？'
        ]
    }

    note = '【重要】MEO対策は継続が大切です。このチェックリストを月1回確認してください。'

    output_path = Path('content/bridge/images/google-maps-optimization-checklist.png')
    create_checklist(title, subtitle, categories, output_path, note)


def create_amazon_seller_account_health_checklist():
    """Amazon出品者アカウント健全性チェックリスト（改善版）"""
    title = 'Amazon出品者アカウント健全性チェックリスト'
    subtitle = '〜アカウント停止を防ぐための定期確認〜'

    categories = {
        '【注文不良率（ODR）】': [
            '注文不良率は1%未満を維持しているか？',
            '低評価レビューの原因を分析しているか？',
            'Amazonマーケットプレイス保証申請の原因を分析しているか？',
            'チャージバック（クレジットカード不正利用）を確認しているか？'
        ],
        '【出荷パフォーマンス】': [
            '出荷前キャンセル率は2.5%未満か？',
            '出荷遅延率は4%未満か？',
            '追跡可能率は95%以上か？',
            '有効な追跡番号を提供しているか？'
        ],
        '【カスタマーサービス】': [
            'メッセージへの24時間以内返信率は90%以上か？',
            '返品リクエストに48時間以内に対応しているか？',
            'A-to-Zクレームを確認しているか？'
        ],
        '【在庫管理】': [
            '在庫切れ率は確認しているか？',
            '不良在庫（売れ残り）を定期的に確認しているか？',
            'FBA在庫の保管手数料を確認しているか？'
        ],
        '【ポリシー遵守】': [
            '禁止商品を出品していないか？',
            '商品説明に誤りはないか？',
            '知的財産権を侵害していないか？',
            'レビュー操作をしていないか？'
        ]
    }

    note = '【重要】週1回、アカウント健全性ダッシュボードを確認してください。ODR 1%以上でアカウント停止のリスクがあります。'

    output_path = Path('content/platform-specific/images/amazon-seller-health-checklist.png')
    create_checklist(title, subtitle, categories, output_path, note)


def create_instagram_crisis_prevention_checklist():
    """Instagram炎上予防チェックリスト（改善版）"""
    title = 'Instagram炎上予防チェックリスト'
    subtitle = '〜投稿前に必ず確認〜'

    categories = {
        '【画像・動画チェック】': [
            '写り込みに問題はないか？（他人の顔、個人情報など）',
            '著作権を侵害していないか？',
            '不適切な表現はないか？',
            'ハッシュタグは適切か？'
        ],
        '【キャプション（文章）チェック】': [
            '誤字脱字はないか？',
            '誤解を招く表現はないか？',
            '差別的表現はないか？',
            '政治・宗教・ジェンダーに触れていないか？'
        ],
        '【ストーリーズチェック】': [
            '24時間で消えることを前提に軽率な投稿をしていないか？',
            'スクリーンショットされても問題ないか？',
            'DMスタンプを設置する場合、誹謗中傷への対応は準備しているか？'
        ],
        '【コメント・DM対応】': [
            '誹謗中傷コメントへの対応フローは準備しているか？',
            'DMへの返信は1時間以内に対応できるか？',
            '攻撃的なDMをブロックする基準は明確か？'
        ],
        '【最終確認】': [
            '複数人（2名以上）でチェックしたか？',
            '上司・責任者の承認を得たか？',
            '投稿後の監視体制は整っているか？'
        ]
    }

    note = '【重要】Instagramは拡散力が高いSNSです。投稿前に必ずこのチェックリストで確認してください。'

    output_path = Path('content/platform-specific/images/instagram-crisis-prevention-checklist.png')
    create_checklist(title, subtitle, categories, output_path, note)


if __name__ == "__main__":
    print("チェックリスト画像を生成中（修正版）...")
    print()

    create_crisis_management_checklist()
    create_review_response_checklist()
    create_google_maps_optimization_checklist()
    create_amazon_seller_account_health_checklist()
    create_instagram_crisis_prevention_checklist()

    print()
    print("✅ すべてのチェックリスト画像を生成しました（修正版）！")
