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

export function WinDesktop() {
  const { activeModal, isClosing, openModal, closeModal } = useModal();
  const [eggDialogOpen, setEggDialogOpen] = useState(false);

  function handleIconClick(id: ModalId, e: React.MouseEvent<HTMLButtonElement>) {
    openModal(id, e.currentTarget);
  }

  return (
    <div className="win-desktop">
      <main className="win-desktop__area" aria-label="Windows 95 desktop">
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
              onClick={() => setEggDialogOpen(true)}
            />
          ))}
        </section>
      </main>

      <WinTaskbar />

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
