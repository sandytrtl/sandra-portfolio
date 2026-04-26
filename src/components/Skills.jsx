/* Skills.jsx */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Skills.css';

const ALL_SKILLS = [
  { name: 'React',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',             color: '#61DAFB' },
  { name: 'TypeScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',  color: '#3178C6' },
  { name: 'JavaScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',  color: '#F7DF1E' },
  { name: 'HTML',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',             color: '#E34F26' },
  { name: 'CSS',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',               color: '#1572B6' },
  { name: 'Figma',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',             color: '#F24E1E' },
  { name: 'Node.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',           color: '#339933' },
  { name: 'Ionic',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',             color: '#3880FF' },
  { name: 'Git',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                 color: '#F05032' },
  { name: 'MySQL',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',             color: '#4479A1' },
  { name: 'PostgreSQL',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',  color: '#336791' },
  { name: 'GitHub',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',          color: '#6e5494' },
  { name: 'Vite',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', color: '#646CFF' },
  { name: 'UI Design',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',  color: '#9C775C' },
  { name: 'UX Research', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',  color: '#C4A882' },
];

const COLS  = 5;
const ROWS  = 3;
const CARD_W = 0.9;
const CARD_H = 0.9;
const CARD_D = 0.07;
const GAP    = 0.18;

/* ─────────────────────────────────────────────────────────────
   ThreeTable
   hoveredSkill: string | null  (passed from parent via stateRef)
───────────────────────────────────────────────────────────── */
function ThreeTable({ isDark, hoveredSkill }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ hoveredSkill: null, cardMeshes: {} });

  // keep hoveredSkill live without re-triggering the heavy effect
  useEffect(() => {
    stateRef.current.hoveredSkill = hoveredSkill;
  }, [hoveredSkill]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    // Nice angled isometric-style view — NOT top-down
    camera.position.set(0, 6.5, 8.5);
    camera.lookAt(0, 0, 0);

    // ── Lights ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.55 : 0.75));
    const dirLight = new THREE.DirectionalLight(0xfff0e0, isDark ? 1.0 : 1.4);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);
    const fill = new THREE.DirectionalLight(0x9C775C, 0.3);
    fill.position.set(-5, 3, -5);
    scene.add(fill);

    // ── Colour tokens ─────────────────────────────────────────
    const topColor = isDark ? 0x4a3018 : 0xd4a574;
    const legColor = isDark ? 0x2a1a0a : 0xa07040;
    const cardBg   = isDark ? 0x2a1e14 : 0xfff8f0;

    // ── Table group (everything rotates together) ─────────────
    const tg = new THREE.Group();
    scene.add(tg);

    // Table top
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.22, 4),
      new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.45, metalness: 0.05 })
    );
    tableTop.position.y = 0;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tg.add(tableTop);

    // Edge trim
    const edgeTrim = new THREE.Mesh(
  new THREE.BoxGeometry(7.06, 0.06, 4.06),
  new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.3 })
);
edgeTrim.position.set(0, -0.08, 0); 
tg.add(edgeTrim);
    

    // Legs + braces
    const legGeo = new THREE.CylinderGeometry(0.1, 0.12, 2.2, 12);
    const legMat = new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.5, metalness: 0.08 });
    [[-3.1, -1.2, -1.6], [3.1, -1.2, -1.6], [-3.1, -1.2, 1.6], [3.1, -1.2, 1.6]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      tg.add(leg);
    });
    const braceGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.2, 8);
    [-1.6, 1.6].forEach(z => {
      const b = new THREE.Mesh(braceGeo, legMat);
      b.rotation.z = Math.PI / 2;
      b.position.set(0, -1.8, z);
      tg.add(b);
    });

    // Floor shadow catcher
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: isDark ? 0.18 : 0.10 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.35;
    floor.receiveShadow = true;
    tg.add(floor);

    // ── Cards ─────────────────────────────────────────────────
    const cardGroup = new THREE.Group();
    tg.add(cardGroup);

    const startX = -(COLS - 1) * (CARD_W + GAP) / 2;
    const startZ = -(ROWS - 1) * (CARD_H + GAP) / 2;

    const loader = new THREE.TextureLoader();
    const cardMeshes = {}; // skill name → { card, liftables, baseY }

    ALL_SKILLS.slice(0, COLS * ROWS).forEach((skill, i) => {
      const col  = i % COLS;
      const row  = Math.floor(i / COLS);
      const cx   = startX + col * (CARD_W + GAP);
      const cz   = startZ + row * (CARD_H + GAP);
      const baseY = 0.145;
      const surfY = baseY + CARD_D / 2 + 0.003;

      // Card body
      const card = new THREE.Mesh(
        new THREE.BoxGeometry(CARD_W, CARD_D, CARD_H),
        new THREE.MeshStandardMaterial({ color: cardBg, roughness: 0.55 })
      );
      card.position.set(cx, baseY, cz);
      card.castShadow = true;
      cardGroup.add(card);

      // Tinted face plane
      const faceColor = new THREE.Color(skill.color || '#9C775C');
      faceColor.multiplyScalar(0.22);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(CARD_W - 0.06, CARD_H - 0.06),
        new THREE.MeshStandardMaterial({ color: faceColor, roughness: 0.6 })
      );
      face.rotation.x = -Math.PI / 2;
      face.position.set(cx, surfY - 0.002, cz);
      cardGroup.add(face);

      // liftables: card + all planes on top of it
      const liftables = [card, face];

      if (skill.logo) {
        loader.load(
          skill.logo,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            const icon = new THREE.Mesh(
              new THREE.PlaneGeometry(0.5, 0.5),
              new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.05 })
            );
            icon.rotation.x = -Math.PI / 2;
            icon.position.set(cx, surfY, cz);
            cardGroup.add(icon);
            liftables.push(icon);
            // store offset from card so we can lift relative
            icon.userData.offsetY = surfY - baseY;
            face.userData.offsetY = surfY - 0.002 - baseY;
          },
          undefined,
          () => { /* ignore load errors */ }
        );
        face.userData.offsetY = surfY - 0.002 - baseY;
      } else {
        // colour dot fallback
        const dot = new THREE.Mesh(
          new THREE.PlaneGeometry(0.24, 0.24),
          new THREE.MeshStandardMaterial({ color: new THREE.Color(skill.color), roughness: 0.4 })
        );
        dot.rotation.x = -Math.PI / 2;
        dot.position.set(cx, surfY, cz);
        cardGroup.add(dot);
        liftables.push(dot);
        dot.userData.offsetY = surfY - baseY;
        face.userData.offsetY = surfY - 0.002 - baseY;
      }

      cardMeshes[skill.name] = { card, liftables, baseY, cx, cz };
    });

    stateRef.current.cardMeshes = cardMeshes;

    // ── Drag to rotate ─────────────────────────────────────────
    let isDragging = false;
    let prevX = 0, prevY = 0;
    // Initial rotation: nice angled view (not flat)
    let rotX = 0.22, rotY = 0.0;
    let velX = 0,  velY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      prevY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      velX = 0; velY = 0;
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const cx2 = e.clientX ?? e.touches?.[0]?.clientX ?? prevX;
      const cy2 = e.clientY ?? e.touches?.[0]?.clientY ?? prevY;
      velY = (cx2 - prevX) * 0.006;
      velX = (cy2 - prevY) * 0.003;
      rotY += velY;
      rotX = Math.max(0.05, Math.min(0.55, rotX + velX));
      prevX = cx2; prevY = cy2;
    };
    const onPointerUp = () => { isDragging = false; };

    mount.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    mount.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ── Animation loop ─────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();
    const _v3   = new THREE.Vector3(1, 1, 1); // reused for lerp target

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Auto-rotate slowly when idle
      if (!isDragging) {
        velY *= 0.92;
        rotY += velY + 0.0015;
      }
      tg.rotation.y = rotX; // intentional: rotX controls tilt, rotY spins
      tg.rotation.x = rotX;
      tg.rotation.y = rotY;

      // Hover-lift + pulsing scale
      const active = stateRef.current.hoveredSkill;
      const meshes = stateRef.current.cardMeshes || {};

      Object.entries(meshes).forEach(([name, data]) => {
        if (!data) return;
        const { card, liftables, baseY } = data;

        if (name === active) {
          // float up + pulse inspired by CSS keyframe animation
          const lift  = 0.42 + Math.sin(t * 6.5) * 0.05;
          const pulse = 1.0  + Math.sin(t * 6.5) * 0.045;

          card.position.y = baseY + lift;
          card.scale.setScalar(pulse);

          liftables.forEach(m => {
            if (m === card) return;
            const off = m.userData.offsetY ?? (CARD_D / 2 + 0.003);
            m.position.y = baseY + lift + off;
            if (m.scale) m.scale.setScalar(pulse);
          });
        } else {
          // smooth return
          card.position.y += (baseY - card.position.y) * 0.14;
          card.scale.lerp(_v3, 0.14);

          liftables.forEach(m => {
            if (m === card) return;
            const off   = m.userData.offsetY ?? (CARD_D / 2 + 0.003);
            const restY = baseY + off;
            m.position.y += (restY - m.position.y) * 0.14;
            if (m.scale) m.scale.lerp(_v3, 0.14);
          });
        }
        if (name === active && data.card) { // Ensure card exists
    const lift = 0.42 + Math.sin(t * 6.5) * 0.05;
    const pulse = 1.0 + Math.sin(t * 6.5) * 0.045;

    data.card.position.y = data.baseY + lift;
    data.card.scale.setScalar(pulse);

    data.liftables.forEach(m => {
        if (!m || m === data.card) return; // Safety check
        const off = m.userData.offsetY ?? 0.03;
        m.position.y = data.baseY + lift + off;
        m.scale.setScalar(pulse);
    });
}
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [isDark]); // only rebuild on theme change

  return <div ref={mountRef} className="three-canvas" />;
}

/* ─────────────────────────────────────────────────────────────
   Skills section — manages hoveredSkill state
───────────────────────────────────────────────────────────── */
export default function Skills() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="skills-inner">
        <div className="skills-header reveal">
          <p className="section-label">Capabilities</p>
          <h2 className="skills-heading">
            What I bring<br />
            <span className="accent">to the table</span>
          </h2>
          <p className="skills-hint">
            <span className="hint-icon">⟳</span> Drag to rotate · Hover a skill to lift its card
          </p>
        </div>

        <div className="table-scene reveal reveal-delay-2">
          <ThreeTable isDark={isDark} hoveredSkill={hoveredSkill} />
        </div>

        <div className="skills-legend reveal reveal-delay-3">
          {ALL_SKILLS.map((s) => (
            <span
              key={s.name}
              className={`legend-pill${hoveredSkill === s.name ? ' legend-pill--active' : ''}`}
              onMouseEnter={() => setHoveredSkill(s.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {s.logo
                ? <img src={s.logo} alt={s.name} className="legend-logo" />
                : <span className="legend-icon">{s.icon}</span>
              }
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}