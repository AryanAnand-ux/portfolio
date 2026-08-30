import { useEffect, useRef, useState, useCallback } from 'react';
import './Shuffle.css';

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}~/\\';

const Shuffle = ({
  text,
  children,
  className = '',
  style = {},
  tag = 'span',
  duration = 2.5,
  shuffleTimes = 1,
  scrambleCharset = DEFAULT_CHARSET,
  triggerOnHover = true,
  triggerOnce = false,
  threshold = 0.1,
  fps = 18,
  onShuffleComplete,
  ...props
}) => {
  const content = (text ?? children ?? '').toString();
  const [displayText, setDisplayText] = useState(content);
  const [isShuffling, setIsShuffling] = useState(false);
  const containerRef = useRef(null);
  const hasTriggeredRef = useRef(false);
  const timerRef = useRef(null);

  const startShuffle = useCallback(() => {
    if (!content) return;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsShuffling(true);

    const length = content.length;
    const effectiveDuration = duration * Math.max(1, shuffleTimes);
    const intervalMs = Math.round(1000 / fps);
    const totalSteps = Math.max(25, Math.round((effectiveDuration * 1000) / intervalMs));
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      const updated = content
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '\n' || char === '\t') return char;

          // Staggered reveal: characters resolve sequentially across the duration
          const charThreshold = (index + 1) / (length + 1);

          if (progress >= charThreshold) {
            return char;
          }

          // Shuffled glyph while scrambling
          const randomIndex = Math.floor(Math.random() * scrambleCharset.length);
          return scrambleCharset[randomIndex];
        })
        .join('');

      setDisplayText(updated);

      if (step >= totalSteps) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplayText(content);
        setIsShuffling(false);
        onShuffleComplete?.();
      }
    }, intervalMs);
  }, [content, duration, shuffleTimes, fps, scrambleCharset, onShuffleComplete]);

  // Trigger on scroll into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      startShuffle();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current || !triggerOnce) {
            hasTriggeredRef.current = true;
            startShuffle();
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startShuffle, threshold, triggerOnce]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startShuffle();
    }
  };

  const Tag = tag;

  return (
    <Tag
      ref={containerRef}
      className={`shuffle-text ${isShuffling ? 'is-shuffling' : ''} ${className}`.trim()}
      style={style}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayText}
    </Tag>
  );
};

export default Shuffle;
