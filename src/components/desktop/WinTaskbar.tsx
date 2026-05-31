import { useClock } from '../../hooks/useClock';

interface WinTaskbarProps {
  onStartClick: () => void;
  startMenuOpen: boolean;
}

export function WinTaskbar({ onStartClick, startMenuOpen }: WinTaskbarProps) {
  const time = useClock();

  return (
    <footer className="win-taskbar" role="contentinfo">
      <button
        className={`win-start-btn${startMenuOpen ? ' win-start-btn--active' : ''}`}
        type="button"
        aria-label="Start menu"
        aria-expanded={startMenuOpen}
        onClick={onStartClick}
      >
        ⊞ Start
      </button>
      <time className="win-taskbar__clock" aria-label={`Current time: ${time}`}>
        {time}
      </time>
    </footer>
  );
}
