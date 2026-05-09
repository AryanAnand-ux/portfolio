import React, { useRef, useEffect, useState } from 'react';
import './Education.css';

const Education = () => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#ffd166');
  const [lineWidth, setLineWidth] = useState(6);
  const drawing = useRef(false);

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
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.fillStyle = '#272727';
      ctx.fillRect(0, 0, rect.width, rect.height);
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
      drawing.current = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = lineWidth;
      if (tool === 'erase') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
      }
      ctx.moveTo(pos.x, pos.y);
    };

    const pointerMove = (e) => {
      if (!drawing.current) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const pointerUp = () => {
      drawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener('pointerdown', pointerDown);
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerup', pointerUp);
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
    ctx.fillStyle = '#272727';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="education-panel brut-box reveal">
          <div className="edu-header" style={{ gridColumn: '1/-1', textAlign: 'center', marginBottom: '1rem' }}>
            <h2 className="section-title" style={{ backgroundColor: 'var(--accent-purple)', transform: 'rotate(-2deg)' }}>
              Education
            </h2>
          </div>

          <div className="edu-grid">
            <div className="edu-left">
              <div className="edu-card brut-box-small">
                <div className="edu-badge">2024-2028</div>
                <h3>B.Tech CSE</h3>
                <small>Jaypee University Of Enginering And Technology, Guna</small>
                <ul>
                  <li>Relevant Coursework: DSA, OOP, DBMS, OS</li>
                  <li>Focus: Full Stack Development & AI</li>
                </ul>
              </div>

              <div className="edu-card brut-box-small">
                <div className="edu-badge">XII</div>
                <h3>Senior Secondary</h3>
                <small>St. Atulanand Residential Academy,Varanasi</small>
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
                <button className={`tool-btn ${tool === 'pen' ? 'active' : ''}`} onClick={selectPen}>✏️ Pen</button>
                <button className={`tool-btn ${tool === 'marker' ? 'active' : ''}`} onClick={selectMarker}>🖍️ Marker</button>
                <button className={`tool-btn ${tool === 'erase' ? 'active' : ''}`} onClick={selectErase}>🧽 Erase</button>
                <button className="tool-btn" onClick={clearCanvas}>🗑️ Clear</button>
              </div>

              <div className="draw-wrapper">
                <canvas ref={canvasRef} className="draw-canvas" />
                <div className="draw-area-placeholder">DRAW HERE!</div>
              </div>

              <div className="edu-footer">✨ Bored? Doodle something cool!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
