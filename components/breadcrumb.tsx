import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className="mb-4">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center gap-2">
            {index > 0 && (
              <span style={{ color: 'var(--foreground-muted)' }}>›</span>
            )}
            {index === items.length - 1 ? (
              <span style={{ color: 'var(--foreground-muted)' }}>
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:underline transition-colors"
                style={{ color: 'var(--primary-blue)' }}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
