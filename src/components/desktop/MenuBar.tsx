import { useClock } from '../../hooks/useClock';

export function MenuBar() {
  const time = useClock();

  return (
    <header className="menubar frosted" role="banner">
      <div className="menubar__left">
        <span className="menubar__logo">⌘ Jupiter Baudot</span>
        <nav className="menubar__nav" aria-label="Menu bar">
          <span className="menubar__nav-item" aria-hidden="true">File</span>
          <span className="menubar__nav-item" aria-hidden="true">View</span>
          <span className="menubar__nav-item" aria-hidden="true">Help</span>
        </nav>
      </div>
      <time className="menubar__clock" aria-label={`Current time: ${time}`}>
        {time}
      </time>
    </header>
  );
}
