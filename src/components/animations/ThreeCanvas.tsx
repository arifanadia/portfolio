"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  className?: string;
}

export default function ThreeCanvas({ className = "" }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. SCENE SETUP ─────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── 2. ETHEREAL PARTICLE FIELD ─────────────────────────────
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color("#c6ff2e");
    const colorPurple = new THREE.Color("#7c4dff");
    const colorWhite = new THREE.Color("#e4e4e7");

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const rand = Math.random();
      const col = rand > 0.7 ? colorLime : rand > 0.35 ? colorPurple : colorWhite;
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Crisp circular glow texture
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(255,255,255,0.7)");
        gradient.addColorStop(0.6, "rgba(255,255,255,0.15)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particles);

    // ── 3. ARCHITECTURAL WAVE WIREFRAME GRID ───────────────────
    const gridCols = 40;
    const gridRows = 24;
    const gridGeo = new THREE.PlaneGeometry(85, 45, gridCols - 1, gridRows - 1);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x7c4dff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.6;
    gridMesh.position.set(0, -14, -5);
    scene.add(gridMesh);

    const initialPositions = (gridGeo.attributes.position.array as Float32Array).slice();

    // ── 4. SMOOTH MOUSE PARALLAX ───────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── 5. RESIZE ──────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener("resize", onResize);

    // ── 6. ANIMATION LOOP ──────────────────────────────────────
    let animationId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const onVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) clock.start();
      else clock.stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Lerp mouse
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;

      camera.position.x = targetX * 6;
      camera.position.y = -targetY * 4;
      camera.lookAt(0, 0, 0);

      // Subtle particle float
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.03) * 0.05;

      // Gentle undulating architectural wave on grid
      const pos = gridGeo.attributes.position;
      const count = pos.count;
      for (let i = 0; i < count; i++) {
        const u = i % gridCols;
        const v = Math.floor(i / gridCols);
        const wave = Math.sin(u * 0.3 + t * 1.2) * Math.cos(v * 0.25 + t * 0.8) * 1.6;
        pos.setZ(i, initialPositions[i * 3 + 2] + wave);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // ── 7. CLEANUP ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);

      particleGeo.dispose();
      particleMaterial.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
