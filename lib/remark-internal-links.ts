/**
 * Custom remark plugin for automatic internal link insertion
 *
 * Walks the MDAST and replaces keyword occurrences in text nodes
 * with link nodes pointing to internal URLs.
 */

import { visit, SKIP } from 'unist-util-visit';
import { getSortedLinkMap } from './internal-link-map';

export interface RemarkInternalLinksOptions {
  currentUrl?: string;
  maxLinks?: number;
}

export default function remarkInternalLinks(
  options: RemarkInternalLinksOptions = {}
) {
  const { currentUrl = '', maxLinks = 5 } = options;
  const linkMap = getSortedLinkMap();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    let insertedCount = 0;
    const usedKeywords = new Set<string>();

    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (insertedCount >= maxLinks) return SKIP;
      if (index === undefined || !parent) return;

      // Don't modify text inside links, headings, code, strong, emphasis
      if (
        parent.type === 'link' ||
        parent.type === 'heading' ||
        parent.type === 'strong' ||
        parent.type === 'emphasis' ||
        parent.type === 'inlineCode' ||
        parent.type === 'code' ||
        parent.type === 'blockquote'
      ) {
        return;
      }

      const text: string = node.value;

      for (const entry of linkMap) {
        if (insertedCount >= maxLinks) break;
        if (usedKeywords.has(entry.keyword)) continue;
        if (currentUrl && entry.url === currentUrl) continue;

        const idx = text.indexOf(entry.keyword);
        if (idx === -1) continue;

        // Found a match
        usedKeywords.add(entry.keyword);
        insertedCount++;

        const before = text.slice(0, idx);
        const after = text.slice(idx + entry.keyword.length);

        const newNodes: any[] = [];

        if (before) {
          newNodes.push({ type: 'text', value: before });
        }

        newNodes.push({
          type: 'link',
          url: entry.url,
          children: [{ type: 'text', value: entry.keyword }],
        });

        if (after) {
          newNodes.push({ type: 'text', value: after });
        }

        // Replace the text node with the new nodes
        parent.children.splice(index, 1, ...newNodes);

        return SKIP;
      }
    });
  };
}
