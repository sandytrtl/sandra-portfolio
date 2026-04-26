import { useEffect, useRef, useState, useCallback } from 'react';
import './Contact.css';

/* TOGETHER split animation */
function TogetherWord() {
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
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

/* pill definitions */
const PILLS = [
  {
    id: 'letstalks',
    label: "Let's talk",
    type: 'pill',
    bg: '#e8c9b8',
    color: '#3a2010',
    rotate: -12,
    action: 'gmail',
  },
  {
    id: 'github',
    label: null,
    type: 'icon',
    bg: '#2d2d2d',
    color: '#fff',
    icon: 'github',
    rotate: 0,
    action: 'github',
  },
  {
    id: 'sendmsg',
    label: 'Send a message',
    type: 'pill',
    bg: '#f2ddd5',
    color: '#3a2010',
    rotate: 0,
    action: 'gmail',
  },
  {
    id: 'call',
    label: null,
    type: 'icon',
    bg: '#9C775C',
    color: '#fff',
    icon: 'call',
    rotate: 0,
    action: 'call',
  },
  {
    id: 'sayhiii',
    label: 'Say hiii',
    type: 'pill',
    bg: '#c8dce8',
    color: '#102030',
    rotate: 0,
    action: 'gmail',
  },
  {
    id: 'reachout',
    label: 'Reach out',
    type: 'pill',
    bg: '#c8c0cc',
    color: '#201030',
    rotate: 14,
    action: 'gmail',
  },
  {
    id: 'linkedin',
    label: null,
    type: 'icon',
    bg: '#0A66C2',
    color: '#fff',
    icon: 'linkedin',
    rotate: 0,
    action: 'linkedin',
  },
];

function GitHubSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}
function LinkedInSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function CallSVG() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.19 2 2 0 012.11.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.26-.5a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

/* physics pill draggable */
function PhysicsPill({ pill, areaRef, onCopyNumber, fallen }) {
  const ref     = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const vel     = useRef({ x: 0, y: 0 });
  const drag    = useRef(null);
  const rafRef  = useRef(null);
  const settled = useRef(false);

  /* initial fall — triggered when fallen=true */
  useEffect(() => {
    if (!fallen || !ref.current || !areaRef.current) return;
    const area = areaRef.current.getBoundingClientRect();
    const el   = ref.current;
    const elW  = el.offsetWidth;
    const elH  = el.offsetHeight;

    /* random start X across the area width */
    const startX = Math.random() * Math.max(1, area.width  - elW);
    const startY = -(elH + 20);
    pos.current  = { x: startX, y: startY };
    vel.current  = { x: (Math.random() - 0.5) * 2, y: 0 };
    el.style.left = startX + 'px';
    el.style.top  = startY + 'px';
    el.style.opacity = '1';

    const gravity  = 0.55;
    const bounce   = 0.35;
    const friction = 0.88;
    const floorY   = area.height - elH - 8;

    const fall = () => {
      if (settled.current) return;
      vel.current.y += gravity;
      vel.current.x *= friction;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      /* floor bounce */
      if (pos.current.y >= floorY) {
        pos.current.y = floorY;
        vel.current.y *= -bounce;
        vel.current.x *= friction;
        if (Math.abs(vel.current.y) < 1.2) {
          vel.current.y = 0;
          settled.current = true;
        }
      }
      /* wall bounce */
      if (pos.current.x < 0) { pos.current.x = 0; vel.current.x *= -0.5; }
      if (pos.current.x > area.width - elW) { pos.current.x = area.width - elW; vel.current.x *= -0.5; }

      el.style.left = pos.current.x + 'px';
      el.style.top  = pos.current.y + 'px';

      if (!settled.current) rafRef.current = requestAnimationFrame(fall);
    };
    rafRef.current = requestAnimationFrame(fall);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fallen, areaRef]);

  /* drag after settled */
  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    cancelAnimationFrame(rafRef.current);
    settled.current = true;
    const el   = ref.current;
    const rect = el.getBoundingClientRect();
    const areaRect = areaRef.current.getBoundingClientRect();
    drag.current = {
      startX: (e.clientX ?? e.touches?.[0]?.clientX) - rect.left,
      startY: (e.clientY ?? e.touches?.[0]?.clientY) - rect.top,
      lastX: e.clientX ?? e.touches?.[0]?.clientX,
      lastY: e.clientY ?? e.touches?.[0]?.clientY,
      areaRect,
    };
    vel.current = { x: 0, y: 0 };
    el.style.transition = 'none';
    el.style.zIndex = '10';
  }, [areaRef]);

  useEffect(() => {
    const onMove = (e) => {
      if (!drag.current || !ref.current) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX;
      const cy = e.clientY ?? e.touches?.[0]?.clientY;
      vel.current.x = cx - drag.current.lastX;
      vel.current.y = cy - drag.current.lastY;
      drag.current.lastX = cx;
      drag.current.lastY = cy;

      const { areaRect } = drag.current;
      const elW = ref.current.offsetWidth;
      const elH = ref.current.offsetHeight;
      let nx = cx - areaRect.left - drag.current.startX;
      let ny = cy - areaRect.top  - drag.current.startY;
      nx = Math.max(0, Math.min(nx, areaRect.width  - elW));
      ny = Math.max(0, Math.min(ny, areaRect.height - elH));
      pos.current = { x: nx, y: ny };
      ref.current.style.left = nx + 'px';
      ref.current.style.top  = ny + 'px';
    };

    const onUp = () => {
      if (!drag.current || !ref.current) return;
      /* toss with release velocity */
      const elW  = ref.current.offsetWidth;
      const elH  = ref.current.offsetHeight;
      const area = areaRef.current.getBoundingClientRect();
      const bounce   = 0.35;
      const friction = 0.90;
      const gravity  = 0.4;
      const floorY   = area.height - elH - 8;
      settled.current = false;
      drag.current = null;
      ref.current.style.zIndex = '';

      const toss = () => {
        if (settled.current) return;
        vel.current.y += gravity;
        vel.current.x *= friction;
        pos.current.x += vel.current.x;
        pos.current.y += vel.current.y;

        if (pos.current.y >= floorY) {
          pos.current.y = floorY;
          vel.current.y *= -bounce;
          vel.current.x *= friction;
          if (Math.abs(vel.current.y) < 1) { vel.current.y = 0; settled.current = true; }
        }
        if (pos.current.x < 0) { pos.current.x = 0; vel.current.x *= -0.5; }
        if (pos.current.x > area.width - elW) { pos.current.x = area.width - elW; vel.current.x *= -0.5; }

        if (ref.current) {
          ref.current.style.left = pos.current.x + 'px';
          ref.current.style.top  = pos.current.y + 'px';
        }
        if (!settled.current) rafRef.current = requestAnimationFrame(toss);
      };
      rafRef.current = requestAnimationFrame(toss);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend',  onUp);
    };
  }, [areaRef]);

  const handleClick = useCallback(() => {
    if (drag.current) return;
    if (pill.action === 'call')     onCopyNumber();
    if (pill.action === 'github')   window.open('https://github.com/sandraagustin', '_blank');
    if (pill.action === 'linkedin') window.open('https://www.linkedin.com/in/sandraagustin', '_blank');
    if (pill.action === 'gmail')    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=agustin.sandra.sca@gmail.com&su=Project%20Inquiry', '_blank');
  }, [pill, onCopyNumber]);

  const isIcon  = pill.type === 'icon';
  const classes = `phys-pill${isIcon ? ' phys-pill--icon' : ''}`;

  return (
    <div
      ref={ref}
      className={classes}
      style={{
        background: pill.bg,
        color: pill.color,
        transform: `rotate(${pill.rotate}deg)`,
        opacity: 0,
        position: 'absolute',
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={pill.label || pill.icon}
    >
      {pill.icon === 'github'   && <GitHubSVG />}
      {pill.icon === 'linkedin' && <LinkedInSVG />}
      {pill.icon === 'call'     && <CallSVG />}
      {pill.label && <span>{pill.label}</span>}
    </div>
  );
}

/* snackbar */
function Snackbar({ show }) {
  return (
    <div className={`snackbar${show ? ' snackbar--show' : ''}`}>
      📋 Number copied to clipboard!
    </div>
  );
}

/* vertical light lines animated bg */
function LinesBackground() {
  return (
    <div className="contact-lines" aria-hidden="true">
      <div className="contact-line" />
      <div className="contact-line" />
      <div className="contact-line" />
    </div>
  );
}

export default function Contact() {
  const areaRef  = useRef(null);
  const [fallen, setFallen]   = useState(false);
  const [snack,  setSnack]    = useState(false);

  /* trigger fall when section enters viewport */
  useEffect(() => {
    const el = areaRef.current?.closest('section');
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setFallen(true); obs.disconnect(); }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const copyNumber = useCallback(() => {
    navigator.clipboard.writeText('+63934378176').catch(() => {});
    setSnack(true);
    setTimeout(() => setSnack(false), 2800);
  }, []);

  return (
    <section id="contact" className="contact">
      <LinesBackground />

      <div className="contact-top reveal">
        <p className="section-label">Get in Touch</p>
        <h2 className="contact-heading">
          Let's build something<br />
          <TogetherWord />
        </h2>
        <p className="contact-sub">
          whether in design, frontend development, or both.
        </p>
      </div>

      {/* physics playground */}
      <div className="contact-arena" ref={areaRef}>
        {PILLS.map((pill, i) => (
          <PhysicsPill
            key={pill.id}
            pill={pill}
            areaRef={areaRef}
            onCopyNumber={copyNumber}
            fallen={fallen}
            delay={i * 120}
          />
        ))}
      </div>

      <Snackbar show={snack} />

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
