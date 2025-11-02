'use client';

import { trackAffiliateClick } from '@/lib/gtag';

interface AffiliateLinkProps {
  href: string;
  service: string;
  category: string;
  position: 'main_cta' | 'sidebar_cta' | 'inline_link';
  articleSlug?: string;
  articleCategory?: string;
  children: React.ReactNode;
  className?: string;
}

export function AffiliateLink({
  href,
  service,
  category,
  position,
  articleSlug,
  articleCategory,
  children,
  className = '',
}: AffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick({
      service,
      category,
      position,
      articleSlug,
      articleCategory,
      destinationUrl: href,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
