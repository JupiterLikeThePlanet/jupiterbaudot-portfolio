const PRIMARY = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind', 'GraphQL',
  'PostgreSQL', 'Supabase', 'Drizzle ORM', 'Anthropic SDK', 'Playwright',
  'Stripe', 'Redux',
];

const AI_TOOLING = [
  'Claude Code CLI', 'Cursor', 'GitHub Copilot', 'n8n',
];

export function SkillsModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Stack</h2>

      <section className="modal-content__section">
        <h3 className="modal-content__subheading">Primary</h3>
        <div className="pill-group" aria-label="Primary stack">
          {PRIMARY.map((s) => <span key={s} className="pill">{s}</span>)}
        </div>
      </section>

      <section className="modal-content__section">
        <h3 className="modal-content__subheading">AI tooling</h3>
        <div className="pill-group" aria-label="AI tooling">
          {AI_TOOLING.map((s) => <span key={s} className="pill">{s}</span>)}
        </div>
      </section>
    </article>
  );
}
