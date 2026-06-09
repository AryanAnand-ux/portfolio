import { useEffect, useState, useRef } from 'react';
import './Loading.css';

// ─────────────────────────────────────────────────────────────────
// 3D Loading Animation — mobile-optimised
//
// Key perf improvements vs previous version:
//  • No per-orb ctx.filter calls (was 18 GPU filter state changes/frame)
//  • Depth blur simulated via radial gradient alpha falloff — zero GPU cost
//  • DPR capped at 1 on low-end devices (no 3× overdraw on Retina mobile)
//  • Fewer orbs + smaller canvas on mobile
// ─────────────────────────────────────────────────────────────────

const isMobile = () =>
  typeof window !== 'undefined' && window.innerWidth <= 600;

const getConfig = () => {
  const mobile = isMobile();
  return {
    NUM_ORBS:    mobile ? 12 : 18,
    RING_RADIUS: mobile ? 95  : 155,
    TILT:        0.30,
    ORB_HEIGHT:  mobile ? 44  : 65,
    ORB_WIDTH:   mobile ? 44  : 65,
    CANVAS_W:    mobile ? 340 : 620,
    CANVAS_H:    mobile ? 200 : 320,
    ROT_SPEED:   0.013,
  };
};

const Loading = ({ isComplete, onComplete }) => {
  const [fadingOut, setFadingOut]   = useState(false);
  const canvasRef                   = useRef(null);
  const rafRef                      = useRef(null);
  const angleRef                    = useRef(0);

  // ── Canvas render loop ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cfg = getConfig();
    const {
      NUM_ORBS, RING_RADIUS, TILT,
      ORB_HEIGHT, ORB_WIDTH, CANVAS_W, CANVAS_H, ROT_SPEED,
    } = cfg;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cap DPR at 1 on mobile to avoid 2–3× overdraw
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile() ? 1 : 2);

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

        const x3 = RING_RADIUS * Math.cos(theta);
        const z3 = RING_RADIUS * Math.sin(theta);

        const screenX = cx + x3;
        const screenY = cy - z3 * sinTilt;
        const depth   = z3 * cosTilt;

        // Depth factor: 0 = back, 1 = front
        const t = (z3 + RING_RADIUS) / (2 * RING_RADIUS);

        // Foreshortening — disc width narrows as disc turns edge-on
        const tangentZ   = Math.cos(theta) * cosTilt;
        const faceFactor = Math.sqrt(1 - tangentZ * tangentZ);

        const w = Math.max(2, ORB_WIDTH  * faceFactor);
        const h = ORB_HEIGHT;

        // Opacity: back → front  (0.05 → 1.0)
        const opacity = 0.05 + t * 0.95;

        // Blur radius used ONLY for the gradient falloff radius multiplier
        // No ctx.filter calls → zero GPU state-switch cost
        const blurSpread = 1 + (1 - t) * 3.5; // 1× (front) → 4.5× (back)

        orbs.push({ screenX, screenY, w, h, opacity, blurSpread, depth });
      }

      // ── Painter's algorithm: back → front ──────────────────
      orbs.sort((a, b) => a.depth - b.depth);

      orbs.forEach(({ screenX, screenY, w, h, opacity, blurSpread }) => {
        const rX = (w / 2) * blurSpread;
        const rY = (h / 2) * blurSpread;

        // Radial gradient simulates gaussian glow — GPU-friendly, no filter API
        const grad = ctx.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, Math.max(rX, rY),
        );
        grad.addColorStop(0,    `rgba(255,255,255,${opacity})`);
        grad.addColorStop(0.45, `rgba(255,255,255,${opacity * 0.65})`);
        grad.addColorStop(1,    'rgba(255,255,255,0)');

        ctx.save();
        ctx.scale(rX / Math.max(rX, rY), rY / Math.max(rX, rY));
        const sx = screenX / (rX / Math.max(rX, rY));
        const sy = screenY / (rY / Math.max(rX, rY));

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(rX, rY), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      angleRef.current += ROT_SPEED;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Completion / fade-out logic ──────────────────────────────
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
      <canvas
        ref={canvasRef}
        id="loader-canvas"
        className="loader-canvas"
        aria-hidden="true"
      />
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loading;
