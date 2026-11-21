"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Interactive3DObjectProps {
  className?: string;
  size?: number;
}

export default function Interactive3DObject({
  className = "",
  size = 280,
}: Interactive3DObjectProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Geometry: Dodecahedron inside Wireframe Octahedron
    const group = new THREE.Group();

    // 1. Outer wireframe dodecahedron
    const outerGeo = new THREE.DodecahedronGeometry(2.4, 0);
    const outerWire = new THREE.WireframeGeometry(outerGeo);
    const outerLine = new THREE.LineSegments(
      outerWire,
      new THREE.LineBasicMaterial({
        color: 0xc6ff2e, // Lime
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    );
    group.add(outerLine);

    // 2. Inner floating glowing icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7c4dff, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Central glowing nucleus point
    const coreGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    scene.add(group);

    // Interactive Drag / Hover Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocity = { x: 0.005, y: 0.005 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      velocity = { x: deltaY * 0.005, y: deltaX * 0.005 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      velocity = { x: deltaY * 0.005, y: deltaX * 0.005 };
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Natural gentle spin & floating bob
        group.rotation.y += velocity.y + 0.008;
        group.rotation.x += velocity.x + 0.004;

        // Friction slow down
        velocity.x *= 0.95;
        velocity.y *= 0.95;
      }

      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 1.5) * 0.15;
      innerMesh.rotation.y = -t * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);

      outerGeo.dispose();
      outerWire.dispose();
      (outerLine.material as THREE.Material).dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={`cursor-grab active:cursor-grabbing select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      title="Click and drag to rotate in 3D"
    />
  );
}
