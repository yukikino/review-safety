'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link
          href="/"
          className="text-lg md:text-xl font-bold hover:opacity-80 transition-opacity text-blue-600"
        >
          口コミ対応マニュアル
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link
            href="/"
            className="font-medium transition-all hover:underline hover:text-gray-900 text-gray-600"
          >
            ホーム
          </Link>
          <Link
            href="/about"
            className="font-medium transition-all hover:underline hover:text-gray-900 text-gray-600"
          >
            サイトについて
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニューを開く"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="font-medium text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              サイトについて
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
