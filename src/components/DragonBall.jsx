import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DragonBall = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Dragon Ball (orange sphere with star pattern)
    const ballGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0xff8c00,
      emissive: 0x663300,
      emissiveIntensity: 0.3,
      shininess: 100,
      specular: 0xffff00,
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.25, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Stars (4 stars on the front)
    const starGeometry = new THREE.CircleGeometry(0.12, 5);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xcc0000, side: THREE.DoubleSide });
    const starPositions = [
      { x: -0.3, y: 0.3, z: 1.15 },
      { x: 0.3, y: 0.3, z: 1.15 },
      { x: -0.3, y: -0.3, z: 1.15 },
      { x: 0.3, y: -0.3, z: 1.15 },
    ];

    starPositions.forEach(pos => {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(pos.x, pos.y, pos.z);
      ball.add(star);
    });

    // Orange circle outlines around stars
    const outlineGeometry = new THREE.RingGeometry(0.08, 0.14, 16);
    const outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0xcc4400,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });

    starPositions.forEach(pos => {
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outline.position.set(pos.x, pos.y, pos.z + 0.01);
      ball.add(outline);
    });

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (golden)
    const mainLight = new THREE.DirectionalLight(0xffd700, 1.2);
    mainLight.position.set(3, 3, 5);
    scene.add(mainLight);

    // Backlight for rim effect
    const backLight = new THREE.PointLight(0xff6600, 0.8, 10);
    backLight.position.set(-3, -2, -3);
    scene.add(backLight);

    // Floating ki energy particles
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 1.8 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Gold to orange color range
      colors[i3] = 1;
      colors[i3 + 1] = 0.6 + Math.random() * 0.4;
      colors[i3 + 2] = Math.random() * 0.3;

      sizes[i] = 0.02 + Math.random() * 0.04;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate ball
      ball.rotation.y = elapsed * 0.5;
      ball.rotation.x = Math.sin(elapsed * 0.3) * 0.15;

      // Pulsing glow
      const pulse = 0.12 + Math.sin(elapsed * 2) * 0.05;
      glowMaterial.opacity = pulse;
      const glowScale = 1 + Math.sin(elapsed * 2) * 0.03;
      glow.scale.setScalar(glowScale);

      // Particle rotation
      particles.rotation.y = elapsed * 0.15;
      particles.rotation.x = elapsed * 0.1;

      // Float the ball slightly
      ball.position.y = Math.sin(elapsed * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = { animationId, renderer };

    return () => {
      window.removeEventListener('resize', handleResize);
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
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    />
  );
};

export default DragonBall;
