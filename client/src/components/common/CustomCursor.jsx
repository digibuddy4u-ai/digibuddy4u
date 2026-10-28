import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * Luxury agency-grade smooth cursor circle follower with fluid lerp physics,
 * interactive element hover expansion, and mobile touch guards.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);
  const isVisible = useRef(false);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine control (no smartphones/tablets)
    const isTouchOnly =
      ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
      !window.matchMedia('(pointer: fine)').matches;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchOnly || prefersReduced) {
      return;
    }

    setEnabled(true);

    let animId;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Detect if cursor is hovering over an interactive target
      const target = e.target;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], label, .cursor-pointer') ||
            window.getComputedStyle(target).cursor === 'pointer'
        );
        isHovered.current = interactive;
      }
    };

    const onMouseDown = () => {
      isClicked.current = true;
    };

    const onMouseUp = () => {
      isClicked.current = false;
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Fluid 60fps/120fps physics loop with direct GPU transform
    const loop = () => {
      // Linear interpolation (lerp) for smooth trailing lag
      const ease = 0.18;
      ring.current.x += (mouse.current.x - ring.current.x) * ease;
      ring.current.y += (mouse.current.y - ring.current.y) * ease;

      const scale = isClicked.current
        ? isHovered.current
          ? 1.5
          : 0.75
        : isHovered.current
        ? 1.85
        : 1.0;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

        if (isHovered.current) {
          ringRef.current.classList.add('cursor-hover-active');
        } else {
          ringRef.current.classList.remove('cursor-hover-active');
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* 1. Precise Inner Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[99999] opacity-0 transition-opacity duration-300 will-change-transform shadow-[0_0_8px_rgba(8,102,245,0.7)]"
        aria-hidden="true"
      />

      {/* 2. Fluid Trailing Cursor Ring with Cyan/Electric Glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-primary/50 pointer-events-none z-[99998] opacity-0 transition-[border-color,background-color,box-shadow] duration-200 will-change-transform bg-primary/[0.04] backdrop-blur-[0.5px] shadow-[0_0_15px_rgba(24,213,232,0.25)] [&.cursor-hover-active]:border-cyan-accent [&.cursor-hover-active]:bg-cyan-accent/[0.14] [&.cursor-hover-active]:shadow-[0_0_22px_rgba(24,213,232,0.55)]"
        aria-hidden="true"
      />
    </>
  );
}
