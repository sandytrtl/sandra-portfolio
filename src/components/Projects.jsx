import './Projects.css';

const projects = [
  {
    number: '01',
    title: 'Pawlar Website',
    subtitle: 'Full-stack web presence for a smart pet care IoT startup targeting Filipino dog owners.',
    tags: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS'],
    role: 'Frontend Developer · Web Designer',
    year: '2024',
    highlights: [
      'Responsive website presenting the Pawlar system',
      'Clean layout, consistent spacing, and high usability',
      'Translated Figma UI designs into functional code',
    ],
    color: '#9C775C',
    bgAccent: 'rgba(156,119,92,0.05)',
    screenshots: 3,
    github: '#',
  },
  {
    number: '02',
    title: 'Pawlar Application',
    subtitle: 'Cross-platform mobile app for smart pet care management with IoT integration.',
    tags: ['React', 'TypeScript', 'Ionic', 'Capacitor', 'Node.js', 'PostgreSQL'],
    role: 'Frontend Developer · UI/UX Designer',
    year: '2024',
    highlights: [
      'Cross-platform pet management app',
      'Pet profiles, feeding schedules, activity tracking',
      'Complex features simplified into clean interactions',
    ],
    color: '#9C775C',
    bgAccent: 'rgba(156,119,92,0.05)',
    screenshots: 3,
    github: '#',
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
    </svg>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div
      className="project-sticky-wrapper"
      style={{ zIndex: index + 1 }}
    >
      <div className="project-card">
        <div
          className="project-card-inner"
          style={{
            '--card-accent': project.color,
            '--card-bg': project.bgAccent,
          }}
        >
          {/* ── Header ── */}
          <div className="project-header">
            <div className="project-num-title">
              <span className="project-number">{project.number}</span>
              <div>
                <h3 className="project-title">{project.title}</h3>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-meta-right">
              <p className="project-desc">{project.subtitle}</p>
              <a
                href={project.github}
                className="project-github"
                aria-label={`${project.title} on GitHub`}
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* ── Screenshots ── */}
          <div className="project-screenshots">
            {Array.from({ length: project.screenshots }).map((_, i) => (
              <div key={i} className="project-screenshot">
                <div className="screenshot-inner">
                  <div className="screenshot-shimmer" />
                  <span className="screenshot-label">Preview {i + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="project-footer">
            <span className="project-role">{project.role}</span>
            <span className="project-year">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-header reveal">
        <p className="section-label">Selected Work</p>
        <h2 className="projects-heading">
          Recent<br />
          <span className="accent">Projects</span>
        </h2>
      </div>

      <div className="projects-stack">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>

      <div className="projects-spacer" />
    </section>
  );
}
