import { useEffect, useRef, useState } from 'react';

interface Props {
  onHire: () => void;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

const STEPS: Record<Step, { body: string; yes: string; no: string }> = {
  1: {
    body: "It looks like you're trying to hire a developer.\nWould you like help with that?",
    yes: 'Yes, hire Jupiter',
    no: 'No (wrong)',
  },
  2: {
    body: 'Are you sure?',
    yes: 'Yes, hire Jupiter',
    no: 'Still no',
  },
  3: {
    body: '...Still sure?',
    yes: 'Yes, hire Jupiter',
    no: 'Yes (you give up)',
  },
};

export function AreYouLostDialog({ onHire, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const yesRef = useRef<HTMLButtonElement>(null);
  const { body, yes, no } = STEPS[step];

  useEffect(() => {
    yesRef.current?.focus();
  }, [step]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function handleClose() {
    // On step 3 there's no escaping — both paths lead to hire
    if (step === 3) onHire();
    else onClose();
  }

  function handleYes() {
    onHire();
  }

  function handleNo() {
    if (step === 3) {
      onHire();
    } else {
      setStep((s) => (s + 1) as Step);
    }
  }

  return (
    <div className="lost-overlay" onClick={handleClose} aria-hidden="true">
      <div
        className="lost-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lost-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lost-dialog__titlebar">
          <span id="lost-dialog-title" className="lost-dialog__title">Help &amp; Support</span>
          <button className="win-btn" onClick={handleClose} aria-label="Close" type="button">✕</button>
        </div>
        <div className="lost-dialog__body">
          <span className="lost-dialog__icon" aria-hidden="true">❓</span>
          <p className="lost-dialog__text">
            {body.split('\n').map((line, i) => (
              <span key={i}>{line}{i < body.split('\n').length - 1 && <br />}</span>
            ))}
          </p>
        </div>
        <div className="lost-dialog__buttons">
          <button ref={yesRef} className="lost-btn lost-btn--default" onClick={handleYes} type="button">
            {yes}
          </button>
          <button className="lost-btn" onClick={handleNo} type="button">
            {no}
          </button>
        </div>
      </div>
    </div>
  );
}
