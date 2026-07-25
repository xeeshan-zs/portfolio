import { useRef, useEffect, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    window.addEventListener('mousemove', onMove, { passive: true });

    const interactives = document.querySelectorAll('a, button, .skill-tag, .floating-badge, .nav-item, input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    const animate = () => {
      const { x, y } = pos.current;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, [hovering]);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        .cursor-pointer {
          position: fixed;
          top: 0; left: 0;
          width: 24px; height: 24px;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.4));
          transition: filter 0.15s;
        }
        .cursor-pointer.hovering {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
          transform-origin: center;
        }
        .cursor-pointer svg {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 768px) {
          .cursor-pointer { display: none !important; }
          * { cursor: auto !important; }
        }
      `}</style>
      <div ref={cursorRef} className={`cursor-pointer ${hovering ? 'hovering' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 3L20 12L12 13L9 21L4 3Z"
            fill="#ff4d6a"
            stroke="#1a1a2e"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 3L20 12L12 13L9 21L4 3Z"
            fill="url(#cursorGrad)"
          />
          <defs>
            <linearGradient id="cursorGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ff6b8a" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ff2d55" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
