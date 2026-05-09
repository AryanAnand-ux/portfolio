import { useEffect, useState } from 'react';
import './Loading.css';

const Loading = ({ isComplete, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isComplete) return undefined;

    const duration = 2200;
    const startedAt = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      timeoutId = window.setTimeout(() => {
        onComplete?.();
      }, 250);
    };

    let frameId = requestAnimationFrame(tick);
    let timeoutId;

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [isComplete, onComplete]);

  if (isComplete) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-scanlines"></div>
        <div className="loading-content">
          <h1 className="loading-title">LOADING...</h1>
          <div className="loading-bar-wrapper">
            <div className="loading-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="loading-percent">{progress}%</div>
        </div>
        <div className="loading-device">
          <div className="device-notch"></div>
          <div className="device-speaker"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
