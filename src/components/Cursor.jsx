import { useEffect, useRef } from 'react';

/* Arrow SVG encoded as CSS cursor URL — always on top, no z-index issues.
   White stroke outline, brown (#9C775C) fill. Hotspot at tip: 4 4 */
const CURSOR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='36' viewBox='0 0 32 36'><path d='M4 2 L4 30 L11 23 L16.5 34 L20 32 L14.5 21 L24 21 Z' fill='white' stroke='white' stroke-width='3.5' stroke-linejoin='round' stroke-linecap='round'/><path d='M4 2 L4 30 L11 23 L16.5 34 L20 32 L14.5 21 L24 21 Z' fill='%239C775C' stroke='%239C775C' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/></svg>`;

const CURSOR_HOVER_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='36' height='40' viewBox='0 0 36 40'><path d='M4 2 L4 34 L12 26 L18 38 L22 36 L16 24 L27 24 Z' fill='white' stroke='white' stroke-width='3.5' stroke-linejoin='round' stroke-linecap='round'/><path d='M4 2 L4 34 L12 26 L18 38 L22 36 L16 24 L27 24 Z' fill='%236B4F38' stroke='%236B4F38' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'/></svg>`;

const toURL = (svg) => `url("data:image/svg+xml,${svg}") 4 4, auto`;

export default function Cursor() {
  const isHovering = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const normal = toURL(CURSOR_SVG);
    const hover  = toURL(CURSOR_HOVER_SVG);

    /* apply default cursor */
    document.documentElement.style.cursor = normal;

    const onEnter = (e) => {
      if (!isHovering.current) {
        isHovering.current = true;
        e.currentTarget.style.cursor = hover;
      }
    };
    const onLeave = (e) => {
      isHovering.current = false;
      e.currentTarget.style.cursor = '';
      document.documentElement.style.cursor = normal;
    };

    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      document.documentElement.style.cursor = '';
      obs.disconnect();
    };
  }, []);

  /* No DOM element needed — cursor is handled purely via CSS */
  return null;
}
