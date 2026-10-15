import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const THEME_COLORS = {
  ssblue:   { ball: 0x0066cc, glow: 0x00ccff, star: 0x003366, light: 0x00ccff, rim: 0x0044aa, particle: [0.1, 0.7, 1] },
};

const DragonBall = ({ theme = 'ssblue' }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;
    const tc = THEME_COLORS[theme] || THEME_COLORS.ssblue;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Ball
    const ballGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const ballMat = new THREE.MeshPhongMaterial({
      color: tc.ball,
      emissive: tc.rim,
      emissiveIntensity: 0.3,
      shininess: 100,
      specular: tc.glow,
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    scene.add(ball);

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(1.25, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: tc.glow,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Stars
    const starGeo = new THREE.CircleGeometry(0.12, 5);
    const starMat = new THREE.MeshBasicMaterial({ color: tc.star, side: THREE.DoubleSide });
    const starPositions = [
      { x: -0.3, y: 0.3, z: 1.15 },
      { x: 0.3, y: 0.3, z: 1.15 },
      { x: -0.3, y: -0.3, z: 1.15 },
      { x: 0.3, y: -0.3, z: 1.15 },
    ];
    starPositions.forEach(pos => {
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.set(pos.x, pos.y, pos.z);
      ball.add(star);
    });

    // Star outlines
    const outGeo = new THREE.RingGeometry(0.08, 0.14, 16);
    const outMat = new THREE.MeshBasicMaterial({
      color: tc.star,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    starPositions.forEach(pos => {
      const out = new THREE.Mesh(outGeo, outMat);
      out.position.set(pos.x, pos.y, pos.z + 0.01);
      ball.add(out);
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const mainLight = new THREE.DirectionalLight(tc.light, 1.2);
    mainLight.position.set(3, 3, 5);
    scene.add(mainLight);
    const backLight = new THREE.PointLight(tc.rim, 0.8, 10);
    backLight.position.set(-3, -2, -3);
    scene.add(backLight);

    // Particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      const r = 1.8 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i3 + 2] = r * Math.cos(phi);
      pCol[i3] = tc.particle[0];
      pCol[i3 + 1] = tc.particle[1] * (0.6 + Math.random() * 0.4);
      pCol[i3 + 2] = tc.particle[2] * (0.3 + Math.random() * 0.7);
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Animation
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      ball.rotation.y = t * 0.5;
      ball.rotation.x = Math.sin(t * 0.3) * 0.15;
      glowMat.opacity = 0.12 + Math.sin(t * 2) * 0.05;
      glow.scale.setScalar(1 + Math.sin(t * 2) * 0.03);
      particles.rotation.y = t * 0.15;
      particles.rotation.x = t * 0.1;
      ball.position.y = Math.sin(t * 1.5) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
    sceneRef.current = { animationId, renderer };

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
  );
};

export default DragonBall;
