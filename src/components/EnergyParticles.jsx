import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const EnergyParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ─── Layer 1: Tiny dust particles ──────────────────────────
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustVel = [];
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPos[i3] = (Math.random() - 0.5) * 100;
      dustPos[i3 + 1] = (Math.random() - 0.5) * 100;
      dustPos[i3 + 2] = (Math.random() - 0.5) * 50;
      dustVel.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.004,
        phase: Math.random() * Math.PI * 2,
      });
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffd700,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ─── Layer 2: Medium energy particles ──────────────────────
    const medCount = 120;
    const medGeo = new THREE.BufferGeometry();
    const medPos = new Float32Array(medCount * 3);
    const medVel = [];
    for (let i = 0; i < medCount; i++) {
      const i3 = i * 3;
      medPos[i3] = (Math.random() - 0.5) * 70;
      medPos[i3 + 1] = (Math.random() - 0.5) * 70;
      medPos[i3 + 2] = (Math.random() - 0.5) * 30;
      medVel.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.008,
        phase: Math.random() * Math.PI * 2,
        orbitRadius: 0.5 + Math.random() * 1.5,
        orbitSpeed: 0.002 + Math.random() * 0.004,
      });
    }
    medGeo.setAttribute('position', new THREE.BufferAttribute(medPos, 3));
    const medMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0xffd700,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const medParticles = new THREE.Points(medGeo, medMat);
    scene.add(medParticles);

    // ─── Layer 3: Large energy orbs (pulsing) ──────────────────
    const orbCount = 8;
    const orbGeo = new THREE.BufferGeometry();
    const orbPos = new Float32Array(orbCount * 3);
    const orbData = [];
    for (let i = 0; i < orbCount; i++) {
      const i3 = i * 3;
      orbPos[i3] = (Math.random() - 0.5) * 60;
      orbPos[i3 + 1] = (Math.random() - 0.5) * 60;
      orbPos[i3 + 2] = (Math.random() - 0.5) * 20;
      orbData.push({
        baseSize: 0.4 + Math.random() * 0.6,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.005,
        driftY: (Math.random() - 0.5) * 0.005,
      });
    }
    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3));
    const orbMat = new THREE.PointsMaterial({
      size: 0.6,
      color: 0xffd700,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const orbs = new THREE.Points(orbGeo, orbMat);
    scene.add(orbs);

    // ─── Layer 4: Connection lines between nearby medium particles ──
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const maxLineVerts = 600;
    const linePositions = new Float32Array(maxLineVerts * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setDrawRange(0, 0);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ─── Layer 5: Nebula / aura background ─────────────────────
    const nebulaGeo = new THREE.PlaneGeometry(120, 120);
    const nebulaMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0xffd700) },
        uColor2: { value: new THREE.Color(0xff6b35) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;

        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * smoothNoise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime * 0.08;

          float n1 = fbm(uv * 2.0 + t * 0.3);
          float n2 = fbm(uv * 3.0 - t * 0.2 + 5.0);
          float n3 = fbm(uv * 1.5 + vec2(t * 0.15, -t * 0.1));

          vec3 col = mix(uColor1, uColor2, n1);
          col += vec3(0.3, 0.1, 0.0) * n2 * 0.5;
          col *= 0.3 + n3 * 0.7;

          float edge = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x)
                     * smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);

          float alpha = (n1 * 0.4 + n2 * 0.3 + n3 * 0.3) * edge * 0.12;

          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -20;
    scene.add(nebula);

    // ─── Mouse parallax ────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── Animation loop ────────────────────────────────────────
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Update dust
      const dPos = dustGeo.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        const v = dustVel[i];
        v.phase += 0.005;
        dPos[i3] += v.x + Math.sin(v.phase) * 0.003;
        dPos[i3 + 1] += v.y + Math.cos(v.phase * 0.7) * 0.003;
        dPos[i3 + 2] += v.z;
        if (Math.abs(dPos[i3]) > 50) dPos[i3] *= -0.9;
        if (Math.abs(dPos[i3 + 1]) > 50) dPos[i3 + 1] *= -0.9;
        if (Math.abs(dPos[i3 + 2]) > 25) dPos[i3 + 2] *= -0.9;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Update medium particles (orbital drift)
      const mPos = medGeo.attributes.position.array;
      for (let i = 0; i < medCount; i++) {
        const i3 = i * 3;
        const v = medVel[i];
        v.phase += v.orbitSpeed;
        mPos[i3] += v.x + Math.sin(v.phase) * v.orbitRadius * 0.01;
        mPos[i3 + 1] += v.y + Math.cos(v.phase * 0.8) * v.orbitRadius * 0.01;
        mPos[i3 + 2] += v.z;
        if (Math.abs(mPos[i3]) > 35) mPos[i3] *= -0.9;
        if (Math.abs(mPos[i3 + 1]) > 35) mPos[i3 + 1] *= -0.9;
        if (Math.abs(mPos[i3 + 2]) > 15) mPos[i3 + 2] *= -0.9;
      }
      medGeo.attributes.position.needsUpdate = true;

      // Update orbs (pulsing size + drift)
      const oPos = orbGeo.attributes.position.array;
      let maxOrbSize = 0;
      for (let i = 0; i < orbCount; i++) {
        const i3 = i * 3;
        const d = orbData[i];
        const pulse = Math.sin(elapsed * d.pulseSpeed + d.phase) * 0.3 + 0.7;
        const size = d.baseSize * pulse;
        if (size > maxOrbSize) maxOrbSize = size;
        oPos[i3] += d.driftX + Math.sin(elapsed * 0.3 + d.phase) * 0.003;
        oPos[i3 + 1] += d.driftY + Math.cos(elapsed * 0.25 + d.phase) * 0.003;
        if (Math.abs(oPos[i3]) > 30) oPos[i3] *= -0.8;
        if (Math.abs(oPos[i3 + 1]) > 30) oPos[i3 + 1] *= -0.8;
      }
      orbGeo.attributes.position.needsUpdate = true;
      orbMat.size = maxOrbSize * 1.2;

      // Build connection lines (only check medium particles for perf)
      let lineIdx = 0;
      const threshold = 12;
      for (let i = 0; i < medCount && lineIdx < maxLineVerts - 2; i++) {
        for (let j = i + 1; j < medCount && lineIdx < maxLineVerts - 2; j++) {
          const dx = mPos[i * 3] - mPos[j * 3];
          const dy = mPos[i * 3 + 1] - mPos[j * 3 + 1];
          const dz = mPos[i * 3 + 2] - mPos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < threshold) {
            const fade = 1 - dist / threshold;
            linePositions[lineIdx++] = mPos[i * 3];
            linePositions[lineIdx++] = mPos[i * 3 + 1];
            linePositions[lineIdx++] = mPos[i * 3 + 2];
            linePositions[lineIdx++] = mPos[j * 3];
            linePositions[lineIdx++] = mPos[j * 3 + 1];
            linePositions[lineIdx++] = mPos[j * 3 + 2];
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3);
      lineGeo.attributes.position.needsUpdate = true;
      lineMat.opacity = 0.04 + Math.sin(elapsed * 0.5) * 0.02;

      // Update nebula
      nebulaMat.uniforms.uTime.value = elapsed;

      // Apply parallax to layers
      dust.position.x = mouse.x * 1.5;
      dust.position.y = -mouse.y * 1.5;
      medParticles.position.x = mouse.x * 3;
      medParticles.position.y = -mouse.y * 3;
      orbs.position.x = mouse.x * 2;
      orbs.position.y = -mouse.y * 2;

      // Slow scene rotation
      dust.rotation.y += 0.0003;
      dust.rotation.x += 0.0001;
      medParticles.rotation.y -= 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default EnergyParticles;
