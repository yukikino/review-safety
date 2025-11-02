import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b" style={{ borderColor: 'var(--gray-200)' }}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity" style={{ color: 'var(--primary-blue)' }}>
          未入金・催促ガイド
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="font-medium transition-all hover:underline hover:text-gray-900" style={{
            color: 'var(--foreground-muted)'
          }}>
            ホーム
          </Link>
          <Link href="/about" className="font-medium transition-all hover:underline hover:text-gray-900" style={{
            color: 'var(--foreground-muted)'
          }}>
            サイトについて
          </Link>
        </div>
      </nav>
    </header>
  );
}
