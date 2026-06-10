import { useEffect, useState, useRef } from 'react';

const DefaultCursor = ({ isHovered }) => (
  <div
    className={`custom-cursor-dot ${isHovered ? 'hovered' : ''}`}
    style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: isHovered ? 'var(--accent-yellow)' : 'var(--accent-pink)',
      border: '2px solid var(--border-color)',
      boxShadow: isHovered ? '2px 2px 0px var(--border-color)' : 'none',
      transform: isHovered ? 'scale(1.4)' : 'scale(1)',
      transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease, box-shadow 0.15s ease',
    }}
  />
);

export const SmoothCursor = ({ cursor, springConfig }) => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);

  // Position references for spring physics
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const vx = useRef(0);
  const vy = useRef(0);

  const config = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
    ...springConfig,
  };

  useEffect(() => {
    // Check if device supports hover (fine pointer)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const listener = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isFinePointer, isVisible]);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.brut-btn') ||
        target.closest('.control-btn') ||
        target.closest('.indicator-dot') ||
        target.closest('.nav-logo') ||
        window.getComputedStyle(target).cursor === 'pointer';

      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select');

      setIsHovered(!!isInteractive);
      setIsOverInput(!!isInput);
    };

    const handleMouseOut = () => {
      setIsHovered(false);
      setIsOverInput(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isFinePointer]);

  // Spring animation loop
  useEffect(() => {
    if (!isFinePointer) return;

    let animId;

    const tick = () => {
      const tx = targetX.current;
      const ty = targetY.current;
      const cx = currentX.current;
      const cy = currentY.current;

      const dx = tx - cx;
      const dy = ty - cy;

      // F = -k*x - c*v
      const ax = (config.stiffness * dx - config.damping * vx.current) / config.mass;
      const ay = (config.stiffness * dy - config.damping * vy.current) / config.mass;

      vx.current += ax * 0.016;
      vy.current += ay * 0.016;

      currentX.current += vx.current * 0.016;
      currentY.current += vy.current * 0.016;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX.current}px, ${currentY.current}px, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isFinePointer, config.stiffness, config.damping, config.mass]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className={`smooth-cursor-wrapper ${isVisible && !isOverInput ? 'visible' : 'hidden'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        marginLeft: '-8px',
        marginTop: '-8px',
      }}
    >
      {cursor || <DefaultCursor isHovered={isHovered} />}
    </div>
  );
};
