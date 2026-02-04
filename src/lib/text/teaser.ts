type TeaserOptions = {
  maxLength?: number;
};

export function buildDescriptionTeaser(
  markdown: string | undefined,
  { maxLength }: TeaserOptions = {}
): string {
  if (!markdown) return "";

  const firstParagraph = markdown.split(/\n\s*\n/)[0] ?? "";

  let text = firstParagraph;
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/^>\s?/gm, "");
  text = text.replace(/^#+\s*/gm, "");
  text = text.replace(/^[-*+]\s+/gm, "");
  text = text.replace(/^\d+\.\s+/gm, "");
  text = text.replace(/[*_~]/g, "");
  text = text.replace(/\s+/g, " ").trim();

  if (maxLength && text.length > maxLength) {
    return `${text.slice(0, maxLength).trim()}…`;
  }

  return text;
}
