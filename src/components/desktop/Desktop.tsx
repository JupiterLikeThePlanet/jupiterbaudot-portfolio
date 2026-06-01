import { useState, useEffect } from 'react';
import { MacDesktop } from './MacDesktop';
import { WinDesktop } from './WinDesktop';
import { BootSequence } from './BootSequence';
import { WinBootSequence } from './WinBootSequence';
import type { DesktopVariant } from '../../types';

function getVariant(width: number): DesktopVariant {
  return width < 768 ? 'win' : 'mac';
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Desktop() {
  const [variant, setVariant] = useState<DesktopVariant>(() =>
    getVariant(window.innerWidth)
  );
  const [showBoot, setShowBoot] = useState(!prefersReducedMotion);
  const [showWinBoot, setShowWinBoot] = useState(!prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    function handleChange(e: MediaQueryListEvent) {
      setVariant(e.matches ? 'win' : 'mac');
    }
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!showBoot) return;
    const timer = setTimeout(() => setShowBoot(false), 2500);
    return () => clearTimeout(timer);
  }, [showBoot]);

  useEffect(() => {
    if (!showWinBoot) return;
    const timer = setTimeout(() => setShowWinBoot(false), 3000);
    return () => clearTimeout(timer);
  }, [showWinBoot]);

  return (
    <>
      {variant === 'win' ? <WinDesktop /> : <MacDesktop />}
      {showBoot && variant === 'mac' && <BootSequence />}
      {showWinBoot && variant === 'win' && <WinBootSequence />}
    </>
  );
}
