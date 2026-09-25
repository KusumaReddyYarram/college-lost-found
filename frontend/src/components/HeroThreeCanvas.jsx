import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HeroThreeCanvas = () => {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    
    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xF5F1E8, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const burgundyLight = new THREE.PointLight(0x7A303F, 2.5, 30);
    burgundyLight.position.set(-8, 5, -2);
    scene.add(burgundyLight);

    const goldLight = new THREE.PointLight(0xD6B98C, 2.5, 30);
    goldLight.position.set(8, -5, 2);
    scene.add(goldLight);

    // 5. Materials (Burgundy, Deep Charcoal, Soft Champagne, Soft Cream, Muted Rose)
    const indigoMat = new THREE.MeshStandardMaterial({
      color: 0x7A303F, // Burgundy
      roughness: 0.35,
      metalness: 0.2,
      shadowSide: THREE.DoubleSide
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x171717, // Deep Charcoal
      roughness: 0.3,
      metalness: 0.8
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xF5F1E8, // Soft Cream Glass
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xD6B98C, // Soft Champagne Gold
      roughness: 0.2,
      metalness: 0.95
    });

    const emeraldMat = new THREE.MeshStandardMaterial({
      color: 0xB8757F, // Muted Rose
      roughness: 0.3,
      metalness: 0.5
    });

    // Group for all floating 3D objects
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    const items = [];

    // Helper to add floating item with initial transform and animation params
    const addFloatingItem = (mesh, x, y, z, rotX, rotY, rotZ, rotSpeed, floatSpeed, floatAmp) => {
      mesh.position.set(x, y, z);
      mesh.rotation.set(rotX, rotY, rotZ);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      objectsGroup.add(mesh);

      items.push({
        mesh,
        baseY: y,
        rotSpeed,
        floatSpeed,
        floatAmp,
        phase: Math.random() * Math.PI * 2
      });
    };

    // ITEM 1: 🎒 BACKPACK (Compound procedural geometry)
    const backpackGroup = new THREE.Group();
    // Body
    const bagBodyGeo = new THREE.BoxGeometry(1.6, 2.2, 1.0, 4, 4, 4);
    const bagBody = new THREE.Mesh(bagBodyGeo, indigoMat);
    backpackGroup.add(bagBody);
    // Front pocket
    const pocketGeo = new THREE.BoxGeometry(1.3, 1.1, 0.4);
    const pocket = new THREE.Mesh(pocketGeo, darkMat);
    pocket.position.set(0, -0.4, 0.6);
    backpackGroup.add(pocket);
    // Straps loop
    const strapGeo = new THREE.TorusGeometry(0.5, 0.08, 8, 16, Math.PI);
    const strap = new THREE.Mesh(strapGeo, darkMat);
    strap.position.set(0, 1.1, -0.2);
    strap.rotation.x = Math.PI / 2;
    backpackGroup.add(strap);
    addFloatingItem(backpackGroup, -3.8, 1.2, 0, 0.2, 0.4, -0.15, { x: 0.005, y: 0.008 }, 0.0018, 0.35);

    // ITEM 2: 📱 SMARTPHONE
    const phoneGroup = new THREE.Group();
    const phoneBodyGeo = new THREE.BoxGeometry(1.1, 2.2, 0.15);
    const phoneBody = new THREE.Mesh(phoneBodyGeo, darkMat);
    phoneGroup.add(phoneBody);
    // Screen glass
    const screenGeo = new THREE.PlaneGeometry(1.0, 2.0);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x312e81,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.085;
    phoneGroup.add(screen);
    addFloatingItem(phoneGroup, 3.8, 1.8, 1.0, -0.3, -0.5, 0.2, { x: 0.007, y: 0.009 }, 0.0022, 0.4);

    // ITEM 3: 🔑 KEYS & RING
    const keyGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(0.5, 0.06, 12, 24);
    const ring = new THREE.Mesh(ringGeo, brassMat);
    keyGroup.add(ring);
    // Key 1
    const keyBladeGeo = new THREE.BoxGeometry(0.12, 1.2, 0.05);
    const key1 = new THREE.Mesh(keyBladeGeo, brassMat);
    key1.position.set(0.3, -0.6, 0);
    key1.rotation.z = -0.3;
    keyGroup.add(key1);
    // Key 2
    const key2 = new THREE.Mesh(keyBladeGeo, brassMat);
    key2.position.set(-0.3, -0.6, 0.1);
    key2.rotation.z = 0.4;
    keyGroup.add(key2);
    addFloatingItem(keyGroup, -2.8, -2.2, 1.5, 0.4, -0.3, 0.3, { x: 0.009, y: 0.012 }, 0.0025, 0.3);

    // ITEM 4: 💻 LAPTOP
    const laptopGroup = new THREE.Group();
    // Base
    const lapBaseGeo = new THREE.BoxGeometry(2.4, 0.12, 1.6);
    const lapBase = new THREE.Mesh(lapBaseGeo, darkMat);
    laptopGroup.add(lapBase);
    // Screen angled
    const lapScreenGeo = new THREE.BoxGeometry(2.4, 1.5, 0.1);
    const lapScreen = new THREE.Mesh(lapScreenGeo, darkMat);
    lapScreen.position.set(0, 0.7, -0.75);
    lapScreen.rotation.x = -0.3;
    laptopGroup.add(lapScreen);
    // Screen display glow
    const lapDispGeo = new THREE.PlaneGeometry(2.2, 1.3);
    const lapDispMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const lapDisp = new THREE.Mesh(lapDispGeo, lapDispMat);
    lapDisp.position.set(0, 0.7, -0.69);
    lapDisp.rotation.x = -0.3;
    laptopGroup.add(lapDisp);
    addFloatingItem(laptopGroup, 2.9, -1.8, -0.5, 0.3, -0.4, -0.2, { x: 0.004, y: 0.006 }, 0.0016, 0.32);

    // ITEM 5: 🪪 STUDENT ID BADGE
    const badgeGroup = new THREE.Group();
    const cardGeo = new THREE.BoxGeometry(1.4, 2.0, 0.05);
    const card = new THREE.Mesh(cardGeo, glassMat);
    badgeGroup.add(card);
    // Top clip hole
    const holeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16);
    const hole = new THREE.Mesh(holeGeo, darkMat);
    hole.position.set(0, 0.85, 0);
    hole.rotation.x = Math.PI / 2;
    badgeGroup.add(hole);
    addFloatingItem(badgeGroup, 0.5, 3.0, -1.5, -0.2, 0.5, 0.4, { x: 0.006, y: 0.008 }, 0.002, 0.28);

    // ITEM 6: 🧴 WATER BOTTLE
    const bottleGroup = new THREE.Group();
    const botBodyGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.8, 24);
    const botBody = new THREE.Mesh(botBodyGeo, emeraldMat);
    bottleGroup.add(botBody);
    const botCapGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 24);
    const botCap = new THREE.Mesh(botCapGeo, darkMat);
    botCap.position.y = 1.0;
    bottleGroup.add(botCap);
    addFloatingItem(bottleGroup, -0.8, -2.8, 0.5, 0.2, 0.1, -0.3, { x: 0.008, y: 0.007 }, 0.0024, 0.35);

    // 6. Particle Field
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 20;
      particlePos[i + 1] = (Math.random() - 0.5) * 16;
      particlePos[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD6B98C,
      size: 0.08,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse interaction parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Parallax camera sway
      camera.position.x = mouseX * 1.2;
      camera.position.y = mouseY * 1.2;
      camera.lookAt(0, 0, 0);

      // Animate floating items
      items.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * 1.5 + item.phase) * item.floatAmp;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-center bg-slate-900/50 rounded-3xl border border-slate-800">
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 text-2xl font-bold">
            🎒 📱 🔑
          </div>
          <p className="text-xs text-slate-400">WebGL 3D visual preview fallback active</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="w-full h-[520px] lg:h-[620px] relative overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none z-10" />
    </div>
  );
};

export default HeroThreeCanvas;
