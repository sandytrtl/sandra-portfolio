/* Skills.jsx */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './Skills.css';

const UIUX_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0%' stop-color='#FF6B6B'/>
    <stop offset='50%' stop-color='#A855F7'/>
    <stop offset='100%' stop-color='#3B82F6'/>
  </linearGradient></defs>
  <rect width='64' height='64' rx='14' fill='url(#g1)'/>
  <rect x='9' y='9' width='21' height='15' rx='3' fill='none' stroke='#fff' stroke-width='2.5'/>
  <rect x='34' y='9' width='21' height='15' rx='3' fill='none' stroke='#fff' stroke-width='2.5'/>
  <rect x='9' y='30' width='46' height='25' rx='3' fill='none' stroke='#fff' stroke-width='2.5'/>
  <circle cx='32' cy='42' r='4' fill='#fff'/>
  <line x1='32' y1='38' x2='32' y2='24' stroke='#fff' stroke-width='2.2' stroke-linecap='round'/>
</svg>
`)}`;

const UXRESEARCH_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id='g2' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0%' stop-color='#F59E0B'/>
    <stop offset='50%' stop-color='#EF4444'/>
    <stop offset='100%' stop-color='#EC4899'/>
  </linearGradient></defs>
  <rect width='64' height='64' rx='14' fill='url(#g2)'/>
  <circle cx='26' cy='26' r='13' fill='none' stroke='#fff' stroke-width='2.8'/>
  <line x1='35' y1='35' x2='52' y2='52' stroke='#fff' stroke-width='3.2' stroke-linecap='round'/>
  <line x1='20' y1='26' x2='32' y2='26' stroke='#fff' stroke-width='2.2' stroke-linecap='round'/>
  <line x1='26' y1='20' x2='26' y2='32' stroke='#fff' stroke-width='2.2' stroke-linecap='round'/>
</svg>
`)}`;

const ALL_SKILLS = [
  { name: 'React',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',             color: '#61DAFB', needsBg: false },
  { name: 'TypeScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',  color: '#3178C6', needsBg: false },
  { name: 'JavaScript',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',  color: '#F7DF1E', needsBg: false },
  { name: 'HTML',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',             color: '#E34F26', needsBg: false },
  { name: 'CSS',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',               color: '#1572B6', needsBg: false },
  { name: 'Figma',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',             color: '#F24E1E', needsBg: false },
  { name: 'Node.js',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',           color: '#339933', needsBg: false },
  { name: 'Ionic',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg',             color: '#3880FF', needsBg: false },
  { name: 'Git',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                 color: '#F05032', needsBg: false },
  { name: 'MySQL',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',    color: '#4479A1', needsBg: false },
  { name: 'PostgreSQL',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',  color: '#336791', needsBg: false },
  { name: 'GitHub',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg', color: '#ffffff', needsBg: false },
  { name: 'Vite',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',           color: '#646CFF', needsBg: false },
  { name: 'UI Design',   logo: UIUX_SVG,                                                                                  color: '#9C775C', needsBg: false },
  { name: 'UX Research', logo: UXRESEARCH_SVG,                                                                            color: '#C4A882', needsBg: false },
];

const COLS   = 5;
const ROWS   = 3;
const CARD_W = 0.9;
const CARD_H = 0.9;
const CARD_D = 0.07;
const GAP    = 0.18;

const FLY_IN_HEIGHT   = 12;
const FLY_IN_DURATION = 1.8;
const FLY_IN_STAGGER  = 0.09;

/* ─── CARD GEOMETRY & FACE DIRECTION ──────────────────────────────────────
   BoxGeometry(CARD_W, CARD_D, CARD_H): X=width, Y=thickness, Z=height.
   The card lies flat on the table. The face plane has rotation.x = -π/2
   so it points straight UP (+Y) in the pivot's local space.

   HOVER "card reveal" goal:
     • Face points toward the camera (+Z world)
     • Card is right-side up (+Y world = top of card)

   APPROACH — quaternion in world space, converted to table-local space:
     We build the exact world-space quaternion that achieves:
       local +Y  →  world +Z  (face toward camera)
       local +Z  →  world +Y  (top of card = up)
       local +X  →  world +X  (left/right unchanged)
     Then we express that as a LOCAL quaternion for the pivot by factoring
     out the parent (tg) world rotation. This works regardless of how the
     user has dragged/rotated the table.

   The target world quaternion Q_world satisfies:
       Q_world * (0,1,0) = (0,0,1)   ← face toward screen
       Q_world * (0,0,1) = (0,1,0)   ← card top = world up
   That is a -90° rotation around the world X axis:
       Q_world = quaternionFromAxisAngle( X, -π/2 )

   To get the pivot's LOCAL quaternion:
       Q_local = inverse(Q_parent) * Q_world
   where Q_parent = tg's current world quaternion.
─────────────────────────────────────────────────────────────────────────── */

function ThreeTable({ isDark, hoveredSkill }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ hoveredSkill: null, cardMeshes: {}, tg: null });

  useEffect(() => {
    stateRef.current.hoveredSkill = hoveredSkill;
  }, [hoveredSkill]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 6.5, 8.5);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.55 : 0.75));
    const dirLight = new THREE.DirectionalLight(0xfff0e0, isDark ? 1.0 : 1.4);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);
    const fill = new THREE.DirectionalLight(0x9C775C, 0.3);
    fill.position.set(-5, 3, -5);
    scene.add(fill);

    const topColor = isDark ? 0x4a3018 : 0xd4a574;
    const legColor = isDark ? 0x2a1a0a : 0xa07040;
    const cardBg   = isDark ? 0x2a1e14 : 0xfff8f0;

    const tg = new THREE.Group();
    scene.add(tg);
    stateRef.current.tg = tg;

    /* table */
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(7, 0.22, 4),
      new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.45, metalness: 0.05 })
    );
    tableTop.castShadow = true; tableTop.receiveShadow = true;
    tg.add(tableTop);

    const edgeTrim = new THREE.Mesh(
      new THREE.BoxGeometry(7.06, 0.06, 4.06),
      new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.3 })
    );
    edgeTrim.position.set(0, -0.08, 0);
    tg.add(edgeTrim);

    const legGeo = new THREE.CylinderGeometry(0.1, 0.12, 2.2, 12);
    const legMat = new THREE.MeshStandardMaterial({ color: legColor, roughness: 0.5, metalness: 0.08 });
    [[-3.1, -1.2, -1.6], [3.1, -1.2, -1.6], [-3.1, -1.2, 1.6], [3.1, -1.2, 1.6]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z); leg.castShadow = true;
      tg.add(leg);
    });

    const braceGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.2, 8);
    [-1.6, 1.6].forEach(z => {
      const b = new THREE.Mesh(braceGeo, legMat);
      b.rotation.z = Math.PI / 2; b.position.set(0, -1.8, z);
      tg.add(b);
    });

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: isDark ? 0.18 : 0.10 })
    );
    floor.rotation.x = -Math.PI / 2; floor.position.y = -2.35; floor.receiveShadow = true;
    tg.add(floor);

    /* cards */
    const cardGroup  = new THREE.Group();
    tg.add(cardGroup);
    const startX = -(COLS - 1) * (CARD_W + GAP) / 2;
    const startZ = -(ROWS - 1) * (CARD_H + GAP) / 2;
    const loader     = new THREE.TextureLoader();
    const cardMeshes = {};
    const flyIns     = [];

    ALL_SKILLS.slice(0, COLS * ROWS).forEach((skill, i) => {
      const col   = i % COLS;
      const row   = Math.floor(i / COLS);
      const cx    = startX + col * (CARD_W + GAP);
      const cz    = startZ + row * (CARD_H + GAP);
      const baseY = 0.145;

      const pivot = new THREE.Group();
      pivot.position.set(cx, baseY + FLY_IN_HEIGHT, cz);
      pivot.rotation.x = Math.PI; /* start face-down for fly-in */
      cardGroup.add(pivot);

      const card = new THREE.Mesh(
        new THREE.BoxGeometry(CARD_W, CARD_D, CARD_H),
        new THREE.MeshStandardMaterial({ color: cardBg, roughness: 0.55 })
      );
      card.castShadow = true;
      pivot.add(card);

      /* tinted face — lies flat, pointing up (+Y in pivot space) */
      const faceColor = new THREE.Color(skill.color || '#9C775C');
      faceColor.multiplyScalar(0.22);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(CARD_W - 0.06, CARD_H - 0.06),
        new THREE.MeshStandardMaterial({ color: faceColor, roughness: 0.6, side: THREE.DoubleSide })
      );
      face.rotation.x = -Math.PI / 2;
      face.position.y = CARD_D / 2 + 0.002;
      pivot.add(face);

      const liftables = [card, face];

      if (skill.logo) {
        loader.load(skill.logo, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          if (skill.needsBg) {
            const bgPlane = new THREE.Mesh(
              new THREE.PlaneGeometry(0.52, 0.52),
              new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            bgPlane.rotation.x = -Math.PI / 2;
            bgPlane.position.y = CARD_D / 2 + 0.0025;
            pivot.add(bgPlane);
            liftables.push(bgPlane);
          }
          const icon = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.5),
            new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide })
          );
          icon.rotation.x = -Math.PI / 2;
          icon.position.y = CARD_D / 2 + 0.005;
          pivot.add(icon);
          liftables.push(icon);
        }, undefined, () => {});
      }

      flyIns.push({ pivot, delay: i * FLY_IN_STAGGER, baseY, done: false });
      cardMeshes[skill.name] = { card, liftables, baseY, baseX: cx, baseZ: cz, pivot };
    });

    stateRef.current.cardMeshes = cardMeshes;

    /* drag */
    let isDragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0;
    let rotX = 0.22, rotY = 0.0;

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

    const easeOutBack = (t) => {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    /* per-card lerp state — all in WORLD space */
    const hoverT  = {}; // 0→1 lerp progress
    const hoverSc = {}; // current scale
    const hoverWX = {}; // current world X
    const hoverWY = {}; // current world Y
    const hoverWZ = {}; // current world Z
    // quaternion lerp
    const hoverQX = {}; const hoverQY = {}; const hoverQZ = {}; const hoverQW = {};
    Object.keys(cardMeshes).forEach(n => {
      hoverT[n] = 0; hoverSc[n] = 1;
      hoverQX[n] = 0; hoverQY[n] = 0; hoverQZ[n] = 0; hoverQW[n] = 1;
    });

    const _tgInvMat  = new THREE.Matrix4();

    /* Helper: given a world position for the pivot, compute the world quaternion
       so the face (pivot local +Y) points at the camera, card top = world up.
       Strategy: use a dummy Object3D.lookAt() — face normal is pivot +Y, which
       is the plane's forward after the plane's own -90° X rotation.
       We need pivot's +Y → camera direction.
       Object3D.lookAt targets its -Z.  The face plane's normal is pivot +Y.
       So we need to rotate the result 90° around X so +Y becomes -Z. */
    const _dummy = new THREE.Object3D();
    scene.add(_dummy);
    const getFaceCameraQuat = (wx, wy, wz, out) => {
      _dummy.position.set(wx, wy, wz);
      _dummy.lookAt(camera.position);  // -Z → camera
      // now rotate so +Y → camera instead of -Z → camera: rotate +90° around X
      const adj = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI/2);
      out.multiplyQuaternions(_dummy.quaternion, adj);
    };
    const _qTarget  = new THREE.Quaternion();
    const _qCurrent = new THREE.Quaternion();

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) { velY *= 0.92; rotY += velY + 0.0015; }
      tg.rotation.x = rotX;
      tg.rotation.y = rotY;

      /* fly-in */
      flyIns.forEach((fi) => {
        if (fi.done) return;
        const elapsed = t - fi.delay;
        if (elapsed < 0) return;
        const p = Math.min(elapsed / FLY_IN_DURATION, 1);
        const e = easeOutBack(p);
        fi.pivot.position.y = fi.baseY + FLY_IN_HEIGHT * (1 - e);
        fi.pivot.rotation.x = Math.PI * (1 - e);
        if (p >= 1) { fi.pivot.position.y = fi.baseY; fi.pivot.rotation.x = 0; fi.done = true; }
      });

      /* ── HOVER: zoom card to camera via world-space lookAt ── */
      const active = stateRef.current.hoveredSkill;

      tg.updateWorldMatrix(true, true);
      _tgInvMat.copy(tg.matrixWorld).invert();

      Object.entries(stateRef.current.cardMeshes || {}).forEach(([name, data]) => {
        if (!data) return;
        const { pivot, baseX, baseZ, baseY } = data;
        if (!pivot) return;

        if (hoverT[name]  === undefined) hoverT[name]  = 0;
        if (hoverSc[name] === undefined) hoverSc[name] = 1;

        const isActive = name === active;
        const targetT  = isActive ? 1 : 0;
        const targetSc = isActive ? 3.2 : 1;
        const speed    = 0.10;

        hoverT[name]  += (targetT  - hoverT[name])  * speed;
        hoverSc[name] += (targetSc - hoverSc[name]) * speed;

        /* --- POSITION ---
           Resting: pivot's tg-local base → world space
           Target:  fixed world point in front of / below camera */
        const restW = new THREE.Vector3(baseX ?? 0, baseY ?? 0, baseZ ?? 0)
          .applyMatrix4(tg.matrixWorld);
        // Place target on the camera's exact look direction, 5 units in front of it
        // Camera at (0,6.5,8.5) looking at (0,0,0) → look dir = normalize(0,-6.5,-8.5)
        const camDir = new THREE.Vector3(0, 0, 0).sub(camera.position).normalize();
        const targW  = camera.position.clone().addScaledVector(camDir, 7.5);

        const wx = restW.x + (targW.x - restW.x) * hoverT[name];
        const wy = restW.y + (targW.y - restW.y) * hoverT[name];
        const wz = restW.z + (targW.z - restW.z) * hoverT[name];

        // convert world pos back to tg local for pivot.position
        const lp = new THREE.Vector3(wx, wy, wz).applyMatrix4(_tgInvMat);
        pivot.position.copy(lp);

        /* --- ROTATION ---
           Resting quaternion: identity (card lies flat on table in tg space)
           Active quaternion: face (+Y local) → camera, computed via lookAt trick
           We work in WORLD space then factor out tg's world quaternion. */

        // Resting world quat = tg's world quaternion (pivot local identity = world tg)
        const _qTg = new THREE.Quaternion();
        tg.getWorldQuaternion(_qTg);

        // Active world quat: getFaceCameraQuat at the zoom target position
        getFaceCameraQuat(wx, wy, wz, _qTarget);

        // Slerp between them in world space
        _qCurrent.slerpQuaternions(_qTg, _qTarget, Math.min(hoverT[name], 1));

        // Convert to tg-local: Q_local = inv(Q_tg) * Q_world
        const _qTgInv = _qTg.clone().invert();
        pivot.quaternion.copy(_qTgInv.clone().multiply(_qCurrent));

        /* --- SCALE --- */
        pivot.scale.setScalar(hoverSc[name]);
      });

      renderer.render(scene, camera);
    };
    animate();

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
      scene.remove(_dummy);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [isDark]);

  return <div ref={mountRef} className="three-canvas" />;
}

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
            <span className="hint-icon">⟳</span> Drag to rotate · Hover a skill to reveal its card
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
              {s.logo && !s.logo.startsWith('data:')
                ? <img src={s.logo} alt={s.name} className="legend-logo" />
                : <span className="legend-icon" style={{ fontSize: '1.1rem' }}>
                    {s.name === 'UI Design' ? '🎨' : s.name === 'UX Research' ? '🔍' : '•'}
                  </span>
              }
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}