'use client';

import Link from 'next/link';

export function ScrollToTop() {
  return (
    <Link
      href="#"
      className="block px-3 py-2 rounded-lg transition-colors hover:bg-gray-100"
      style={{
        color: 'var(--foreground-muted)',
      }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      ↑ ページトップ
    </Link>
  );
}
