import { useRef, useEffect, useState } from 'react';
import './Education.css';

const CANVAS_BG = '#272727';

const Education = () => {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#ffd166');
  const [lineWidth, setLineWidth] = useState(6);
  const [hasDrawn, setHasDrawn] = useState(false);

  const selectPen = () => {
    setTool('pen');
    setColor('#ffd166');
    setLineWidth(6);
  };

  const selectMarker = () => {
    setTool('marker');
    setColor('#ffffff');
    setLineWidth(14);
  };

  const selectErase = () => {
    setTool('erase');
    setLineWidth(24);
  };

  const fillBoard = (ctx, width, height) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * scale);
      canvas.height = Math.floor(rect.height * scale);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      fillBoard(ctx, rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const pointerDown = (e) => {
      e.preventDefault();
      drawing.current = true;
      canvas.setPointerCapture?.(e.pointerId);

      const pos = getPos(e);
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = lineWidth;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = tool === 'erase' ? CANVAS_BG : color;
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      if (tool !== 'erase') {
        setHasDrawn(true);
      }
    };

    const pointerMove = (e) => {
      if (!drawing.current) return;
      e.preventDefault();

      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const pointerUp = (e) => {
      drawing.current = false;
      ctx.closePath();
      canvas.releasePointerCapture?.(e.pointerId);
    };

    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
    };
  }, [tool, color, lineWidth]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    fillBoard(ctx, rect.width, rect.height);
    setHasDrawn(false);
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="education-panel brut-box reveal">
          <div className="edu-header">
            <h2 className="section-title edu-title">
              Education
            </h2>
          </div>

          <div className="edu-grid">
            <div className="edu-left">
              <div className="edu-card brut-box-small">
                <div className="edu-badge">2024-2028</div>
                <h3>B.Tech CSE</h3>
                <small>Jaypee University Of Engineering And Technology, Guna</small>
                <ul>
                  <li>Relevant Coursework: DSA, OOP, DBMS</li>
                  <li>Focus: Full Stack Development & AI</li>
                </ul>
              </div>

              <div className="edu-card brut-box-small">
                <div className="edu-badge">XII</div>
                <h3>Senior Secondary</h3>
                <small>St. Atulanand Residential Academy, Varanasi</small>
                <div className="edu-meta">CBSE Board | Percentage: 86.6%</div>
              </div>

              <div className="edu-card brut-box-small">
                <div className="edu-badge">X</div>
                <h3>Secondary Education</h3>
                <small>HARMONY INTNL SCHL CHAURASIA MOHANIA KAIMUR BR</small>
                <div className="edu-meta">CBSE Board | Percentage: 79.4%</div>
              </div>
            </div>

            <div className="edu-right brut-box">
              <div className="canvas-header">
                <button type="button" className={`tool-btn ${tool === 'pen' ? 'active' : ''}`} aria-pressed={tool === 'pen'} onClick={selectPen}>Pen</button>
                <button type="button" className={`tool-btn ${tool === 'marker' ? 'active' : ''}`} aria-pressed={tool === 'marker'} onClick={selectMarker}>Marker</button>
                <button type="button" className={`tool-btn ${tool === 'erase' ? 'active' : ''}`} aria-pressed={tool === 'erase'} onClick={selectErase}>Erase</button>
                <button type="button" className="tool-btn" onClick={clearCanvas}>Clear</button>
              </div>

              <div className="draw-wrapper">
                <canvas ref={canvasRef} className="draw-canvas" aria-label="Interactive doodle board" />
                {!hasDrawn && <div className="draw-area-placeholder">DRAW HERE!</div>}
              </div>

              <div className="edu-footer">Bored? Doodle something cool!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
