/**
 * キーワード → 内部リンクURL のマッピング
 * 記事本文中にこれらのキーワードが出現した場合、自動的に内部リンクに変換される
 *
 * ルール:
 * - 1記事あたり最大5件の自動リンク挿入
 * - 各キーワードは1記事内で最初の1回のみリンク化
 * - 自己リンク（記事自身へのリンク）は挿入しない
 * - 見出し、既存リンク、コードブロック、引用内はスキップ
 *
 * キーワードは長い順にマッチングされる（部分一致の衝突を防ぐ）
 */

export interface InternalLinkEntry {
  keyword: string;
  url: string;
}

export const internalLinkMap: InternalLinkEntry[] = [
  // playbook
  { keyword: '口コミ対応完全ガイド', url: '/playbook/complete-workflow' },
  { keyword: '炎上対応マニュアル', url: '/playbook/crisis-management' },
  { keyword: 'テンプレート管理', url: '/playbook/template-management' },
  { keyword: '口コミを増やす方法', url: '/playbook/review-generation' },
  { keyword: '高評価口コミへの返信', url: '/playbook/positive-review-response' },

  // escalation
  { keyword: '名誉毀損', url: '/escalation/defamation-handling' },
  { keyword: '削除依頼', url: '/escalation/google-review-deletion' },
  { keyword: '発信者情報開示請求', url: '/escalation/sender-identification' },
  { keyword: '営業妨害', url: '/escalation/business-obstruction' },
  { keyword: '競合による嫌がらせ', url: '/escalation/competitor-harassment' },
  { keyword: '事実と違う口コミ', url: '/escalation/false-claims' },
  { keyword: '食中毒', url: '/escalation/food-poisoning-claims' },
  { keyword: '金銭要求', url: '/escalation/money-demand-settlement' },
  { keyword: '脅迫・恐喝', url: '/escalation/threat-extortion-emergency' },
  { keyword: 'プライバシー侵害', url: '/escalation/privacy-invasion-response' },
  { keyword: '差別的発言', url: '/escalation/discrimination-hate-speech-response' },

  // mild-response
  { keyword: '待たされた', url: '/mild-response/waiting-complaint' },
  { keyword: '接客態度', url: '/mild-response/staff-attitude' },
  { keyword: '料金が高い', url: '/mild-response/high-price-complaint' },
  { keyword: '店内が汚い', url: '/mild-response/cleanliness-complaint' },
  { keyword: '予約トラブル', url: '/mild-response/reservation-trouble' },
  { keyword: 'キャンセル料', url: '/mild-response/cancellation-fee' },
  { keyword: '説明不足', url: '/mild-response/lack-of-explanation' },
  { keyword: '設備が古い', url: '/mild-response/facility-complaint' },

  // platform-specific
  { keyword: 'Googleマップ口コミ', url: '/platform-specific/hotpepper-response' },
  { keyword: 'ホットペッパー', url: '/platform-specific/hotpepper-response' },
  { keyword: '食べログ', url: '/platform-specific/tabelog-response' },
  { keyword: 'Twitter炎上', url: '/platform-specific/twitter-crisis-management' },
  { keyword: 'Instagram口コミ', url: '/platform-specific/instagram-response' },
  { keyword: 'App Store', url: '/platform-specific/app-store-response' },
  { keyword: 'Amazon口コミ', url: '/platform-specific/amazon-review-response' },

  // industry-specific
  { keyword: '飲食店の口コミ対応', url: '/industry-specific/restaurant' },
  { keyword: '美容クリニック', url: '/industry-specific/beauty-clinic' },
  { keyword: '歯科医院', url: '/industry-specific/dental-clinic' },
  { keyword: 'ホテル・旅館', url: '/industry-specific/hotel' },
  { keyword: '美容室', url: '/industry-specific/hair-salon' },
  { keyword: '学習塾', url: '/industry-specific/school' },
  { keyword: 'パーソナルジム', url: '/industry-specific/gym' },
  { keyword: '動物病院', url: '/industry-specific/veterinary-clinic-response' },
  { keyword: '介護施設', url: '/industry-specific/nursing-care-response' },
  { keyword: '不動産', url: '/industry-specific/real-estate-rental-response' },

  // bridge
  { keyword: 'MEO対策', url: '/bridge/meo-optimization' },
  { keyword: '口コミ監視ツール', url: '/bridge/monitoring-tools' },
  { keyword: '口コミ返信代行', url: '/bridge/response-outsourcing' },
  { keyword: 'ブランド再構築', url: '/bridge/brand-rebuilding-strategy' },
];

/**
 * キーワードを長い順にソートして返す（部分一致の衝突防止）
 */
export function getSortedLinkMap(): InternalLinkEntry[] {
  return [...internalLinkMap].sort((a, b) => b.keyword.length - a.keyword.length);
}
