import { useState, useEffect, useCallback } from 'react';
import './Projects.css';

const projects = [
  {
    number: '01',
    title: 'Pawlar Website',
    subtitle: 'Full-stack web presence for a smart pet care IoT startup targeting Filipino dog owners.',
    tags: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS'],
    role: 'Frontend Developer · Web Designer',
    year: '2026',
    color: '#9C775C',
    bgAccent: 'rgba(156,119,92,0.05)',
    images: ['/images/Web1.svg', '/images/Web2.svg', '/images/Web3.svg'],
    github: '#',
    liveUrl: 'https://pawlar-website.onrender.com/',
    clickable: true,
  },
  {
    number: '02',
    title: 'Pawlar Application',
    subtitle: 'Cross-platform mobile app for smart pet care management with IoT integration.',
    tags: ['React', 'TypeScript', 'Ionic', 'Capacitor', 'Node.js', 'PostgreSQL'],
    role: 'Frontend Developer · UI/UX Designer',
    year: '2025',
    color: '#9C775C',
    bgAccent: 'rgba(156,119,92,0.05)',
    images: ['/images/Home.svg', '/images/Pawlar.svg', '/images/HomeWithPet.svg'],
    github: '#',
    liveUrl: null,
    clickable: true, // images open in modal
  },
];

/* image modal */
function ImageModal({ src, alt, onClose }) {
  /* close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <button className="modal-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div className="modal-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="modal-img" />
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [modal, setModal] = useState(null); // { src, alt }
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <div className="project-sticky-wrapper" style={{ zIndex: index + 1 }}>
      {modal && <ImageModal src={modal.src} alt={modal.alt} onClose={closeModal} />}

      <div className="project-card">
        <div className="project-card-inner" style={{ '--card-accent': project.color, '--card-bg': project.bgAccent }}>

          {/* header */}
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
              <div className="project-links">
                <a href={project.github} className="project-github" aria-label={`${project.title} on GitHub`}>
                  <GitHubIcon />
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-live" aria-label={`Visit ${project.title}`}>
                    <ExternalIcon />
                    <span>Visit Site</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* screenshots */}
          <div className="project-screenshots">
            {project.images.map((src, i) => {
              const alt = `${project.title} preview ${i + 1}`;
              const clickable = project.clickable;
              return (
                <div
                  key={i}
                  className={`project-screenshot${clickable ? ' project-screenshot--clickable' : ''}`}
                  onClick={clickable ? () => setModal({ src, alt }) : undefined}
                  role={clickable ? 'button' : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onKeyDown={clickable ? (e) => e.key === 'Enter' && setModal({ src, alt }) : undefined}
                  aria-label={clickable ? `View ${alt}` : undefined}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="screenshot-img"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {clickable && (
                    <div className="screenshot-zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/>
                        <line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* footer */}
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
