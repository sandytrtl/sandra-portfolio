import { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const leftEyeRef  = useRef(null);
  const rightEyeRef = useRef(null);
  /* greet → expand → shrink → content → face */
  const [phase, setPhase] = useState('greet');

  /* scroll to top on mount so intro always plays from hero */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  /* eye tracking */
  useEffect(() => {
    const move = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      [leftEyeRef, rightEyeRef].forEach((ref) => {
        if (!ref.current) return;
        const r   = ref.current.getBoundingClientRect();
        const ex  = r.left + r.width  / 2;
        const ey  = r.top  + r.height / 2;
        const ang = Math.atan2(cy - ey, cx - ex);
        const d   = Math.min(Math.hypot(cx - ex, cy - ey) * 0.11, 5.5);
        const p   = ref.current.querySelector('.pupil');
        if (p) p.style.transform = `translate(calc(-50% + ${Math.cos(ang)*d}px), calc(-50% + ${Math.sin(ang)*d}px))`;
      });
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
    };
  }, []);

  /* intro sequence timing */
  useEffect(() => {
    /* greet   0–2000ms   : small, centered, static */
    /* expand  2000–5000ms: grows large, floats up   */
    /* shrink  5000–7000ms: shrinks back, eases up   */
    /* content 7000ms+    : snaps to flow position   */
    /* face    7600ms+    : slides in from left      */
    const t1 = setTimeout(() => setPhase('expand'),  2000);
    const t2 = setTimeout(() => setPhase('shrink'),  5000);
    const t3 = setTimeout(() => setPhase('content'), 7000);
    const t4 = setTimeout(() => setPhase('face'),    7600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
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
          <p className="hero-greeting">Hello, I'm Sandra.</p>

          <h1 className="hero-headline">
            I love to{' '}
            <span className="highlight">design</span>
            {' '}and{' '}
            <span className="highlight">develop</span>
            {' '}things into real, working websites.
          </h1>

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
