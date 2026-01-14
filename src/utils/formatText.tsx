export function formatText(text: string) {
  let formatted = text;

  // Bold *text*
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    "<strong>$1</strong>"
  );

  // Italic _text_
  formatted = formatted.replace(
    /_(.*?)_/g,
    "<em>$1</em>"
  );

  // Strikethrough ~text~
  formatted = formatted.replace(
    /~(.*?)~/g,
    "<del>$1</del>"
  );

  // Inline code `text`
  formatted = formatted.replace(
    /`(.*?)`/g,
    "<code>$1</code>"
  );

  return formatted;
}


