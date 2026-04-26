import { useEffect, useRef, useState, useCallback } from 'react';
import './Contact.css';

/* ─────────────────────────────────────────────
   TOGETHER split animation
───────────────────────────────────────────── */
function TogetherWord() {
  const ref   = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) { fired.current = true; el.classList.add('animate'); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <span className="together-wrap" ref={ref} aria-label="together.">
      <span className="toge">TOGE</span><span className="ther">THER.</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   PILL CONFIG — edit labels, colors, actions here
───────────────────────────────────────────── */
const PILLS = [
  { id: 'letstalk',  label: "Let's talk",    type: 'text', bg: '#FFC69D', color: '#3a1800', action: 'gmail',    rotate: -10 },
  { id: 'sendmsg',   label: 'Send a message', type: 'text', bg: '#FFCFCF', color: '#3a0000', action: 'gmail',    rotate:   3 },
  { id: 'sayhiii',   label: 'Say hiii',       type: 'text', bg: '#BAAEAE', color: '#201010', action: 'gmail',    rotate:   6 },
  { id: 'reachout',  label: 'Reach out',      type: 'text', bg: '#C9DBE4', color: '#102030', action: 'gmail',    rotate:  -6 },
  { id: 'github',    label: null,             type: 'icon', bg: '#000000', color: '#ffffff', action: 'github',   rotate:   0 },
  { id: 'gmail',     label: null,             type: 'icon', bg: '#600000', color: '#ffffff', action: 'gmail',    rotate:   0 },
  { id: 'call',      label: null,             type: 'icon', bg: '#A14E1B', color: '#ffffff', action: 'call',     rotate:   0 },
  { id: 'linkedin',  label: null,             type: 'icon', bg: '#004568', color: '#ffffff', action: 'linkedin', rotate:   0 },
];

/* ─────────────────────────────────────────────
   PILL SIZE CONSTANTS ← adjust these to resize
───────────────────────────────────────────── */
const PILL_HEIGHT   = 90;        // text pill height (px)
const ICON_SIZE     = 100;       // icon circle diameter (px)
const FONT_SIZE     = '1.6rem';  // text label font size
const CHAR_WIDTH    = 19;        // px per character for auto-width
const MIN_WIDTH     = 200;       // minimum text pill width (px)
const PADDING_X     = 52;        // horizontal padding inside text pills (px)
const ICON_SVG_SIZE = 38;        // icon SVG width/height (px)

function getPillSize(pill) {
  if (pill.type === 'icon') return { w: ICON_SIZE, h: ICON_SIZE, r: ICON_SIZE / 2 };
  const w = Math.max(MIN_WIDTH, pill.label.length * CHAR_WIDTH + PADDING_X * 2);
  return { w, h: PILL_HEIGHT, r: PILL_HEIGHT / 2 };
}

/* ─────────────────────────────────────────────
   ICON HTML (sized by ICON_SVG_SIZE above)
───────────────────────────────────────────── */
const S = ICON_SVG_SIZE;
const ICON_HTML = {
  github:   `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  gmail:    `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  call:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="${S}" height="${S}"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.19 2 2 0 012.11.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.26-.5a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
};

/* ─────────────────────────────────────────────
   UTILS
───────────────────────────────────────────── */
function Snackbar({ show }) {
  return <div className={`snackbar${show ? ' snackbar--show' : ''}`}>📋 Number copied to clipboard!</div>;
}
function LinesBackground() {
  return (
    <div className="contact-lines" aria-hidden="true">
      <div className="contact-line" /><div className="contact-line" /><div className="contact-line" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHYSICS ARENA

   Root cause of duplicates: React Strict Mode
   double-invokes useEffect in dev. The fix is a
   module-level `initialized` flag so initPhysics
   only ever runs ONCE per mount, and the cleanup
   returned from useEffect destroys everything so
   the next mount starts fresh.

   We NEVER call Render.run() — Matter's canvas is
   never attached, so there are zero visual doubles.
   Only our 8 DOM divs exist.
───────────────────────────────────────────── */

// module-level flag — survives Strict Mode's fake unmount/remount
let _physicsBooted = false;

function PhysicsArena({ onCopyNumber }) {
  const areaRef  = useRef(null);
  const stateRef = useRef(null); // holds { engine, divs, raf, removeListeners }

  useEffect(() => {
    // Guard: if already booted (Strict Mode second call), skip
    if (_physicsBooted) return;
    _physicsBooted = true;

    const boot = () => {
      const { Engine, Bodies, Body, World } = window.Matter;
      const area = areaRef.current;
      if (!area) return;

      /* clear any leftover divs from a previous mount */
      area.querySelectorAll('.phys-dom-pill').forEach(el => el.remove());

      const W = area.clientWidth;
      const H = area.clientHeight;

      const engine = Engine.create({ gravity: { y: 1.4 } });

      /* walls */
      const wall = (x, y, w, h) =>
        Bodies.rectangle(x, y, w, h, { isStatic: true, restitution: 0.45, friction: 0.5 });
      World.add(engine.world, [
        wall(W / 2,  H + 25,  W * 3, 50),
        wall(-25,    H / 2,   50, H * 3),
        wall(W + 25, H / 2,   50, H * 3),
      ]);

      /* pill bodies + DOM divs */
      const mBodies = [];
      const divs    = [];
      let zTop = 100;

      PILLS.forEach((pill, i) => {
        const { w, h, r } = getPillSize(pill);
        const startX = (i + 0.5) * (W / PILLS.length);
        const startY = -(h + 30) - i * (h + 15);

        const body = Bodies.rectangle(startX, startY, w, h, {
          restitution: 0.5,
          friction:    0.3,
          frictionAir: 0.013,
          chamfer:     { radius: r },
          label:       String(i),
        });
        Body.setAngle(body, (pill.rotate * Math.PI) / 180);
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 });
        mBodies.push(body);

        const div = document.createElement('div');
        div.className = 'phys-dom-pill'; // marker class for cleanup
        div.style.cssText = `
          position: absolute;
          left: 0; top: 0;
          width: ${w}px;
          height: ${h}px;
          border-radius: ${r}px;
          background: ${pill.bg};
          color: ${pill.color};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: ${FONT_SIZE};
          letter-spacing: 0.01em;
          white-space: nowrap;
          box-shadow:
            0 10px 30px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.32),
            inset 0 -2px 0 rgba(0,0,0,0.14);
          cursor: grab;
          user-select: none;
          touch-action: none;
          transform-origin: center center;
          will-change: transform;
          z-index: ${zTop + i};
        `;
        if (ICON_HTML[pill.id]) div.innerHTML = ICON_HTML[pill.id];
        else                     div.textContent = pill.label;
        area.appendChild(div);
        divs.push(div);
      });

      World.add(engine.world, mBodies);

      /* ── drag logic ── */
      let dragBody  = null;
      let dragIdx   = -1;
      let dragOff   = { x: 0, y: 0 };
      let lastPt    = { x: 0, y: 0 };
      let throwVel  = { x: 0, y: 0 };
      let isClick   = false;

      const toArea = (e) => {
        const rect = area.getBoundingClientRect();
        const src  = e.touches ? e.touches[0] : e;
        return { x: src.clientX - rect.left, y: src.clientY - rect.top };
      };

      const pillAt = (x, y) => {
        let best = -1, bestZ = -1;
        mBodies.forEach((b, i) => {
          const { min, max } = b.bounds;
          if (x >= min.x && x <= max.x && y >= min.y && y <= max.y) {
            const z = parseInt(divs[i].style.zIndex, 10);
            if (z > bestZ) { bestZ = z; best = i; }
          }
        });
        return best;
      };

      const onDown = (e) => {
        e.preventDefault();
        const pt  = toArea(e);
        const idx = pillAt(pt.x, pt.y);
        if (idx < 0) return;
        zTop += 1;
        divs[idx].style.zIndex = zTop;
        dragBody = mBodies[idx];
        dragIdx  = idx;
        dragOff  = { x: pt.x - dragBody.position.x, y: pt.y - dragBody.position.y };
        lastPt   = pt;
        throwVel = { x: 0, y: 0 };
        isClick  = true;
        Body.setStatic(dragBody, true);
        divs[idx].style.cursor = 'grabbing';
      };

      const onMove = (e) => {
        if (!dragBody) return;
        e.preventDefault();
        const pt = toArea(e);
        throwVel = { x: pt.x - lastPt.x, y: pt.y - lastPt.y };
        lastPt   = pt;
        if (Math.hypot(throwVel.x, throwVel.y) > 1.5) isClick = false;
        const nx = Math.max(0, Math.min(W, pt.x - dragOff.x));
        const ny = Math.max(0, Math.min(H, pt.y - dragOff.y));
        Body.setPosition(dragBody, { x: nx, y: ny });
      };

      const onUp = () => {
        if (!dragBody) return;
        const wasClick = isClick;
        const idx      = dragIdx;
        Body.setStatic(dragBody, false);
        Body.setVelocity(dragBody, { x: throwVel.x * 0.85, y: throwVel.y * 0.85 });
        if (divs[idx]) divs[idx].style.cursor = 'grab';
        if (wasClick && idx >= 0) handleAction(PILLS[idx]);
        dragBody = null;
        dragIdx  = -1;
      };

      area.addEventListener('mousedown',  onDown);
      area.addEventListener('touchstart', onDown, { passive: false });
      window.addEventListener('mousemove',  onMove);
      window.addEventListener('touchmove',  onMove, { passive: false });
      window.addEventListener('mouseup',    onUp);
      window.addEventListener('touchend',   onUp);

      /* render loop */
      let raf;
      const loop = () => {
        Engine.update(engine, 1000 / 60);
        mBodies.forEach((body, i) => {
          const el = divs[i];
          if (!el) return;
          const { x, y } = body.position;
          const { w, h } = getPillSize(PILLS[i]);
          el.style.transform =
            `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${body.angle}rad)`;
        });
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      /* store everything so cleanup can destroy it */
      stateRef.current = {
        engine,
        raf,
        remove: () => {
          cancelAnimationFrame(raf);
          window.Matter?.Engine.clear(engine);
          divs.forEach(d => d?.remove());
          area.removeEventListener('mousedown',  onDown);
          area.removeEventListener('touchstart', onDown);
          window.removeEventListener('mousemove',  onMove);
          window.removeEventListener('touchmove',  onMove);
          window.removeEventListener('mouseup',    onUp);
          window.removeEventListener('touchend',   onUp);
        },
      };
    };

    /* load Matter.js once, then boot */
    if (window.Matter) {
      boot();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
      s.onload = boot;
      document.head.appendChild(s);
    }

    return () => {
      /* real unmount: destroy everything and reset flag */
      _physicsBooted = false;
      stateRef.current?.remove();
      stateRef.current = null;
    };
  }, []); // runs once per mount

  function handleAction(pill) {
    const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=agustin.sandra.sca@gmail.com&su=Project%20Inquiry';
    if (pill.action === 'call')     onCopyNumber();
    if (pill.action === 'github')   window.open('https://github.com/sandytrtl',                  '_blank');
    if (pill.action === 'linkedin') window.open('https://www.linkedin.com/in/sandra-agustin',     '_blank');
    if (pill.action === 'gmail')    window.open(GMAIL, '_blank');
  }

  return (
    <div
      className="contact-arena"
      ref={areaRef}
      style={{ position: 'relative', overflow: 'hidden' }}
    />
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function Contact() {
  const [fallen, setFallen] = useState(false);
  const [snack,  setSnack]  = useState(false);

  useEffect(() => {
    const el = document.getElementById('contact');
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setFallen(true); obs.disconnect(); }
    }, { threshold: 0.2 });
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
        <p className="contact-sub">whether in design, frontend development, or both.</p>
      </div>

      {fallen && <PhysicsArena onCopyNumber={copyNumber} />}

      <Snackbar show={snack} />

      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-name">Sandra Agustin</span>
          <span className="footer-copy">© 2026</span>
          <span className="footer-built">Caloocan City, PH</span>
        </div>
      </footer>
    </section>
  );
}