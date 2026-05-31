import { useState } from 'react';
import { WinTaskbar } from './WinTaskbar';
import { DesktopIcon } from './DesktopIcon';
import { ModalWindow } from '../modals/ModalWindow';
import { AboutModal } from '../modals/AboutModal';
import { SkillsModal } from '../modals/SkillsModal';
import { ResumeModal } from '../modals/ResumeModal';
import { ContactModal } from '../modals/ContactModal';
import { ProjectsModal } from '../modals/ProjectsModal';
import { useModal } from '../../hooks/useModal';
import type { ModalId } from '../../types';

const ICONS: { id: ModalId; emoji: string; label: string }[] = [
  { id: 'about',    emoji: '🪪', label: 'About Me'   },
  { id: 'skills',   emoji: '📄', label: 'Skills.txt' },
  { id: 'resume',   emoji: '📋', label: 'Resume.pdf' },
  { id: 'contact',  emoji: '✉️',  label: 'Contact'    },
  { id: 'projects', emoji: '💻', label: 'Projects'   },
];

const MODAL_TITLES: Record<ModalId, string> = {
  about:    'About.txt',
  skills:   'Skills.txt — read only',
  resume:   'Resume.pdf',
  contact:  'Contact',
  projects: 'Projects — in progress',
};

const MODAL_CONTENT: Record<ModalId, React.ReactNode> = {
  about:    <AboutModal />,
  skills:   <SkillsModal />,
  resume:   <ResumeModal />,
  contact:  <ContactModal />,
  projects: <ProjectsModal />,
};

const EASTER_EGGS = [
  { emoji: '🌐', label: 'Internet' },
  { emoji: '🖥️', label: 'My Computer' },
  { emoji: '🗑️', label: 'Recycle Bin' },
];

const CONTACT_LINKS = [
  { emoji: '📧', label: 'Email',    href: 'mailto:jupiterbaudot@gmail.com',          detail: 'jupiterbaudot@gmail.com'       },
  { emoji: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/jupiterbaudot',   detail: 'linkedin.com/in/jupiterbaudot' },
  { emoji: '🐙', label: 'GitHub',   href: 'https://github.com/JupiterLikeThePlanet', detail: 'github.com/JupiterLikeThePlanet'},
];

export function WinDesktop() {
  const { activeModal, isClosing, openModal, closeModal } = useModal();
  const [eggDialogOpen, setEggDialogOpen] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  function handleIconClick(id: ModalId, e: React.MouseEvent<HTMLButtonElement>) {
    setStartMenuOpen(false);
    openModal(id, e.currentTarget);
  }

  return (
    <div className="win-desktop">
      <main className="win-desktop__area" aria-label="Windows 95 desktop">
        <header className="win-desktop__welcome">
          <p className="win-desktop__name">Jupiter Baudot</p>
          <p className="win-desktop__position">Full Stack Developer / Product Engineer</p>
        </header>

        <section className="win-icon-grid" aria-label="Desktop icons">
          {ICONS.map(({ id, emoji, label }) => (
            <DesktopIcon
              key={id}
              emoji={emoji}
              label={label}
              variant="win"
              onClick={(e) => handleIconClick(id, e)}
            />
          ))}
          {EASTER_EGGS.map(({ emoji, label }) => (
            <DesktopIcon
              key={label}
              emoji={emoji}
              label={label}
              variant="win"
              decorative
              onClick={() => { setStartMenuOpen(false); setEggDialogOpen(true); }}
            />
          ))}
        </section>
      </main>

      {startMenuOpen && (
        <div
          className="win-start-backdrop"
          onClick={() => setStartMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {startMenuOpen && (
        <div className="win-start-menu" role="menu" aria-label="Start menu">
          <div className="win-start-menu__sidebar" aria-hidden="true">
            <span>Windows 95</span>
          </div>
          <div className="win-start-menu__content">
            <div className="win-start-menu__identity">
              <p className="win-start-menu__name">Jupiter Baudot</p>
              <p className="win-start-menu__role">Full Stack Developer / Product Engineer</p>
            </div>
            <div className="win-start-menu__divider" />
            <ul className="win-start-menu__links" role="list">
              {CONTACT_LINKS.map(({ emoji, label, href, detail }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win-start-menu__link"
                    role="menuitem"
                    aria-label={`${label}: ${detail}`}
                    onClick={() => setStartMenuOpen(false)}
                  >
                    <span className="win-start-menu__link-icon" aria-hidden="true">{emoji}</span>
                    <span className="win-start-menu__link-text">
                      <span className="win-start-menu__link-label">{label}</span>
                      <span className="win-start-menu__link-detail">{detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <WinTaskbar
        onStartClick={() => setStartMenuOpen((o) => !o)}
        startMenuOpen={startMenuOpen}
      />

      {(activeModal || isClosing) && activeModal && (
        <ModalWindow
          id={activeModal}
          title={MODAL_TITLES[activeModal]}
          variant="win"
          onClose={closeModal}
          isClosing={isClosing}
        >
          {MODAL_CONTENT[activeModal]}
        </ModalWindow>
      )}

      {eggDialogOpen && (
        <ModalWindow
          id="egg"
          title="Error"
          variant="win"
          onClose={() => setEggDialogOpen(false)}
        >
          <p className="win-egg-msg">
            This program is not available in this version of the OS.
          </p>
        </ModalWindow>
      )}
    </div>
  );
}
