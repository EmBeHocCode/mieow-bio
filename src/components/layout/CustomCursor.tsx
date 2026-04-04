import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], .pixel-surface, .pixel-cut';

function canUseCustomCursor() {
  if (typeof window === 'undefined') {
    return false;
  }

  const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return hoverCapable && !reducedMotion && window.innerWidth > 768;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const primaryRef = useRef<HTMLDivElement | null>(null);
  const secondaryRef = useRef<HTMLDivElement | null>(null);
  const fxLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const syncEnabled = () => setEnabled(canUseCustomCursor());

    syncEnabled();
    window.addEventListener('resize', syncEnabled);

    return () => window.removeEventListener('resize', syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-enabled', 'cursor-hover', 'custom-cursor-hidden');
      return;
    }

    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    const fxLayer = fxLayerRef.current;

    if (!primary || !secondary || !fxLayer) {
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;
    let lastTrailTime = 0;

    primary.style.left = `${mouseX}px`;
    primary.style.top = `${mouseY}px`;
    secondary.style.left = `${ringX}px`;
    secondary.style.top = `${ringY}px`;

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      secondary.style.left = `${ringX}px`;
      secondary.style.top = `${ringY}px`;

      rafId = window.requestAnimationFrame(animateRing);
    };

    const createFxNode = (className: string, x: number, y: number, lifetime: number) => {
      const node = document.createElement('span');
      node.className = className;
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      fxLayer.appendChild(node);
      window.setTimeout(() => node.remove(), lifetime);
    };

    const createTrail = (x: number, y: number) => {
      const now = Date.now();

      if (now - lastTrailTime < 36) {
        return;
      }

      lastTrailTime = now;
      createFxNode('cursor-trail', x, y, 520);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      primary.style.left = `${mouseX}px`;
      primary.style.top = `${mouseY}px`;
      createTrail(mouseX, mouseY);
    };

    const handlePointerDown = (event: MouseEvent) => {
      primary.classList.add('clicking');
      secondary.classList.add('clicking');
      window.setTimeout(() => {
        primary.classList.remove('clicking');
        secondary.classList.remove('clicking');
      }, 220);
      createFxNode('cursor-click-effect', event.clientX, event.clientY, 560);
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest(INTERACTIVE_SELECTOR)) {
        document.body.classList.add('cursor-hover');
      }
    };

    const handlePointerOut = (event: MouseEvent) => {
      const nextTarget = event.relatedTarget as HTMLElement | null;

      if (!nextTarget?.closest(INTERACTIVE_SELECTOR)) {
        document.body.classList.remove('cursor-hover');
      }
    };

    const hideCursor = () => document.body.classList.add('custom-cursor-hidden');
    const showCursor = () => document.body.classList.remove('custom-cursor-hidden');

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);

    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.body.classList.remove('custom-cursor-enabled', 'cursor-hover', 'custom-cursor-hidden');
      fxLayer.innerHTML = '';
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120]"
    >
      <div ref={fxLayerRef} className="absolute inset-0" />
      <div ref={secondaryRef} className="custom-cursor-secondary" />
      <div ref={primaryRef} className="custom-cursor-primary" />
    </div>
  );
}
