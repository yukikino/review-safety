'use client';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#000000',
      icon: '𝕏',
    },
    {
      name: 'LINE',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      color: '#06C755',
      icon: 'LINE',
    },
    {
      name: 'はてなブックマーク',
      href: `https://b.hatena.ne.jp/add?mode=confirm&url=${encodedUrl}&title=${encodedTitle}`,
      color: '#00A4DE',
      icon: 'B!',
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>
        共有:
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`${link.name}で共有`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white text-sm font-bold transition-opacity hover:opacity-80"
          style={{ backgroundColor: link.color }}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
