import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Don't show on touch-only devices
    if (window.matchMedia('(hover: none)').matches) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.11;
      ringY += (dotY - ringY) * 0.11;

      if (dotRef.current) {
        dotRef.current.style.left = dotX + 'px';
        dotRef.current.style.top  = dotY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top  = ringY + 'px';
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => cursorRef.current?.classList.add('is-hovering');
    const onLeave = () => cursorRef.current?.classList.remove('is-hovering');

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    attachHover();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <div ref={dotRef}  className="cursor-dot"  style={{ position: 'fixed' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed' }} />
    </div>
  );
}
