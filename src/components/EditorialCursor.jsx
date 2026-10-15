import { useEffect, useRef } from 'react';

const EditorialCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!cursor) return;

    const root = document.documentElement;
    const move = (event) => {
      if (!finePointer.matches) return;
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add('is-visible');
      root.classList.add('editorial-cursor-enabled');
    };
    const hover = (event) => {
      const interactive = event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]');
      const textEntry = event.target instanceof Element && event.target.closest('input, textarea, [contenteditable="true"]');
      cursor.classList.toggle('is-interactive', Boolean(interactive));
      cursor.classList.toggle('is-text', Boolean(textEntry));
    };
    const leave = () => {
      cursor.classList.remove('is-visible');
      root.classList.remove('editorial-cursor-enabled');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', hover, { passive: true });
    document.addEventListener('pointerleave', leave);
    finePointer.addEventListener('change', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', hover);
      document.removeEventListener('pointerleave', leave);
      finePointer.removeEventListener('change', leave);
      root.classList.remove('editorial-cursor-enabled');
    };
  }, []);

  return (
    <div ref={cursorRef} className="editorial-cursor" aria-hidden="true">
      <svg viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2V29L9.4 22.9L14.2 33L18.3 31.1L13.5 21.1L22.2 20.8L3 2Z" fill="#fffdf8" stroke="#202525" strokeWidth="2" strokeLinejoin="round" />
        <path d="M3 2V16.5L13.5 21.1L22.2 20.8L3 2Z" fill="#a93630" stroke="#202525" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="editorial-cursor-ring" />
    </div>
  );
};

export default EditorialCursor;
