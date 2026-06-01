import { useEffect, useRef, useState } from 'react';
import type { DesktopVariant } from '../../types';

const ROWS = 9;
const COLS = 9;
const MINE_COUNT = 10;

const NUM_COLORS: Record<number, string> = {
  1: '#0000FF', 2: '#008000', 3: '#FF0000',
  4: '#000080', 5: '#800000', 6: '#008080',
  7: '#000000', 8: '#808080',
};

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adjacent: number };
type Status = 'idle' | 'playing' | 'won' | 'lost';

function makeBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
}

function plantMines(board: Cell[][], safeR: number, safeC: number): Cell[][] {
  const b = board.map(row => row.map(c => ({ ...c })));
  let placed = 0;
  while (placed < MINE_COUNT) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (b[r][c].mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    b[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (b[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && b[nr][nc].mine) n++;
        }
      b[r][c].adjacent = n;
    }
  }
  return b;
}

function floodReveal(board: Cell[][], startR: number, startC: number): Cell[][] {
  const b = board.map(row => row.map(c => ({ ...c })));
  function dig(r: number, c: number) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    if (b[r][c].revealed || b[r][c].flagged) return;
    b[r][c].revealed = true;
    if (b[r][c].adjacent === 0 && !b[r][c].mine)
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) dig(r + dr, c + dc);
  }
  dig(startR, startC);
  return b;
}

function isCleared(board: Cell[][]): boolean {
  return board.every(row => row.every(c => c.mine || c.revealed));
}

interface Props { variant?: DesktopVariant }

export function MinesweeperModal({ variant = 'mac' }: Props) {
  const [board, setBoard] = useState<Cell[][]>(makeBoard);
  const [status, setStatus] = useState<Status>('idle');
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const [flagMode, setFlagMode] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const win = variant === 'win';

  function startTimer() {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => setTime(t => Math.min(t + 1, 999)), 1000);
  }

  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  useEffect(() => () => stopTimer(), []);

  function reset() {
    stopTimer();
    setBoard(makeBoard());
    setStatus('idle');
    setFlags(0);
    setTime(0);
    setFlagMode(false);
  }

  function toggleFlag(r: number, c: number) {
    if (status === 'won' || status === 'lost') return;
    if (board[r][c].revealed) return;
    const wasFlagged = board[r][c].flagged;
    setBoard(prev => prev.map((row, ri) =>
      row.map((cell, ci) => ri === r && ci === c ? { ...cell, flagged: !cell.flagged } : cell)
    ));
    setFlags(f => wasFlagged ? f - 1 : f + 1);
  }

  function reveal(r: number, c: number) {
    if (status === 'won' || status === 'lost') return;
    if (board[r][c].revealed || board[r][c].flagged) return;

    let b = board;
    if (status === 'idle') {
      b = plantMines(board, r, c);
      startTimer();
    }

    if (b[r][c].mine) {
      setBoard(b.map(row => row.map(c => c.mine ? { ...c, revealed: true } : c)));
      setStatus('lost');
      stopTimer();
      return;
    }

    const next = floodReveal(b, r, c);
    setBoard(next);
    if (isCleared(next)) {
      setStatus('won');
      stopTimer();
    } else {
      setStatus('playing');
    }
  }

  function handleClick(r: number, c: number) {
    if (flagMode) toggleFlag(r, c);
    else reveal(r, c);
  }

  function handleContextMenu(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    toggleFlag(r, c);
  }

  const face = status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂';
  const remaining = String(Math.max(0, MINE_COUNT - flags)).padStart(3, '0');
  const elapsed = String(Math.min(999, time)).padStart(3, '0');

  return (
    <div className={`ms-game ms-game--${variant}`}>
      <div className={`ms-header${win ? ' ms-header--win' : ''}`}>
        <span className={`ms-display${win ? ' ms-display--win' : ''}`} aria-label={`${MINE_COUNT - flags} mines remaining`}>
          {remaining}
        </span>
        <div className="ms-face-row">
          <button className={`ms-face${win ? ' ms-face--win' : ''}`} onClick={reset} aria-label="New game" type="button">
            {face}
          </button>
          <button
            className={`ms-flag-toggle${flagMode ? ' ms-flag-toggle--active' : ''}${win ? ' ms-flag-toggle--win' : ''}`}
            onClick={() => setFlagMode(m => !m)}
            aria-label="Toggle flag mode"
            aria-pressed={flagMode}
            title="Flag mode (right-click also works)"
            type="button"
          >
            🚩
          </button>
        </div>
        <span className={`ms-display${win ? ' ms-display--win' : ''}`} aria-label={`${time} seconds`}>
          {elapsed}
        </span>
      </div>

      <div className={`ms-board${win ? ' ms-board--win' : ''}`} role="grid" aria-label="Minesweeper grid">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const content = cell.flagged ? '🚩'
              : !cell.revealed ? ''
              : cell.mine ? '💣'
              : cell.adjacent > 0 ? String(cell.adjacent)
              : '';
            const numColor = cell.revealed && !cell.mine && cell.adjacent > 0
              ? NUM_COLORS[cell.adjacent]
              : undefined;

            return (
              <button
                key={`${r}-${c}`}
                className={[
                  'ms-cell',
                  `ms-cell--${variant}`,
                  cell.revealed ? 'ms-cell--revealed' : '',
                  cell.mine && cell.revealed ? 'ms-cell--mine' : '',
                ].filter(Boolean).join(' ')}
                style={numColor ? { color: numColor } : undefined}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleContextMenu(e, r, c)}
                aria-label={`Row ${r + 1} Col ${c + 1}${cell.revealed ? ' revealed' : ''}${cell.flagged ? ' flagged' : ''}`}
                type="button"
                role="gridcell"
              >
                {content}
              </button>
            );
          })
        )}
      </div>

      {status !== 'idle' && status !== 'playing' && (
        <p className={`ms-status${win ? ' ms-status--win' : ''}`}>
          {status === 'won' ? 'You cleared it! 🎉' : 'Boom. Click 🙂 to retry.'}
        </p>
      )}
    </div>
  );
}
