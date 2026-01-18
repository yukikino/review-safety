'use client';

import Link from 'next/link';

interface ArticleCardProps {
  href: string;
  tags?: string[];
  tagColor?: string;
  tagBgColor?: string;
  title: string;
  description: string;
  linkColor?: string;
}

export function ArticleCard({
  href,
  tags,
  tagColor = 'var(--primary-blue)',
  tagBgColor = 'var(--background-secondary)',
  title,
  description,
  linkColor = 'var(--primary-blue)',
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className="article-card-hover block bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 transition-all duration-300 no-underline"
    >
      {tags && tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: tagBgColor,
                color: tagColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 leading-snug line-clamp-2">
        {title}
      </h3>

      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3 md:mb-4">
        {description}
      </p>

      <span
        className="text-sm font-medium inline-flex items-center"
        style={{ color: linkColor }}
      >
        続きを読む →
      </span>
    </Link>
  );
}
