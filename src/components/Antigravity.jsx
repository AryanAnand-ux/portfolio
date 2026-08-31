import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Antigravity.css';

const Antigravity = ({
  count = 350,
  magnetRadius = 6,
  ringRadius = 7,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 0.8,
  lerpSpeed = 0.06,
  color = '#ff4d8d',
  autoAnimate = true,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Viewport calculation at z = 0
    const vFov = (camera.fov * Math.PI) / 180;
    const vHeight = 2 * Math.tan(vFov / 2) * 50;
    const vWidth = vHeight * camera.aspect;

    // Geometry based on particleShape
    let geometry;
    if (particleShape === 'capsule') {
      geometry = new THREE.CapsuleGeometry(0.1, 0.4, 4, 8);
    } else if (particleShape === 'sphere') {
      geometry = new THREE.SphereGeometry(0.2, 16, 16);
    } else if (particleShape === 'box') {
      geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    } else {
      geometry = new THREE.TetrahedronGeometry(0.3);
    }

    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(mesh);

    const dummy = new THREE.Object3D();

    // Deterministic particle pool
    const particles = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      const x = (Math.random() - 0.5) * vWidth;
      const y = (Math.random() - 0.5) * vHeight;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      particles.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        vx: 0,
        vy: 0,
        vz: 0,
        randomRadiusOffset
      });
    }

    const mousePos = { x: 0, y: 0 };
    const lastMousePos = { x: 0, y: 0 };
    let lastMouseMoveTime = 0;
    const virtualMouse = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let animationFrameId;
    const startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;

      const mouseDist = Math.sqrt(
        Math.pow(mousePos.x - lastMousePos.x, 2) + Math.pow(mousePos.y - lastMousePos.y, 2)
      );

      if (mouseDist > 0.001) {
        lastMouseMoveTime = performance.now();
        lastMousePos.x = mousePos.x;
        lastMousePos.y = mousePos.y;
      }

      let destX = (mousePos.x * vWidth) / 2;
      let destY = (mousePos.y * vHeight) / 2;

      if (autoAnimate && performance.now() - lastMouseMoveTime > 2000) {
        destX = Math.sin(currentTime * 0.5) * (vWidth / 4);
        destY = Math.cos(currentTime * 0.5 * 2) * (vHeight / 4);
      }

      const smoothFactor = 0.05;
      virtualMouse.x += (destX - virtualMouse.x) * smoothFactor;
      virtualMouse.y += (destY - virtualMouse.y) * smoothFactor;

      const targetX = virtualMouse.x;
      const targetY = virtualMouse.y;

      const globalRotation = currentTime * rotationSpeed;

      for (let i = 0; i < count; i++) {
        const particle = particles[i];
        let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

        t = particle.t += speed / 2;

        const projectionFactor = 1 - cz / 50;
        const projectedTargetX = targetX * projectionFactor;
        const projectedTargetY = targetY * projectionFactor;

        const dx = mx - projectedTargetX;
        const dy = my - projectedTargetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const targetPos = { x: mx, y: my, z: mz * depthFactor };

        if (dist < magnetRadius) {
          const angle = Math.atan2(dy, dx) + globalRotation;
          const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
          const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
          const currentRingRadius = ringRadius + wave + deviation;

          targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
          targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
          targetPos.z = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
        }

        particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
        particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
        particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

        dummy.position.set(particle.cx, particle.cy, particle.cz);
        dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
        dummy.rotateX(Math.PI / 2);

        const currentDistToMouse = Math.sqrt(
          Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
        );

        const distFromRing = Math.abs(currentDistToMouse - ringRadius);
        let scaleFactor = 1 - distFromRing / 10;
        scaleFactor = Math.max(0, Math.min(1, scaleFactor));

        const finalScale =
          scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
        dummy.scale.set(finalScale, finalScale, finalScale);

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    depthFactor,
    pulseSpeed,
    particleShape,
    fieldStrength
  ]);

  return (
    <div
      ref={containerRef}
      className="antigravity-bg-container"
      aria-hidden="true"
    />
  );
};

export default Antigravity;
