import { useEffect, useRef, useState } from 'react';
import { useClock } from '../../hooks/useClock';
import { HireMeOverlay } from './HireMeOverlay';
import { AreYouLostDialog } from '../interactions/AreYouLostDialog';
import { Clippy } from '../interactions/Clippy';

type ActiveMenu = 'file' | 'view' | 'help' | null;

const CONTACT_LINKS = [
  { emoji: '📧', label: 'Email',    href: 'mailto:jupiterbaudot@gmail.com',          display: 'jupiterbaudot@gmail.com'       },
  { emoji: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/jupiterbaudot',   display: 'linkedin.com/in/jupiterbaudot' },
  { emoji: '🐙', label: 'GitHub',   href: 'https://github.com/JupiterLikeThePlanet', display: 'github.com/JupiterLikeThePlanet'},
];

interface Props {
  onOpenContact: () => void;
}

export function MenuBar({ onOpenContact }: Props) {
  const time = useClock();
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [hireMeActive, setHireMeActive] = useState(false);
  const [showAreYouLost, setShowAreYouLost] = useState(false);
  const [showClippy, setShowClippy] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!activeMenu) return;
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [activeMenu]);

  function toggle(menu: 'file' | 'view' | 'help') {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }

  function handleEmployerView() {
    setActiveMenu(null);
    setHireMeActive(true);
  }

  function handleAreYouLost() {
    setActiveMenu(null);
    setShowAreYouLost(true);
  }

  function handleClippy() {
    setActiveMenu(null);
    setShowClippy(true);
  }

  function handleHire() {
    setShowAreYouLost(false);
    setShowClippy(false);
    onOpenContact();
  }

  return (
    <>
      <header className="menubar frosted" role="banner">
        <div className="menubar__left">
          <span className="menubar__logo">⌘ Jupiter Baudot</span>
          <nav className="menubar__nav" aria-label="Menu bar" ref={navRef}>

            {/* File */}
            <div className="menubar__menu-wrapper">
              <button
                className={`menubar__nav-item${activeMenu === 'file' ? ' menubar__nav-item--active' : ''}`}
                onClick={() => toggle('file')}
                aria-haspopup="menu"
                aria-expanded={activeMenu === 'file'}
              >
                File
              </button>
              {activeMenu === 'file' && (
                <div className="menu-dropdown" role="menu" aria-label="File menu">
                  <p className="menu-dropdown__header">Get in touch</p>
                  {CONTACT_LINKS.map(({ emoji, label, href, display }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="menu-dropdown__item"
                      role="menuitem"
                      onClick={() => setActiveMenu(null)}
                      aria-label={`${label}: ${display}`}
                    >
                      <span className="menu-dropdown__emoji" aria-hidden="true">{emoji}</span>
                      <span className="menu-dropdown__label">{label}</span>
                      <span className="menu-dropdown__detail">{display}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* View */}
            <div className="menubar__menu-wrapper">
              <button
                className={`menubar__nav-item${activeMenu === 'view' ? ' menubar__nav-item--active' : ''}`}
                onClick={() => toggle('view')}
                aria-haspopup="menu"
                aria-expanded={activeMenu === 'view'}
              >
                View
              </button>
              {activeMenu === 'view' && (
                <div className="menu-dropdown" role="menu" aria-label="View menu">
                  <button className="menu-dropdown__item" role="menuitem" onClick={handleEmployerView}>
                    <span className="menu-dropdown__label">Employer View</span>
                  </button>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="menubar__menu-wrapper">
              <button
                className={`menubar__nav-item${activeMenu === 'help' ? ' menubar__nav-item--active' : ''}`}
                onClick={() => toggle('help')}
                aria-haspopup="menu"
                aria-expanded={activeMenu === 'help'}
              >
                Help
              </button>
              {activeMenu === 'help' && (
                <div className="menu-dropdown" role="menu" aria-label="Help menu">
                  <button className="menu-dropdown__item" role="menuitem" onClick={handleAreYouLost}>
                    <span className="menu-dropdown__label">Are you lost?</span>
                  </button>
                  <button className="menu-dropdown__item" role="menuitem" onClick={handleClippy}>
                    <span className="menu-dropdown__label">Clippy</span>
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>
        <time className="menubar__clock" aria-label={`Current time: ${time}`}>
          {time}
        </time>
      </header>

      {hireMeActive && <HireMeOverlay onDismiss={() => setHireMeActive(false)} />}

      {showAreYouLost && (
        <AreYouLostDialog
          onHire={handleHire}
          onClose={() => setShowAreYouLost(false)}
        />
      )}

      {showClippy && (
        <Clippy
          onHire={handleHire}
          onDismiss={() => setShowClippy(false)}
        />
      )}
    </>
  );
}
