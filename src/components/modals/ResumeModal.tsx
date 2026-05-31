const EXPERIENCE = [
  { company: 'Fox Corporation',    period: '2022–Present', role: 'UI/UX Developer, media asset management platform' },
  { company: 'WebMD',              period: '2020–2022',    role: 'Frontend Developer, patient scheduling + design system' },
  { company: 'JLP Tech Consulting',period: '2023–Present', role: 'Full Stack Engineer, 3+ SaaS products shipped' },
  { company: 'Tech Hire',          period: '2018–2020',    role: 'Full Stack Developer, mentored 50+ engineers' },
  { company: 'Speaker',            period: '2016–2018',    role: 'Full Stack Developer, influencer platform' },
];

export function ResumeModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Jupiter Baudot</h2>
      <p className="modal-content__subtitle">
        Senior Frontend Engineer · Design Engineer · Los Angeles
      </p>

      <section className="modal-content__section">
        {EXPERIENCE.map(({ company, period, role }) => (
          <div key={company + period} className="resume-entry">
            <div className="resume-entry__header">
              <span className="resume-entry__company">{company}</span>
              <span className="resume-entry__period">{period}</span>
            </div>
            <p className="resume-entry__role">{role}</p>
          </div>
        ))}
      </section>

      <a
        href="/resume.pdf"
        download
        className="resume-download"
        aria-label="Download full resume PDF"
      >
        ⬇ download full resume
      </a>
    </article>
  );
}
