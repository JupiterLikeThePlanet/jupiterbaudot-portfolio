const LINKS = [
  {
    emoji: '📧',
    label: 'Email',
    href: 'mailto:jupiterbaudot@gmail.com',
    display: 'jupiterbaudot@gmail.com',
  },
  {
    emoji: '💼',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jupiterbaudot',
    display: 'linkedin.com/in/jupiterbaudot',
  },
  {
    emoji: '🐙',
    label: 'GitHub',
    href: 'https://github.com/JupiterLikeThePlanet',
    display: 'github.com/JupiterLikeThePlanet',
  },
];

export function ContactModal() {
  return (
    <article className="modal-content">
      <h2 className="modal-content__heading">Get in touch</h2>
      <ul className="contact-list" role="list">
        {LINKS.map(({ emoji, label, href, display }) => (
          <li key={label} className="contact-item">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label={`${label}: ${display}`}
            >
              <span aria-hidden="true">{emoji}</span>
              <span className="contact-link__label">{label}</span>
              <span className="contact-link__detail">{display}</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
