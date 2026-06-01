// Maps newer emojis (Emoji 13+) to universally-supported fallbacks for
// platforms that ship older emoji fonts (e.g. Windows without Segoe UI Emoji update).
const FALLBACKS: Record<string, string> = {
  '🪪': '👤', // ID card (Emoji 14.0, 2021) → bust silhouette (Emoji 1.0)
};

function needsFallback(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
}

const ON_WINDOWS = needsFallback();

export function platformEmoji(emoji: string): string {
  if (ON_WINDOWS && FALLBACKS[emoji]) return FALLBACKS[emoji];
  return emoji;
}
