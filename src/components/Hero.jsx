/* Hero.jsx */
import { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const leftEyeRef  = useRef(null);
  const rightEyeRef = useRef(null);
  const timers      = useRef([]);
  const [phase, setPhase] = useState('greet');

  /* scroll to top */
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

  /* lock scroll during intro */
  useEffect(() => {
    const introPhases = ['greet', 'expand', 'shrink', 'content'];
    document.body.style.overflow = introPhases.includes(phase) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  /* intro sequence */
  useEffect(() => {
    const hero = document.getElementById('hero');

    const start = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [
        setTimeout(() => setPhase('expand'),  1400),
        setTimeout(() => setPhase('shrink'),  4000),
        setTimeout(() => setPhase('content'), 5800),
        setTimeout(() => setPhase('face'),    6400),
      ];
    };

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setPhase(p => { if (p === 'greet') start(); return p; });
      } else {
        timers.current.forEach(clearTimeout);
        setPhase('face');
      }
    }, { threshold: 0.1 });

    if (hero) obs.observe(hero);
    start();

    return () => {
      timers.current.forEach(clearTimeout);
      obs.disconnect();
    };
  }, []);

  return (
    <section id="hero" className={`hero hero--${phase}`}>

      {/* pinned greeting — used on desktop + during shrink animation on mobile */}
      <span className="hero-greeting-pinned">Hello, I'm Sandra.</span>

      <div className="hero-layout">

        <div className="hero-face">
          <div className="face-wrap">
            <img src="/images/Face.svg" alt="Sandra's illustrated character" className="face-base" draggable="false" />
            <div className="eyes-overlay" aria-hidden="true">
              <div className="eye-socket" ref={leftEyeRef}><div className="pupil" /></div>
              <div className="eye-socket" ref={rightEyeRef}><div className="pupil" /></div>
            </div>
          </div>
        </div>

        {/*
          INLINE GREETING — only visible on mobile (≤860px).
          Sits in normal document flow between the face and the text block,
          so it is always naturally above the headline on any screen size.
          CSS controls its visibility and fade-in timing.
        */}
        <p className="hero-greeting-inline" aria-hidden="true">Hello, I'm Sandra.</p>

        <div className="hero-text">
          {/* in-flow greeting — only visible in greet + expand phases */}
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
              <a href="https://github.com/sandytrtl" target="_blank" rel="noreferrer" className="social-circle" aria-label="GitHub">
                <img src="/images/GithubLogo.svg" alt="" />
              </a>
              <a href="https://www.linkedin.com/in/sandra-agustin" target="_blank" rel="noreferrer" className="social-circle" aria-label="LinkedIn">
                <img src="/images/LinkedInLogo.svg" alt="" />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=agustin.sandra.sca@gmail.com&su=Project%20Inquiry" target="_blank" rel="noreferrer" className="social-circle" aria-label="Email">
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