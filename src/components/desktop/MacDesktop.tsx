import { MenuBar } from './MenuBar';
import { Taskbar } from './Taskbar';
import { DesktopIcon } from './DesktopIcon';
import { ModalWindow } from '../modals/ModalWindow';
import { AboutModal } from '../modals/AboutModal';
import { SkillsModal } from '../modals/SkillsModal';
import { ResumeModal } from '../modals/ResumeModal';
import { ContactModal } from '../modals/ContactModal';
import { ProjectsModal } from '../modals/ProjectsModal';
import { MinesweeperModal } from '../modals/MinesweeperModal';
import { useModal } from '../../hooks/useModal';
import type { ModalId } from '../../types';

const ICONS: { id: ModalId; emoji: string; label: string }[] = [
  { id: 'about',       emoji: '🪪', label: 'About Me'    },
  { id: 'skills',      emoji: '📄', label: 'Skills.txt'  },
  { id: 'resume',      emoji: '📋', label: 'Resume.pdf'  },
  { id: 'contact',     emoji: '✉️',  label: 'Contact'     },
  { id: 'projects',    emoji: '💻', label: 'Projects'    },
  { id: 'minesweeper', emoji: '💣', label: 'Minesweeper' },
];

const MODAL_TITLES: Record<ModalId, string> = {
  about:       'About.txt',
  skills:      'Skills.txt — read only',
  resume:      'Resume.pdf',
  contact:     'Contact',
  projects:    'Projects — in progress',
  minesweeper: 'Minesweeper',
};

const MODAL_CONTENT: Record<ModalId, React.ReactNode> = {
  about:       <AboutModal />,
  skills:      <SkillsModal />,
  resume:      <ResumeModal />,
  contact:     <ContactModal />,
  projects:    <ProjectsModal />,
  minesweeper: <MinesweeperModal variant="mac" />,
};

export function MacDesktop() {
  const { activeModal, isClosing, openModal, closeModal } = useModal();

  function handleIconClick(id: ModalId, e: React.MouseEvent<HTMLButtonElement>) {
    openModal(id, e.currentTarget);
  }

  return (
    <div className="mac-desktop">
      <MenuBar />

      <main className="mac-desktop__stage">
        <div className="mac-desktop__wallpaper" aria-hidden="true">
          <div className="mac-desktop__scanlines" />
        </div>

        <section className="mac-desktop__hero" aria-label="Introduction">
          <p className="mac-hero__status">STATUS: AVAILABLE FOR HIRE</p>
          <h1 className="mac-hero__name">Jupiter Baudot</h1>
          <p className="mac-hero__title">Full Stack Developer / Product Engineer</p>
          <p className="mac-hero__tagline">
            I build interfaces where design and engineering are the same decision.
          </p>
          <p className="mac-hero__location">Los Angeles</p>
        </section>

        <aside className="mac-desktop__icons" aria-label="Desktop icons">
          {ICONS.map(({ id, emoji, label }) => (
            <DesktopIcon
              key={id}
              emoji={emoji}
              label={label}
              variant="mac"
              onClick={(e) => handleIconClick(id, e)}
            />
          ))}
        </aside>
      </main>

      <Taskbar />

      {(activeModal || isClosing) && activeModal && (
        <ModalWindow
          id={activeModal}
          title={MODAL_TITLES[activeModal]}
          variant="mac"
          onClose={closeModal}
          isClosing={isClosing}
        >
          {MODAL_CONTENT[activeModal]}
        </ModalWindow>
      )}
    </div>
  );
}
