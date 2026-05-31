export function ProjectsModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Selected work</h2>
      <p className="modal-content__note">
        More coming soon — currently finishing Pi Trading Dashboard.
      </p>

      <div className="project-card">
        <div className="project-card__header">
          <span className="project-card__name">Pi Trading Dashboard</span>
          <span className="badge badge--wip">coming soon</span>
        </div>
        <p className="project-card__stack">React · TypeScript · Python · Anthropic SDK · Raspberry Pi</p>
        <p className="project-card__desc">
          AI-powered autonomous trading agent with human-in-the-loop approval gates.
          Runs on two Raspberry Pis. Scheduled Claude API calls with event-driven
          alerts on significant market moves.
        </p>
      </div>

      <div className="project-card">
        <div className="project-card__header">
          <span className="project-card__name">DCG Dental CE Platform</span>
          <span className="badge badge--live">live</span>
        </div>
        <p className="project-card__stack">Next.js 14 · Supabase · Stripe · Playwright</p>
        <p className="project-card__desc">
          Full-stack continuing education marketplace for dental professionals.
          60+ live class listings, auth, payments, admin approval workflows.
          2 engineers, 8 weeks to MVP.
        </p>
        <a
          href="https://dcgdental.com"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
          aria-label="Visit DCG Dental CE Platform (opens in new tab)"
        >
          dcgdental.com ↗
        </a>
      </div>
    </article>
  );
}
