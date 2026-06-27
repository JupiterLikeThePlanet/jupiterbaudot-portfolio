export function ProjectsModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Selected work</h2>

      <div className="project-card">
        <div className="project-card__header">
          <span className="project-card__name">Jove Political Data Visualizer</span>
          <span className="badge badge--live">live</span>
        </div>
        <p className="project-card__stack">React · TypeScript · Visx · Claude Skill · Anthropic SDK</p>
        <p className="project-card__desc">
          A Claude skill for building political and election data visualizations.
          Generates complete working components — not just code snippets. Covers
          gubernatorial, senate, and house races. Follows NYT/Visx production standards.
        </p>
        <div className="project-card__links">
          <a
            href="https://picturethis-jove.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label="View Jove Political Data Visualizer demo (opens in new tab)"
          >
            demo ↗
          </a>
          <a
            href="https://github.com/JupiterLikeThePlanet/jove-political-data-viz"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
            aria-label="View Jove Political Data Visualizer skill on GitHub (opens in new tab)"
          >
            skill ↗
          </a>
        </div>
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
    </article>
  );
}
