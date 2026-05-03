import { useEffect, useRef, useState, useCallback } from 'react';
import './Contact.css';

/* TOGETHER SPLIT ANIMATION */
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

/* PILL CONFIG */
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

/* PILL SIZE CONSTANTS */
const PILL_HEIGHT   = 90;
const ICON_SIZE     = 100;
const FONT_SIZE     = '1.6rem';
const CHAR_WIDTH    = 19;
const MIN_WIDTH     = 200;
const PADDING_X     = 52;
const ICON_SVG_SIZE = 38;

const MAX_SPEED = 22;

function getPillSize(pill) {
  if (pill.type === 'icon') return { w: ICON_SIZE, h: ICON_SIZE, r: ICON_SIZE / 2 };
  const w = Math.max(MIN_WIDTH, pill.label.length * CHAR_WIDTH + PADDING_X * 2);
  return { w, h: PILL_HEIGHT, r: PILL_HEIGHT / 2 };
}

/* ICON HTML */
const S = ICON_SVG_SIZE;
const ICON_HTML = {
  github:   `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  gmail:    `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" width="${S}" height="${S}"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  call:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="${S}" height="${S}"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.19 2 2 0 012.11.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.26-.5a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>`,
};

/* SNACKBAR + BACKGROUND */
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

/* PHYSICS ARENA */
let _physicsBooted = false;

function PhysicsArena({ onCopyNumber }) {
  const areaRef  = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    if (_physicsBooted) return;
    _physicsBooted = true;

    const boot = () => {
      const { Engine, Bodies, Body, World } = window.Matter;
      const area = areaRef.current;
      if (!area) return;

      area.querySelectorAll('.phys-dom-pill').forEach(el => el.remove());

      const W = area.clientWidth;
      const H = area.clientHeight;

      const engine = Engine.create({
        gravity:            { y: 1.1 },
        positionIterations: 10,
        velocityIterations: 8,
      });

      const THICK = 200;
      const wall  = (x, y, w, h) =>
        Bodies.rectangle(x, y, w, h, {
          isStatic:    true,
          restitution: 0.85,
          friction:    0.05,
          label:       'wall',
        });

      World.add(engine.world, [
        wall(W / 2,        H + THICK / 2, W + THICK * 2, THICK),
        wall(W / 2,        -THICK / 2,    W + THICK * 2, THICK),
        wall(-THICK / 2,   H / 2,         THICK,         H + THICK * 2),
        wall(W + THICK / 2, H / 2,        THICK,         H + THICK * 2),
      ]);

      const mBodies = [];
      const divs    = [];
      let zTop = 100;

      PILLS.forEach((pill, i) => {
        const { w, h, r } = getPillSize(pill);
        // All pills start just above the arena, spread across the width
        const startX = (i + 0.5) * (W / PILLS.length);
        const startY = -h - 20; // just above the top edge

        const body = Bodies.rectangle(startX, startY, w, h, {
          restitution:    0.72,
          friction:       0.25,
          frictionAir:    0.008,
          frictionStatic: 0.3,
          chamfer:        { radius: r },
          label:          String(i),
          isStatic:       true, // start frozen — released by stagger timeout
        });
        Body.setAngle(body, (pill.rotate * Math.PI) / 180);
        mBodies.push(body);

        const div = document.createElement('div');
        div.className = 'phys-dom-pill';
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

      // Stagger-release each pill with a delay so they visibly drop one by one
      const releaseTimers = mBodies.map((body, i) =>
        setTimeout(() => {
          Body.setStatic(body, false);
          Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 1 });
        }, i * 120)
      );

      let dragBody = null;
      let dragIdx  = -1;
      let dragOff  = { x: 0, y: 0 };
      let lastPt   = { x: 0, y: 0 };
      let throwVel = { x: 0, y: 0 };
      let isClick  = false;

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

      const clampSpeed = (vx, vy) => {
        const speed = Math.hypot(vx, vy);
        if (speed <= MAX_SPEED) return { x: vx, y: vy };
        const scale = MAX_SPEED / speed;
        return { x: vx * scale, y: vy * scale };
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
        const { w, h } = getPillSize(PILLS[dragIdx]);
        const nx = Math.max(w / 2, Math.min(W - w / 2, pt.x - dragOff.x + w / 2));
        const ny = Math.max(h / 2, Math.min(H - h / 2, pt.y - dragOff.y + h / 2));
        Body.setPosition(dragBody, { x: nx, y: ny });
      };

      const onUp = () => {
        if (!dragBody) return;
        const wasClick = isClick;
        const idx      = dragIdx;
        Body.setStatic(dragBody, false);
        const clamped = clampSpeed(throwVel.x * 0.9, throwVel.y * 0.9);
        Body.setVelocity(dragBody, clamped);
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

      /* render + safety-clamp loop */
      let raf;
      const loop = () => {
        Engine.update(engine, 1000 / 60);

        mBodies.forEach((body, i) => {
          const el = divs[i];
          if (!el) return;

          const { w, h } = getPillSize(PILLS[i]);
          const halfW = w / 2, halfH = h / 2;
          let { x, y } = body.position;
          let { x: vx, y: vy } = body.velocity;
          let clamped = false;

          if (x - halfW < 0)      { x = halfW;     vx = Math.abs(vx) * 0.7;  clamped = true; }
          if (x + halfW > W)      { x = W - halfW; vx = -Math.abs(vx) * 0.7; clamped = true; }
          if (y - halfH < 0)      { y = halfH;     vy = Math.abs(vy) * 0.7;  clamped = true; }
          if (y + halfH > H)      { y = H - halfH; vy = -Math.abs(vy) * 0.7; clamped = true; }

          if (clamped) {
            Body.setPosition(body, { x, y });
            Body.setVelocity(body, { x: vx, y: vy });
          }

          /* speed cap */
          const speed = Math.hypot(body.velocity.x, body.velocity.y);
          if (speed > MAX_SPEED) {
            const s = MAX_SPEED / speed;
            Body.setVelocity(body, { x: body.velocity.x * s, y: body.velocity.y * s });
          }

          /* rest damping — only zeroes out true micro-jitter, leaves live bounces alone */
          if (body !== dragBody) {
            const spd = Math.hypot(body.velocity.x, body.velocity.y);
            if (spd < 0.08) {
              Body.setVelocity(body, { x: 0, y: 0 });
              Body.setAngularVelocity(body, 0);
            } else if (spd < 0.35) {
              Body.setVelocity(body, {
                x: body.velocity.x * 0.82,
                y: body.velocity.y * 0.82,
              });
              Body.setAngularVelocity(body, body.angularVelocity * 0.72);
            }
          }

          el.style.transform =
            `translate(${x - halfW}px, ${y - halfH}px) rotate(${body.angle}rad)`;
        });

        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      stateRef.current = {
        remove: () => {
          cancelAnimationFrame(raf);
          releaseTimers.forEach(clearTimeout);
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

    if (window.Matter) {
      boot();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js';
      s.onload = boot;
      document.head.appendChild(s);
    }

    return () => {
      _physicsBooted = false;
      stateRef.current?.remove();
      stateRef.current = null;
    };
  }, []);

  function handleAction(pill) {
    const GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=agustin.sandra.sca@gmail.com&su=Project%20Inquiry';
    if (pill.action === 'call')     onCopyNumber();
    if (pill.action === 'github')   window.open('https://github.com/sandraagustin',          '_blank');
    if (pill.action === 'linkedin') window.open('https://www.linkedin.com/in/sandraagustin', '_blank');
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

/* MAIN EXPORT */
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