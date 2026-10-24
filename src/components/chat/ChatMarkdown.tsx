import { ReactNode } from "react";

// Minimal Markdown for bot replies: paragraphs, bullet/numbered lists,
// **bold**, [links](url) and bare URLs. Builds React nodes instead of
// injecting HTML, so model output can never inject markup.

const inlinePattern =
  /\*\*(.+?)\*\*|\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)|(https?:\/\/[^\s<]*[^\s<.,:;"')\]])/g;

const linkClass =
  "text-teal-light underline underline-offset-2 hover:text-white transition-colors break-words";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const [full, bold, linkText, linkUrl, bareUrl] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));

    const key = `${keyPrefix}-${index}`;
    if (bold !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-white">
          {renderInline(bold, key)}
        </strong>,
      );
    } else {
      const href = linkUrl ?? bareUrl;
      const isMail = href.startsWith("mailto:");
      nodes.push(
        <a
          key={key}
          href={href}
          target={isMail ? undefined : "_blank"}
          rel={isMail ? undefined : "noopener noreferrer"}
          className={linkClass}
        >
          {linkText ?? bareUrl}
        </a>,
      );
    }
    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type Block =
  | { type: "p"; lines: string[] }
  | { type: "ul" | "ol"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    const last = blocks[blocks.length - 1];
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);

    if (!line) {
      blocks.push({ type: "p", lines: [] });
    } else if (bullet || numbered) {
      const type = bullet ? "ul" : "ol";
      const item = (bullet ?? numbered)![1];
      if (last?.type === type) last.items.push(item);
      else blocks.push({ type, items: [item] });
    } else if (last?.type === "p") {
      last.lines.push(line);
    } else {
      blocks.push({ type: "p", lines: [line] });
    }
  }

  return blocks.filter((b) => (b.type === "p" ? b.lines.length : true));
}

export function ChatMarkdown({ content }: { content: string }) {
  return (
    <div className="space-y-2">
      {parseBlocks(content).map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i}>
              {block.lines.map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {renderInline(line, `${i}-${j}`)}
                </span>
              ))}
            </p>
          );
        }
        const ListTag = block.type;
        return (
          <ListTag
            key={i}
            className={`space-y-1 pl-5 ${
              ListTag === "ul" ? "list-disc" : "list-decimal"
            } marker:text-teal`}
          >
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
}
