import { useState } from 'react';

type Mood = 'neutral' | 'happy' | 'sad';

interface Props {
  onHire: () => void;
  onDismiss: () => void;
}

export function Clippy({ onHire, onDismiss }: Props) {
  const [mood, setMood] = useState<Mood>('neutral');
  const [dismissing, setDismissing] = useState(false);
  const [message, setMessage] = useState(
    "It looks like you're looking at a portfolio.\nWould you like help getting Jupiter hired?"
  );

  function handleYes() {
    setMood('happy');
    setDismissing(true);
    setTimeout(onHire, 600);
  }

  function handleNo() {
    setMood('sad');
    setMessage('Oh... okay. 😢');
    setDismissing(true);
    setTimeout(onDismiss, 900);
  }

  return (
    <div className={`clippy-container${dismissing ? ' clippy-container--exit' : ''}`} aria-live="polite">
      <div className="clippy-bubble">
        <p className="clippy-bubble__text">
          {message.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </p>
        {!dismissing && (
          <div className="clippy-bubble__actions">
            <button className="clippy-btn" onClick={handleYes} type="button">Yes please</button>
            <button className="clippy-btn" onClick={handleNo} type="button">Don't show this again</button>
          </div>
        )}
      </div>

      <div className={`clippy-figure${mood === 'happy' ? ' clippy--happy' : mood === 'sad' ? ' clippy--sad' : ''}`}>
        <svg viewBox="0 0 60 92" width="60" height="92" aria-hidden="true">
          {/* Outer paperclip loop */}
          <rect x="8" y="4" width="44" height="66" rx="22" fill="none" stroke="#c8a42e" strokeWidth="6"/>
          {/* Inner clip loop */}
          <rect x="21" y="30" width="18" height="58" rx="9" fill="none" stroke="#c8a42e" strokeWidth="5"/>

          {/* Neutral / Happy eyes */}
          {mood !== 'sad' && (
            <>
              <circle cx="23" cy="22" r={mood === 'happy' ? 5.5 : 4} fill="#333"/>
              <circle cx="37" cy="22" r={mood === 'happy' ? 5.5 : 4} fill="#333"/>
            </>
          )}
          {/* Happy eyebrows — raised outward */}
          {mood === 'happy' && (
            <>
              <path d="M16 13 Q22 9 28 13" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 13 Q38 9 44 13" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}

          {/* Sad eyes — drooped */}
          {mood === 'sad' && (
            <>
              <ellipse cx="23" cy="24" rx="4" ry="3" fill="#333"/>
              <ellipse cx="37" cy="24" rx="4" ry="3" fill="#333"/>
              {/* Sad eyebrows — angled down toward centre */}
              <path d="M16 15 L26 19" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
              <path d="M34 19 L44 15" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
