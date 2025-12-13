import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://review-safety.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '低評価口コミ・クレーム対応マニュアル',
    template: '%s | 口コミ対応マニュアル',
  },
  description: 'Googleマップやホットペッパーの★1レビューへの返信テンプレートから削除依頼、法的対応まで。飲食店、美容クリニック、エステなど店舗オーナー向けの実務ガイド。',
  keywords: ['口コミ対応', 'クレーム対応', '低評価レビュー', 'Googleマップ', 'ホットペッパー', '返信テンプレート', '削除依頼', '名誉毀損'],
  authors: [{ name: '口コミ対応マニュアル編集部' }],
  creator: '口コミ対応マニュアル',
  publisher: '口コミ対応マニュアル',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    title: '低評価口コミ・クレーム対応マニュアル',
    description: 'Googleマップやホットペッパーの★1レビューへの返信テンプレートから削除依頼、法的対応まで。店舗オーナー向けの実務ガイド。',
    siteName: '口コミ対応マニュアル',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '低評価口コミ・クレーム対応マニュアル',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '低評価口コミ・クレーム対応マニュアル',
    description: 'Googleマップやホットペッパーの★1レビューへの返信テンプレートから削除依頼、法的対応まで',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <GoogleAnalytics />
        <SpeedInsights />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
