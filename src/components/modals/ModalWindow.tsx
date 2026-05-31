import { useEffect, useRef, type ReactNode } from 'react';
import type { DesktopVariant } from '../../types';

interface ModalWindowProps {
  id: string;
  title: string;
  variant: DesktopVariant;
  onClose: () => void;
  isClosing?: boolean;
  children: ReactNode;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

export function ModalWindow({ id, title, variant, onClose, isClosing = false, children }: ModalWindowProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const labelId = `${id}-title`;

  /* focus trap */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length) focusable[0].focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    dialog.addEventListener('keydown', onKeyDown);
    return () => dialog.removeEventListener('keydown', onKeyDown);
  }, []);

  if (variant === 'mac') {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          ref={dialogRef}
          className={`modal-window modal-window--mac${isClosing ? ' modal-window--closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-chrome">
            <div className="traffic-lights">
              <button
                className="traffic-light traffic-light--red"
                onClick={onClose}
                aria-label="Close"
                type="button"
              />
              <button
                className="traffic-light traffic-light--yellow"
                aria-label="Minimize (not available)"
                title="not yet"
                type="button"
              />
              <button
                className="traffic-light traffic-light--green"
                aria-label="Fullscreen (not available)"
                title="not yet"
                type="button"
              />
            </div>
            <span id={labelId} className="modal-title">{title}</span>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className={`modal-window modal-window--win${isClosing ? ' modal-window--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="win-titlebar">
          <span id={labelId} className="win-titlebar__title">{title}</span>
          <div className="win-titlebar__buttons">
            <button className="win-btn" aria-label="Minimize" type="button">_</button>
            <button className="win-btn" aria-label="Maximize" type="button">□</button>
            <button className="win-btn win-btn--close" onClick={onClose} aria-label="Close" type="button">✕</button>
          </div>
        </div>
        <div className="modal-body modal-body--win">
          {children}
        </div>
      </div>
    </div>
  );
}
