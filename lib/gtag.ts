export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Google Analytics が読み込まれているかチェック
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// カスタムイベントを送信
export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
  }
};

// アフィリエイトリンククリック計測
export const trackAffiliateClick = ({
  service,
  category,
  position,
  articleSlug,
  articleCategory,
  destinationUrl,
}: {
  service: string;
  category: string;
  position: 'main_cta' | 'sidebar_cta' | 'inline_link';
  articleSlug?: string;
  articleCategory?: string;
  destinationUrl: string;
}) => {
  event('affiliate_click', {
    affiliate_service: service,
    affiliate_category: category,
    click_position: position,
    article_slug: articleSlug,
    article_category: articleCategory,
    destination_url: destinationUrl,
  });
};

// CTA表示計測
export const trackCTAImpression = ({
  ctaType,
  position,
  articleSlug,
}: {
  ctaType: 'soft' | 'hard' | 'mixed' | 'factoring' | 'accounting' | 'meo' | 'reputation';
  position: 'article_bottom' | 'sidebar';
  articleSlug?: string;
}) => {
  event('cta_impression', {
    cta_type: ctaType,
    cta_position: position,
    article_slug: articleSlug,
  });
};

// CTAクリック計測
export const trackCTAClick = ({
  ctaType,
  position,
  serviceName,
  destinationUrl,
  articleSlug,
}: {
  ctaType: 'soft' | 'hard' | 'mixed' | 'factoring' | 'accounting' | 'meo' | 'reputation';
  position: 'article_bottom' | 'sidebar';
  serviceName: string;
  destinationUrl: string;
  articleSlug?: string;
}) => {
  event('cta_click', {
    cta_type: ctaType,
    cta_position: position,
    service_name: serviceName,
    destination_url: destinationUrl,
    article_slug: articleSlug,
  });
};

// 記事閲覧計測
export const trackArticleView = ({
  articleSlug,
  articleTitle,
  articleCategory,
}: {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
}) => {
  event('view_article', {
    article_slug: articleSlug,
    article_title: articleTitle,
    article_category: articleCategory,
  });
};

// 記事読了計測
export const trackArticleComplete = ({
  articleSlug,
  readingTimeSeconds,
  scrollDepth,
}: {
  articleSlug: string;
  readingTimeSeconds: number;
  scrollDepth: number;
}) => {
  event('article_complete', {
    article_slug: articleSlug,
    reading_time_seconds: readingTimeSeconds,
    scroll_depth: scrollDepth,
  });
};

// 関連記事クリック計測
export const trackRelatedArticleClick = ({
  fromArticle,
  toArticle,
  position,
}: {
  fromArticle: string;
  toArticle: string;
  position: 'sidebar' | 'inline';
}) => {
  event('related_article_click', {
    from_article: fromArticle,
    to_article: toArticle,
    position,
  });
};

// TypeScript用の型定義
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
