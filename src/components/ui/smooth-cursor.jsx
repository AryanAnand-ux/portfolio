import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useSpring } from "motion/react";

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";

function isTrackablePointer(pointerType) {
  return pointerType !== "touch";
}

const DefaultCursorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const DiamondCursorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      style={{ filter: "drop-shadow(3px 3px 0px #111)" }}
    >
      {/* Outer Diamond */}
      <polygon
        points="21,3 39,21 21,39 3,21"
        fill="#ffd166"
        stroke="#111"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Accent Diamond */}
      <polygon
        points="21,11 31,21 21,31 11,21"
        fill="#ff9f1c"
        stroke="#111"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Center Precision Target Dot */}
      <circle cx="21" cy="21" r="2.5" fill="#111" />
    </svg>
  );
};

const HandCursorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={33}
      viewBox="0 0 24 24"
      fill="none"
      style={{ filter: "drop-shadow(2.5px 2.5px 0px #111)" }}
    >
      <path
        d="M10 11V3a1.5 1.5 0 0 1 3 0v7M13 8.5a1.5 1.5 0 0 1 3 0V11M16 10a1.5 1.5 0 0 1 3 0v1.5M10 9a1.5 1.5 0 0 0-3 0v5.5l-2.1-2.1a1.5 1.5 0 0 0-2.12 2.12l4.9 4.9A6.5 6.5 0 0 0 12.3 22H15a6.5 6.5 0 0 0 6.5-6.5V11"
        fill="#a3def0"
        stroke="#111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}) {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);
  const [isClickableHovered, setIsClickableHovered] = useState(false);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);
    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) {
        setIsVisible(false);
      }
    };
    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateEnabled);
    } else {
      mediaQuery.addListener(updateEnabled);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateEnabled);
      } else {
        mediaQuery.removeListener(updateEnabled);
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    let timeout = null;

    const updateVelocity = (currentPos) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }
      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }
      setIsVisible(true);

      const target = e.target;

      // 1. Check if hovering over canvas / doodle element
      const onCanvas = !!(
        target &&
        (target.tagName === "CANVAS" ||
          (target.closest &&
            target.closest("canvas, .draw-canvas, .draw-wrapper, .loading-canvas")))
      );
      setIsCanvasHovered(onCanvas);

      // 2. Check if hovering over clickable buttons or links
      const isClickable = !!(
        !onCanvas &&
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.getAttribute?.("role") === "button" ||
          (target.closest &&
            target.closest(
              "button, a, [role='button'], .brut-btn, .nav-link, .pill, .indicator-dot, .tool-btn, .control-btn, input[type='button'], input[type='submit']"
            )) ||
          window.getComputedStyle(target).cursor === "pointer")
      );
      setIsClickableHovered(isClickable);

      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;
        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          scale.set(1);
        }, 150);
      }
    };

    let rafId = 0;
    const throttledPointerMove = (e) => {
      if (!isTrackablePointer(e.pointerType)) {
        return;
      }
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100000,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      {isCanvasHovered ? (
        <DiamondCursorSVG />
      ) : isClickableHovered ? (
        <HandCursorSVG />
      ) : (
        cursor
      )}
    </motion.div>
  );
}
