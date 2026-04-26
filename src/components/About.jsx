/* About.jsx */
import { useEffect, useRef } from 'react';
import './About.css';

/* stagger-reveal each line when section enters viewport */
function useStaggerReveal(containerRef) {
  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll('.stagger-line');
    if (!lines?.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          lines.forEach((line, i) => {
            setTimeout(() => line.classList.add('stagger-line--visible'), i * 130);
          });
          obs.disconnect();
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [containerRef]);
}

const techItems = [
  'React','TypeScript','Figma','UI Design','UX Research',
  'Node.js','CSS','HTML','Ionic','Capacitor',
  'React','TypeScript','Figma','UI Design','UX Research',
  'Node.js','CSS','HTML','Ionic','Capacitor',
];

export default function About() {
  const bodyRef = useRef(null);
  useStaggerReveal(bodyRef);

  return (
    <section id="about" className="about">
      <div className="about-inner">

        {/* left anchor column */}
        <aside className="about-anchor reveal">
          <p className="section-label">About Me</p>

          {/* photo placeholder */}
          <div className="about-photo">
            <img src="/images/Profile.svg" alt="Sandra Agustin" className="about-photo-img" />
          </div>

          {/* compact info */}
          <div className="about-info">
            <div className="info-item">
              <span className="info-label">Degree</span>
              <span className="info-value">BS Computer Science</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Caloocan City, Philippines</span>
            </div>
            <div className="info-item">
              <span className="info-label">Focus</span>
              <span className="info-value">UX/UI &amp; Frontend</span>
            </div>
          </div>

          <a href="/Sandra-Agustin-Resume.pdf" download className="btn-resume">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download Resume</span>
          </a>
        </aside>

        {/* right body column — big staggered text */}
        <div className="about-body" ref={bodyRef}>
          <p className="about-line stagger-line">
            A Computer Science student passionate about the intersection of design and development.
          </p>
          <p className="about-line stagger-line">
            I love creating things that look beautiful and work beautifully. Whether that's crafting UI in Figma or building interactive components, I bring attention to detail to every pixel.
          </p>
          <p className="about-line stagger-line">
            I'm currently seeking an internship or OJT opportunity where I can grow, contribute, and make real things people love to use.
          </p>
        </div>

      </div>

      {/* marquee */}
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
