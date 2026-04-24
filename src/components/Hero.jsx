import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const leftEyeRef  = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      // Use touch or mouse position
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      [leftEyeRef, rightEyeRef].forEach((ref) => {
        if (!ref.current) return;
        const rect   = ref.current.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = clientX - cx;
        const dy     = clientY - cy;
        const angle  = Math.atan2(dy, dx);
        const dist   = Math.hypot(dx, dy);
        const radius = Math.min(dist * 0.11, 5.5);
        const pupil  = ref.current.querySelector('.pupil');
        if (pupil) {
          pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`;
        }
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-layout">

        {/* ── CHARACTER ── */}
        <div className="hero-face fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="face-wrap">
            <img
              src="/images/Face.svg"
              alt="Sandra's illustrated character"
              className="face-base"
              draggable="false"
            />
            <div className="eyes-overlay" aria-hidden="true">
              <div className="eye-socket" ref={leftEyeRef}>
                <div className="pupil" />
              </div>
              <div className="eye-socket" ref={rightEyeRef}>
                <div className="pupil" />
              </div>
            </div>
          </div>
        </div>

        {/* ── TEXT ── */}
        <div className="hero-text">
          <p className="hero-greeting fade-up" style={{ animationDelay: '0.05s' }}>
            Hello, I'm Sandra.
          </p>

          <h1 className="hero-headline fade-up" style={{ animationDelay: '0.2s' }}>
            I love to{' '}
            <span className="highlight">design</span>
            {' '}and{' '}
            <span className="highlight">develop</span>
            {' '}things into real, working websites.
          </h1>

          <div className="hero-actions fade-up" style={{ animationDelay: '0.38s' }}>
            <a href="#projects" className="btn-view-projects">
              <span>View Projects</span>
            </a>

            <div className="social-circles">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                aria-label="GitHub"
              >
                <img src="/images/GithubLogo.svg" alt="" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-circle"
                aria-label="LinkedIn"
              >
                <img src="/images/LinkedInLogo.svg" alt="" />
              </a>
              <a
                href="mailto:agustinsandra.sca@gmail.com"
                className="social-circle"
                aria-label="Email"
              >
                <img src="/images/GmailLogo.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-divider" />
    </section>
  );
}
