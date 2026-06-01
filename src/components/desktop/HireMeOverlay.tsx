import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  zx: number;
  zy: number;
  rot: number;
  duration: number;
  delay: number;
  fontSize: number;
  dismissDelay: number;
}

function makeParticles(): Particle[] {
  return Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 82 + 6,
    y: Math.random() * 72 + 8,
    zx: Math.random() * 38 + 16,
    zy: Math.random() * 22 + 10,
    rot: (Math.random() - 0.5) * 28,
    duration: Math.random() * 1.4 + 1.1,
    delay: -(Math.random() * 2.5),
    fontSize: Math.random() * 8 + 11,
    dismissDelay: Math.random() * 0.18,
  }));
}

interface Props {
  onDismiss: () => void;
}

export function HireMeOverlay({ onDismiss }: Props) {
  const [dismissing, setDismissing] = useState(false);
  const particles = useRef(makeParticles());

  useEffect(() => {
    function dismiss() {
      setDismissing(true);
      setTimeout(onDismiss, 750);
    }
    window.addEventListener('keydown', dismiss, { once: true });
    return () => window.removeEventListener('keydown', dismiss);
  }, [onDismiss]);

  function handleClick() {
    if (dismissing) return;
    setDismissing(true);
    setTimeout(onDismiss, 750);
  }

  return (
    <div className="hire-overlay" onClick={handleClick} aria-hidden="true">
      {particles.current.map((p) => (
        <span
          key={p.id}
          className={`hire-text${dismissing ? ' hire-text--dismiss' : ''}`}
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.fontSize}px`,
              '--zx': `${p.zx}px`,
              '--zy': `${p.zy}px`,
              '--rot': `${p.rot}deg`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--dismiss-delay': `${p.dismissDelay}s`,
            } as React.CSSProperties
          }
        >
          HIRE ME
        </span>
      ))}
    </div>
  );
}
