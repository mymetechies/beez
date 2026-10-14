/**
 * BeeZ Premium Blends - Three.js 3D Interactive Hero Scene
 * Renders an interactive luxury 3D oil bottle composition with interactive tilt,
 * realistic lighting, shadows, and floating botanical leaf & golden droplet particles.
 */

(function initThreeHero() {
  const container = document.getElementById('hero-3d-container');
  if (!container) return;

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Falling back to CSS image parallax.');
    return;
  }

  let scene, camera, renderer, bottleGroup, particlesGroup;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 550;

  // 1. Scene Setup
  scene = new THREE.Scene();

  // 2. Camera Setup
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0.5, 9);

  // 3. Renderer Setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 4. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  scene.add(mainLight);

  const blueFillLight = new THREE.PointLight(0x5F6330, 1.2, 20);
  blueFillLight.position.set(-6, -2, 4);
  scene.add(blueFillLight);

  const goldRimLight = new THREE.PointLight(0xD5A33A, 1.5, 20);
  goldRimLight.position.set(4, 5, -3);
  scene.add(goldRimLight);

  // 5. Build 3D Luxury Bottle Composition Group
  bottleGroup = new THREE.Group();
  scene.add(bottleGroup);

  // Amber Glass Bottle Body Material
  const amberGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2b1d0c,
    transmission: 0.65,
    opacity: 0.95,
    transparent: true,
    roughness: 0.15,
    metalness: 0.1,
    ior: 1.5,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });

  // Golden Cap Material
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd5a33a,
    metalness: 0.85,
    roughness: 0.2,
    envMapIntensity: 1.2
  });

  // Label Material (Deep Olive with Gold)
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0x3F4724,
    roughness: 0.35,
    metalness: 0.2
  });

  // Liquid Inside Material
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xe6a100,
    transmission: 0.8,
    opacity: 0.9,
    transparent: true,
    roughness: 0.1,
    ior: 1.45
  });

  // Bottle Body (Cylinder)
  const bodyGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.2, 64);
  const bodyMesh = new THREE.Mesh(bodyGeo, amberGlassMat);
  bodyMesh.castShadow = true;
  bodyMesh.position.y = 0;
  bottleGroup.add(bodyMesh);

  // Inner Liquid
  const liquidGeo = new THREE.CylinderGeometry(1.12, 1.12, 2.8, 48);
  const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
  liquidMesh.position.y = -0.15;
  bottleGroup.add(liquidMesh);

  // Bottle Shoulder / Curve
  const shoulderGeo = new THREE.CylinderGeometry(0.5, 1.2, 0.8, 64);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, amberGlassMat);
  shoulderMesh.position.y = 2.0;
  bottleGroup.add(shoulderMesh);

  // Bottle Neck
  const neckGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.6, 32);
  const neckMesh = new THREE.Mesh(neckGeo, amberGlassMat);
  neckMesh.position.y = 2.7;
  bottleGroup.add(neckMesh);

  // Gold Ring Collar
  const ringGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.2, 32);
  const ringMesh = new THREE.Mesh(ringGeo, goldMat);
  ringMesh.position.y = 3.0;
  bottleGroup.add(ringMesh);

  // Black Rubber Dropper Cap Top
  const rubberMat = new THREE.MeshStandardMaterial({ color: 0x111622, roughness: 0.8 });
  const bulbGeo = new THREE.SphereGeometry(0.45, 32, 16);
  bulbGeo.scale(1, 1.3, 1);
  const bulbMesh = new THREE.Mesh(bulbGeo, rubberMat);
  bulbMesh.position.y = 3.6;
  bottleGroup.add(bulbMesh);

  // Brand Label Cylinder Wrapper
  const labelGeo = new THREE.CylinderGeometry(1.21, 1.21, 1.8, 64, 1, true, -Math.PI * 0.75, Math.PI * 1.5);
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.y = 0.0;
  bottleGroup.add(labelMesh);

  // Gold Label Emblem Band
  const emblemGeo = new THREE.CylinderGeometry(1.215, 1.215, 0.5, 64, 1, true, -Math.PI * 0.35, Math.PI * 0.7);
  const emblemMesh = new THREE.Mesh(emblemGeo, goldMat);
  emblemMesh.position.y = 0.2;
  bottleGroup.add(emblemMesh);

  // Floating Pedestal Shadow Base
  const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -2.2;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // 6. Floating Particles (Golden droplets & botanical leaf fragments)
  particlesGroup = new THREE.Group();
  scene.add(particlesGroup);

  const particleCount = 35;
  const particleGeometries = [
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.DodecahedronGeometry(0.12, 0),
    new THREE.TorusGeometry(0.1, 0.04, 8, 16)
  ];

  const goldParticleMat = new THREE.MeshStandardMaterial({
    color: 0xD5A33A,
    roughness: 0.2,
    metalness: 0.9,
    emissive: 0x443000
  });

  const leafParticleMat = new THREE.MeshStandardMaterial({
    color: 0x5F6330,
    roughness: 0.6,
    metalness: 0.1
  });

  for (let i = 0; i < particleCount; i++) {
    const geo = particleGeometries[i % particleGeometries.length];
    const mat = (i % 2 === 0) ? goldParticleMat : leafParticleMat;
    const mesh = new THREE.Mesh(geo, mat);

    mesh.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 4
    );

    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const scale = 0.5 + Math.random() * 0.8;
    mesh.scale.set(scale, scale, scale);

    // Save custom velocity data
    mesh.userData = {
      speedY: 0.003 + Math.random() * 0.006,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      initialX: mesh.position.x
    };

    particlesGroup.add(mesh);
  }

  // Position bottle center
  bottleGroup.position.set(0, -0.4, 0);

  // 7. Mouse & Touch Parallax Controls
  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX = x;
    mouseY = y;
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // 8. Resize Handler
  function onWindowResize() {
    if (!container) return;
    const newW = container.clientWidth || 500;
    const newH = container.clientHeight || 550;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }
  window.addEventListener('resize', onWindowResize);

  // 9. Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth bottle floating bob
    bottleGroup.position.y = -0.4 + Math.sin(elapsedTime * 1.5) * 0.15;
    bottleGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.04;

    // Mouse parallax lerp
    targetRotationY = mouseX * 0.8;
    targetRotationX = mouseY * 0.5;

    bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.05;
    bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.05;

    // Animate floating botanical & gold particles
    particlesGroup.children.forEach((p, idx) => {
      p.position.y += p.userData.speedY;
      p.position.x = p.userData.initialX + Math.sin(elapsedTime + idx) * 0.2;
      p.rotation.x += p.userData.rotSpeed;
      p.rotation.y += p.userData.rotSpeed;

      // Wrap particles around bounds
      if (p.position.y > 4) {
        p.position.y = -3.5;
      }
    });

    renderer.render(scene, camera);
  }

  animate();

})();
