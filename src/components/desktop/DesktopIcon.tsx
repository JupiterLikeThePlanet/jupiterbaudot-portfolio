import type { DesktopVariant } from '../../types';

interface DesktopIconProps {
  emoji: string;
  label: string;
  variant: DesktopVariant;
  gradient?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  decorative?: boolean;
}

export function DesktopIcon({ emoji, label, variant, gradient, onClick, decorative = false }: DesktopIconProps) {
  if (variant === 'mac') {
    return (
      <button
        className="mac-icon"
        onClick={onClick}
        aria-label={label}
        type="button"
      >
        <span
          className="mac-icon__box"
          aria-hidden="true"
          style={gradient ? ({ '--icon-gradient': gradient } as React.CSSProperties) : undefined}
        >
          {emoji}
        </span>
        <span className="mac-icon__label">{label}</span>
      </button>
    );
  }

  return (
    <button
      className="win-icon"
      onClick={onClick}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      type="button"
      tabIndex={decorative ? -1 : 0}
    >
      <span className="win-icon__box" aria-hidden="true">{emoji}</span>
      <span className="win-icon__label">{label}</span>
    </button>
  );
}
