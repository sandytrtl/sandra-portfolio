import { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const leftEyeRef  = useRef(null);
  const rightEyeRef = useRef(null);
  const [phase, setPhase] = useState('greet'); // greet → expand → content → face

  /* eye tracking */
  useEffect(() => {
    const move = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      [leftEyeRef, rightEyeRef].forEach((ref) => {
        if (!ref.current) return;
        const rect  = ref.current.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const angle = Math.atan2(clientY - cy, clientX - cx);
        const r     = Math.min(Math.hypot(clientX - cx, clientY - cy) * 0.11, 5.5);
        const pupil = ref.current.querySelector('.pupil');
        if (pupil) {
          pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle)*r}px), calc(-50% + ${Math.sin(angle)*r}px))`;
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

  /* intro sequence */
  useEffect(() => {
    // 0ms:   "Hello, I'm Sandra." appears small, centered, static
    // 500ms: it grows big and floats up to final position
    // 1100ms: headline + actions fade up into place
    // 1700ms: face slides in from left
    const t1 = setTimeout(() => setPhase('expand'),  500);
    const t2 = setTimeout(() => setPhase('content'), 1100);
    const t3 = setTimeout(() => setPhase('face'),    1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section id="hero" className={`hero hero--${phase}`}>
      <div className="hero-layout">

        {/* face — slides in last */}
        <div className="hero-face">
          <div className="face-wrap">
            <img src="/images/Face.svg" alt="Sandra's illustrated character" className="face-base" draggable="false" />
            <div className="eyes-overlay" aria-hidden="true">
              <div className="eye-socket" ref={leftEyeRef}><div className="pupil" /></div>
              <div className="eye-socket" ref={rightEyeRef}><div className="pupil" /></div>
            </div>
          </div>
        </div>

        <div className="hero-text">
          {/* greeting — starts small+centered, then grows+moves to position */}
          <p className="hero-greeting">Hello, I'm Sandra.</p>

          {/* headline — fades up after expand */}
          <h1 className="hero-headline">
            I love to{' '}
            <span className="highlight">design</span>
            {' '}and{' '}
            <span className="highlight">develop</span>
            {' '}things into real, working websites.
          </h1>

          {/* actions — fades up after headline */}
          <div className="hero-actions">
            <a href="#projects" className="btn-view-projects">
              <span>View Projects</span>
            </a>
            <div className="social-circles">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-circle" aria-label="GitHub">
                <img src="/images/GithubLogo.svg" alt="" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-circle" aria-label="LinkedIn">
                <img src="/images/LinkedInLogo.svg" alt="" />
              </a>
              <a href="mailto:agustinsandra.sca@gmail.com" className="social-circle" aria-label="Email">
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
