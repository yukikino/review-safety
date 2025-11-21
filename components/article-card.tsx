'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

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
      className="article-card-hover"
      style={{
        display: 'block',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        border: '1px solid #e5e7eb',
      }}
    >
      {tags && tags.length > 0 && (
        <div style={{ marginBottom: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-block',
                backgroundColor: tagBgColor,
                color: tagColor,
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '500',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 'bold',
        color: 'var(--gray-900)',
        marginBottom: '0.75rem',
        lineHeight: '1.4',
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--gray-600)',
        lineHeight: '1.6',
        marginBottom: '1rem',
      }}>
        {description}
      </p>

      <span style={{
        color: linkColor,
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
      }}>
        続きを読む →
      </span>
    </Link>
  );
}
