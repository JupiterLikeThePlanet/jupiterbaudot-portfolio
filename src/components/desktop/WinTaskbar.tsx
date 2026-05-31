import { useClock } from '../../hooks/useClock';

export function WinTaskbar() {
  const time = useClock();

  return (
    <footer className="win-taskbar" role="contentinfo">
      <button className="win-start-btn" type="button" aria-label="Start menu">
        ⊞ Start
      </button>
      <time className="win-taskbar__clock" aria-label={`Current time: ${time}`}>
        {time}
      </time>
    </footer>
  );
}
