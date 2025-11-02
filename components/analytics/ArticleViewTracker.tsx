'use client';

import { useEffect } from 'react';
import { trackArticleView } from '@/lib/gtag';

interface ArticleViewTrackerProps {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
}

export function ArticleViewTracker({
  articleSlug,
  articleTitle,
  articleCategory,
}: ArticleViewTrackerProps) {
  useEffect(() => {
    trackArticleView({
      articleSlug,
      articleTitle,
      articleCategory,
    });
  }, [articleSlug, articleTitle, articleCategory]);

  return null;
}
