# 画像生成スクリプト修正サマリー

## 修正内容

### 1. 比較表・一覧表 (generate_comparison_tables.py)

**修正前の問題:**
- テキストがセルからはみ出す
- 長いテキストが改行されない
- フォントサイズが不適切

**修正内容:**
- `textwrap.wrap()` でテキスト自動改行
- セル内フォントサイズを8-9ptに調整
- 行の高さを動的に調整 (`fig_height = max(8, 3 + num_rows * 0.8)`)
- 列幅を調整 (`col_widths` パラメータ最適化)
- `linespacing=1.2-1.3` で行間を適切に設定

**修正後の改善:**
✓ テキストがセル内に収まる
✓ 長いテキストが自動的に改行される
✓ 表全体が読みやすくなった

### 2. グラフ (generate_graphs.py)

**修正前の問題:**
- 凡例が重なる、見切れる
- 軸ラベルが重なる
- マイナス記号が文字化けする可能性

**修正内容:**
- `plt.rcParams['axes.unicode_minus'] = False` でマイナス記号修正
- 凡例の位置を最適化 (`loc='upper right'`, `loc='lower right'` など)
- X軸ラベルの回転 (`rotation=15, ha='right'`)
- `tight_layout(pad=1.5-2.0)` で余白確保
- グラフサイズを13x7.5に拡大

**修正後の改善:**
✓ 凡例が適切な位置に配置される
✓ 軸ラベルが重ならない
✓ グラフ全体の可読性が向上

### 3. 共通改善

**全スクリプトに適用:**
- `plt.rcParams['axes.unicode_minus'] = False` 追加
- `tight_layout(pad=1.5)` で余白確保
- フォントサイズの統一 (8-11pt)
- `linespacing` パラメータで行間調整

## 生成された画像

### 比較表・一覧表 (5枚)
1. ✓ monitoring-tools-comparison.png - SNS監視ツール比較表
2. ✓ response-tone-comparison.png - 口コミ返信の温度感比較表
3. ✓ platform-response-time-table.png - プラットフォーム別推奨返信時間一覧
4. ✓ lawyer-consultation-criteria.png - 弁護士相談が必要なケース判定表
5. ✓ crisis-level-matrix.png - 危機レベルマトリックス

### グラフ (6枚)
1. ✓ rating-recovery-graph.png - 評価回復グラフ
2. ✓ response-time-impact-graph.png - 返信速度と顧客満足度の相関グラフ
3. ✓ meo-ranking-improvement-graph.png - MEO順位改善グラフ
4. ✓ review-response-roi-graph.png - 口コミ返信のROIグラフ
5. ✓ crisis-damage-comparison.png - 炎上被害額の比較グラフ
6. ✓ review-volume-trend.png - 口コミ件数推移グラフ

## 技術的な改善ポイント

### テキスト処理
```python
import textwrap

def wrap_text(text, width=20):
    """テキストを指定幅で改行"""
    if '\n' in text:
        return text
    return '\n'.join(textwrap.wrap(str(text), width=width))
```

### 動的サイズ調整
```python
# 行数に応じて高さを調整
fig_height = max(8, 3 + num_rows * 0.8)
fig, ax = plt.subplots(figsize=(14, fig_height))
```

### 余白確保
```python
# タイトルとの余白
ax.text(0.5, 0.97, title, ...)  # 0.95 → 0.97

# tight_layout
plt.tight_layout(pad=1.5)  # 余白を1.5倍に
```

### フォント設定
```python
plt.rcParams['font.sans-serif'] = ['Hiragino Sans', 'Yu Gothic', ...]
plt.rcParams['font.size'] = 9
plt.rcParams['axes.unicode_minus'] = False  # 重要！
```

## 今後の改善案

1. フローチャートスクリプトの修正
   - ボックスサイズの最適化
   - テキスト配置の改善

2. チェックリストスクリプトの修正
   - 項目数に応じた動的サイズ調整
   - チェックボックスサイズの調整

3. 全体的な統一
   - 色使いの統一
   - フォントサイズの標準化
   - 余白の統一

## コミット履歴

1. `cca01bb` - feat: 高優先度画像22枚をPythonで生成
2. `37f958f` - fix: 画像生成スクリプトの品質改善（テキスト重なり・レイアウト修正）

## 使用方法

```bash
# 比較表・一覧表の生成
python scripts/generate_comparison_tables.py

# グラフの生成
python scripts/generate_graphs.py

# フローチャートの生成
python scripts/generate_flowcharts.py

# チェックリストの生成
python scripts/generate_checklists.py
```
