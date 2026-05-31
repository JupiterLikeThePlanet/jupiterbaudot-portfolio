import { useState, useEffect } from 'react';
import { MacDesktop } from './MacDesktop';
import { WinDesktop } from './WinDesktop';
import type { DesktopVariant } from '../../types';

function getVariant(width: number): DesktopVariant {
  return width < 768 ? 'win' : 'mac';
}

export function Desktop() {
  const [variant, setVariant] = useState<DesktopVariant>(() =>
    getVariant(window.innerWidth)
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');

    function handleChange(e: MediaQueryListEvent) {
      setVariant(e.matches ? 'win' : 'mac');
    }

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return variant === 'win' ? <WinDesktop /> : <MacDesktop />;
}
