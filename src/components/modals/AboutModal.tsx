export function AboutModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Jupiter Baudot</h2>
      <p className="modal-content__body">
        Eight years at Fox Corporation, WebMD, and three SaaS products I designed,
        built, and shipped solo through my own consulting practice. I write the
        components, design the systems, and own the full stack when the project calls
        for it.
      </p>
      <p className="modal-content__body">
        Designers trust me because I speak their language. Engineers trust me because
        I've done the work. I mentor junior devs and bring the kind of clarity that
        helps teams move with confidence.
      </p>
      <div className="modal-content__tags" aria-label="Experience tags">
        {['Fox Corporation', 'WebMD', 'JLP Tech', 'LSU CS'].map((tag) => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
    </article>
  );
}
