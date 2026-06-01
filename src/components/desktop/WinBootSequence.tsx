const BLOCKS = 20;
const BLOCK_START_MS = 800;
const BLOCK_INTERVAL_MS = (2200 - 800) / BLOCKS; // 70ms per block

export function WinBootSequence() {
  return (
    <div className="win-boot" aria-hidden="true" role="presentation">
      <p className="win-boot__text">
        Starting Windows 95...<span className="win-boot__cursor">_</span>
      </p>
      <div className="win-boot__bar">
        {Array.from({ length: BLOCKS }, (_, i) => (
          <div
            key={i}
            className="win-boot__block"
            style={{ animationDelay: `${BLOCK_START_MS + i * BLOCK_INTERVAL_MS}ms` }}
          />
        ))}
      </div>
      <p className="win-boot__label">Jupiter Baudot Portfolio OS</p>
    </div>
  );
}
