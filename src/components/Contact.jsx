import { useEffect, useRef } from 'react';
import './Contact.css';

function TogetherWord() {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        el.classList.add('animate');
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span className="together-wrap" ref={ref} aria-label="together.">
      <span className="toge">TOGE</span>
      <span className="ther">THER.</span>
    </span>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">

        {/* ── LEFT ── */}
        <div className="contact-left reveal">
          <p className="section-label">Get in Touch</p>
          <h2 className="contact-heading">
            Let's build<br />
            something<br />
            <TogetherWord />
          </h2>
          <p className="contact-sub">
            Open for OJT / internship opportunities — whether in design,
            frontend development, or both.
          </p>

          <div className="contact-links">
            <a href="mailto:agustinsandra.sca@gmail.com" className="contact-link">
              <span className="link-label">Email</span>
              <span className="link-value">agustinsandra.sca@gmail.com</span>
              <span className="link-arrow" aria-hidden="true">→</span>
            </a>
            <a href="tel:+63934378176" className="contact-link">
              <span className="link-label">Phone</span>
              <span className="link-value">+63 934 378 176</span>
              <span className="link-arrow" aria-hidden="true">→</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link">
              <span className="link-label">LinkedIn</span>
              <span className="link-value">Sandra Agustin</span>
              <span className="link-arrow" aria-hidden="true">→</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-link">
              <span className="link-label">GitHub</span>
              <span className="link-value">@sandraagustin</span>
              <span className="link-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT — redesigned CTA card ── */}
        <div className="contact-right reveal reveal-delay-2">
          <div className="contact-card">

            {/* Status badge */}
            <div className="card-status">
              <span className="status-dot" />
              <span>Available for OJT — 2026</span>
            </div>

            {/* Big question */}
            <p className="card-question">
              Got a project<br />in mind?
            </p>

            {/* Divider */}
            <div className="card-divider" />

            {/* Value props */}
            <ul className="card-props">
              <li>
                <span className="prop-icon">✦</span>
                UI/UX Design &amp; Prototyping
              </li>
              <li>
                <span className="prop-icon">◈</span>
                React / TypeScript Development
              </li>
              <li>
                <span className="prop-icon">◎</span>
                Figma to Code — pixel perfect
              </li>
            </ul>

            {/* CTA button */}
            <a href="mailto:agustinsandra.sca@gmail.com" className="card-cta">
              <span className="cta-label">Send me an email</span>
              <span className="cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </a>

            {/* Decorative corner element */}
            <div className="card-corner" aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-name">Sandra Agustin</span>
          <span className="footer-copy">© 2026 · Caloocan City, PH</span>
          <span className="footer-built">Built with React + Vite ✦</span>
        </div>
      </footer>
    </section>
  );
}
