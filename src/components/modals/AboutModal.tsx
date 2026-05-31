export function AboutModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Jupiter Baudot</h2>
      <p className="modal-content__body">
        Senior frontend engineer based in Los Angeles. 8+ years building interfaces
        at the intersection of design and engineering — Fox Corporation, WebMD, and
        independent products shipped from concept to production.
      </p>
      <p className="modal-content__body">
        I'm the corpus callosum of tech: the bridge between design teams and
        engineering teams, fluent in both languages. I don't just implement
        designs — I make them better in the process.
      </p>
      <div className="modal-content__tags" aria-label="Experience tags">
        {['Fox Corporation', 'WebMD', 'JLP Tech', 'LSU CS'].map((tag) => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
    </article>
  );
}
