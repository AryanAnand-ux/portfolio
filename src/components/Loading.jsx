import { useEffect, useState, useRef } from 'react';
import './Loading.css';

// ─────────────────────────────────────────────────────────────────
// 3D Loading Animation — faithful to Figma design
//
// Figma structure: 4 arcs × 5 ellipses. Each ellipse is 100px tall
// with widths 10 → 25 → 50 → 75 → 100 px (perspective foreshortening).
// Blur: 22px (back) → 0 (front). Opacity: ~0 (back) → 1 (front).
//
// Implementation: 18 white discs on a 3D ring, tilted ~17° from
// edge-on view. CSS canvas filter: blur() per-orb for real gaussian.
// Painter's algorithm back-to-front. Smooth rotation animation.
// ─────────────────────────────────────────────────────────────────

const NUM_ORBS    = 18;
const RING_RADIUS = 155;   // px — ring radius
const TILT        = 0.30;  // rad ≈ 17° — tilt from edge-on (controls vertical spread)
const ORB_HEIGHT  = 65;    // px — constant orb height
const ORB_WIDTH   = 65;    // px — max orb width (at front, face-on)
const CANVAS_W    = 620;   // px — canvas width (includes blur halos)
const CANVAS_H    = 320;   // px — canvas height
const ROT_SPEED   = 0.013; // rad/frame — rotation speed

const Loading = ({ isComplete, onComplete }) => {
  const [fadingOut, setFadingOut]   = useState(false);
  const canvasRef                   = useRef(null);
  const rafRef                      = useRef(null);
  const angleRef                    = useRef(0);

  // ── Canvas render loop ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Safeguard for headless test environments (jsdom)

    const DPR = window.devicePixelRatio || 1;

    // HiDPI canvas
    canvas.width        = CANVAS_W * DPR;
    canvas.height       = CANVAS_H * DPR;
    canvas.style.width  = `${CANVAS_W}px`;
    canvas.style.height = `${CANVAS_H}px`;
    ctx.scale(DPR, DPR);

    const cx = CANVAS_W / 2;
    const cy = CANVAS_H / 2;

    const cosTilt = Math.cos(TILT);
    const sinTilt = Math.sin(TILT);

    const render = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // ── Build orb data ─────────────────────────────────────
      const orbs = [];

      for (let i = 0; i < NUM_ORBS; i++) {
        const theta = angleRef.current + (i / NUM_ORBS) * Math.PI * 2;

        // 3D position on ring (ring lies in XZ plane)
        const x3 = RING_RADIUS * Math.cos(theta);
        const z3 = RING_RADIUS * Math.sin(theta);

        // Tilt ring around X-axis → screen projection
        const screenX = cx + x3;
        const screenY = cy - z3 * sinTilt;
        const depth   = z3 * cosTilt;   // positive = closer to viewer

        // Depth factor: 0 = back, 1 = front
        const t = (z3 + RING_RADIUS) / (2 * RING_RADIUS);

        // Foreshortening — disc normal is tangent to ring
        // tangent at θ: (-sin θ, 0, cos θ)
        // after tilt, z-component = cos θ · cos(tilt)
        const tangentZ = Math.cos(theta) * cosTilt;
        const faceFactor = Math.sqrt(1 - tangentZ * tangentZ);

        // Orb width shrinks as disc turns edge-on
        const w = Math.max(3, ORB_WIDTH * faceFactor);
        const h = ORB_HEIGHT;

        // Depth-based blur: heavy at back, none at front
        // Matches Figma values: blur(22px) → blur(0px)
        const blur = (1 - t) * 22;

        // Depth-based opacity: faded at back, solid at front
        const opacity = 0.06 + t * 0.94;

        orbs.push({ screenX, screenY, w, h, blur, opacity, depth });
      }

      // ── Painter's algorithm: back → front ──────────────────
      orbs.sort((a, b) => a.depth - b.depth);

      orbs.forEach(({ screenX, screenY, w, h, blur, opacity }) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.filter = blur > 0.5 ? `blur(${blur.toFixed(1)}px)` : 'none';
        ctx.fillStyle = '#ffffff';

        ctx.beginPath();
        ctx.ellipse(screenX, screenY, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      angleRef.current += ROT_SPEED;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Completion / fade-out logic (2400 ms timer) ─────────────
  useEffect(() => {
    if (isComplete) return undefined;

    const duration  = 2400;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed  = performance.now() - startedAt;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));

      if (progress < 100) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      setFadingOut(true);
      timeoutId = window.setTimeout(() => onComplete?.(), 560);
    };

    let frameId  = requestAnimationFrame(tick);
    let timeoutId;

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [isComplete, onComplete]);

  if (isComplete) return null;

  return (
    <div
      className={`loading-overlay${fadingOut ? ' fade-out' : ''}`}
      role="status"
      aria-label="Loading"
    >
      {/* 3-D tilted ring of foreshortened orbs */}
      <canvas
        ref={canvasRef}
        id="loader-canvas"
        className="loader-canvas"
        aria-hidden="true"
      />

      {/* "Loading..." — Libre Baskerville Italic per Figma */}
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loading;
