/**
 * Estimates how long a reader will take to read a blog post.
 *
 * Strips HTML tags produced by the Quill editor before counting words,
 * so markup doesn't inflate the estimate.
 *
 * @param content - Raw HTML string from the Quill rich-text editor
 * @param wpm     - Assumed reading speed (default: 200 words per minute)
 * @returns       Estimated read time in whole minutes, minimum 1
 */
export function calculateMinuteRead(content: string, wpm = 200): number {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / wpm));
}
