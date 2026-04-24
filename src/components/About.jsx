import './About.css';

export default function About() {
  const techItems = [
    'React','TypeScript','Figma','UI Design','UX Research',
    'Node.js','CSS','HTML','Ionic','Capacitor',
    'React','TypeScript','Figma','UI Design','UX Research',
    'Node.js','CSS','HTML','Ionic','Capacitor',
  ];

  return (
    <section id="about" className="about">
      <div className="about-inner">

        {/* ── LABEL + CONTENT — single column, left-aligned ── */}
        <div className="about-content reveal">
          <p className="section-label">About Me</p>

          <div className="about-body">
            <p className="about-text">
              Hi! I'm Sandra — a Computer Science student at the University of Caloocan City,
              passionate about the intersection of design and development.
            </p>
            <p className="about-text">
              I love creating things that look beautiful <em>and</em> work beautifully.
              Whether that's crafting pixel-perfect UI in Figma or building interactive
              components in React, I bring attention to detail to every pixel.
            </p>
            <p className="about-text">
              Currently seeking an internship or OJT opportunity where I can grow,
              contribute, and make real things people love to use.
            </p>

            <div className="about-info">
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">Caloocan City, Philippines</span>
              </div>
              <div className="info-item">
                <span className="info-label">Degree</span>
                <span className="info-value">BS Computer Science</span>
              </div>
              <div className="info-item">
                <span className="info-label">Focus</span>
                <span className="info-value">UX/UI &amp; Frontend</span>
              </div>
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value info-available">Open to OJT ✦</span>
              </div>
            </div>

            {/* Download Resume button */}
            <a
              href="/Sandra_Agustin_Resume.pdf"
              download
              className="btn-resume"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee-track">
          {techItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}&nbsp;<span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
