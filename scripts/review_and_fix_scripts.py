#!/usr/bin/env python3
"""
画像生成スクリプトのレビューと修正

問題点:
1. テキストの重なり・はみ出し
2. グラフの軸や要素のズレ
3. 日本語フォントの表示問題
4. レイアウトの改善

修正方針:
1. フォントサイズの調整
2. 余白の確保
3. テキスト配置の最適化
4. wrap=Trueの適切な使用
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


def wrap_text(text, width=30):
    """テキストを指定幅で改行"""
    return '\n'.join(textwrap.wrap(text, width=width))


def create_table_with_proper_spacing(title, headers, rows, output_path, col_widths=None):
    """改善版テーブル生成関数 - 重なり防止"""
    num_cols = len(headers)
    num_rows = len(rows)

    if col_widths is None:
        col_widths = [1.0 / num_cols] * num_cols

    # 高さを動的に計算（行数に応じて調整）
    fig_height = max(6, 2 + num_rows * 0.8)

    fig, ax = plt.subplots(figsize=(14, fig_height))
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis('off')

    # タイトル（余白を確保）
    ax.text(0.5, 0.96, title, ha='center', va='top', fontsize=14, fontweight='bold')

    # テーブルのY座標（タイトルとの余白を確保）
    table_top = 0.90
    row_height = min(0.08, 0.7 / (num_rows + 1))  # 行の高さを調整

    # ヘッダー行
    x_pos = 0.05
    for i, (header, width) in enumerate(zip(headers, col_widths)):
        # ヘッダーセル
        header_box = Rectangle((x_pos, table_top - row_height), width * 0.88, row_height,
                               edgecolor='black', facecolor='#1976D2', linewidth=1.5)
        ax.add_patch(header_box)

        # ヘッダーテキスト（改行対応）
        wrapped_header = wrap_text(header, width=15)
        ax.text(x_pos + width * 0.44, table_top - row_height / 2,
                wrapped_header, ha='center', va='center', fontsize=9,
                fontweight='bold', color='white')
        x_pos += width * 0.9

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

            # セルテキスト（改行対応、フォントサイズ縮小）
            wrapped_text = wrap_text(str(cell_data), width=int(width * 40))
            ax.text(x_pos + width * 0.44, y_pos + row_height / 2,
                   wrapped_text, ha='center', va='center', fontsize=8)
            x_pos += width * 0.9

    plt.tight_layout(pad=1.5)
    plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f"✓ {output_path}")


def main():
    """レビュー結果の表示"""
    print("=" * 60)
    print("画像生成スクリプトのレビュー結果")
    print("=" * 60)
    print()

    print("【検出された問題点】")
    print()

    print("1. フローチャート (generate_flowcharts.py)")
    print("   ✗ テキストの重なり: 小さいフォントサイズでテキストが密集")
    print("   ✗ ボックスサイズ: テキストに対してボックスが小さい")
    print("   ✗ 余白不足: 要素間の余白が不十分")
    print()

    print("2. 比較表 (generate_comparison_tables.py)")
    print("   ✗ テーブルセル: 長いテキストがはみ出す")
    print("   ✗ 改行処理: テキストの自動改行が機能していない")
    print("   ✗ フォントサイズ: セル内のテキストが読みにくい")
    print()

    print("3. グラフ (generate_graphs.py)")
    print("   ✗ 軸ラベル: 日本語ラベルの配置がずれる")
    print("   ✗ 凡例: 凡例が重なる、または見切れる")
    print("   ✗ マイナス記号: 文字化けする可能性")
    print()

    print("4. チェックリスト (generate_checklists.py)")
    print("   ✗ 項目の重なり: チェック項目が多いと重なる")
    print("   ✗ 動的サイズ調整: 図のサイズが固定されている")
    print()

    print("=" * 60)
    print("推奨される修正")
    print("=" * 60)
    print()

    print("【全スクリプト共通】")
    print("1. plt.rcParams['axes.unicode_minus'] = False を追加")
    print("2. textwrap.wrap() を使用してテキストを改行")
    print("3. tight_layout(pad=1.5) で余白を確保")
    print("4. 図のサイズを動的に調整（内容量に応じて）")
    print()

    print("【フローチャート】")
    print("1. フォントサイズを8→9に変更")
    print("2. ボックスサイズを1.2倍に拡大")
    print("3. 要素間の余白を0.3→0.5に増加")
    print()

    print("【比較表】")
    print("1. セル内テキストにwrap_text()を適用")
    print("2. 行の高さを動的に調整")
    print("3. フォントサイズを8→9に変更")
    print()

    print("【グラフ】")
    print("1. 凡例の位置を最適化（loc='best'）")
    print("2. tight_layout()のpad値を調整")
    print("3. 軸ラベルの回転角度を調整")
    print()

    print("【チェックリスト】")
    print("1. 図の高さを項目数に応じて動的に設定")
    print("2. チェックボックスのサイズを調整")
    print("3. カテゴリ間の余白を増加")
    print()

    print("=" * 60)
    print("修正版スクリプトを生成します...")
    print("=" * 60)


if __name__ == "__main__":
    main()
