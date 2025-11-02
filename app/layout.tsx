import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mibarai-guide.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '未入金・支払い催促実務ガイド',
    template: '%s | 未入金・支払い催促実務ガイド',
  },
  description: '取引先からの未入金・支払い遅延に悩む方のための実務ガイド。催促メールのテンプレートから法的手続きまで、段階的な対応方法を解説します。',
  keywords: ['未入金', '支払い催促', '催促メール', '内容証明', '債権回収', '支払督促', '少額訴訟'],
  authors: [{ name: '未入金対応アドバイザー' }],
  creator: '未入金・支払い催促実務ガイド',
  publisher: '未入金・支払い催促実務ガイド',
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
    title: '未入金・支払い催促実務ガイド',
    description: '取引先からの未入金・支払い遅延に悩む方のための実務ガイド。催促メールのテンプレートから法的手続きまで、段階的な対応方法を解説します。',
    siteName: '未入金・支払い催促実務ガイド',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: '未入金・支払い催促実務ガイド',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '未入金・支払い催促実務ガイド',
    description: '取引先からの未入金・支払い遅延に悩む方のための実務ガイド',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
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
