'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DESTINATIONS, DestinationHotspot } from '../lib/data';
import { Compass, MapPin, Sparkles, Navigation, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

export const Canvas3DMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<DestinationHotspot>(DESTINATIONS[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<DestinationHotspot | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 35);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Globe Terrain Mesh (Stylized Moroccan Topography)
    const geometry = new THREE.SphereGeometry(12, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(11.8, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.08,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Particles Cloud (Desert Dust)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 1200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 60;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Destination 3D Markers on Sphere
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Map 2D coordinates to 3D sphere positions
    DESTINATIONS.forEach((dest) => {
      const phi = ((100 - dest.coordinates.y) / 100) * Math.PI - Math.PI / 2;
      const theta = (dest.coordinates.x / 100) * Math.PI * 2 - Math.PI;

      const radius = 12.2;
      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = radius * Math.cos(phi) * Math.sin(theta);

      // Point Mesh
      const markerGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: dest.id === selectedHotspot.id ? 0xf59e0b : 0x38bdf8,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(x, y, z);
      marker.userData = { destination: dest };

      // Outer Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.5, 0.7, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, y, z);
      ring.lookAt(0, 0, 0);
      marker.add(ring);

      markersGroup.add(marker);
    });

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      globe.rotation.y += 0.0015;
      core.rotation.y += 0.0015;
      markersGroup.rotation.y += 0.0015;
      particleSystem.rotation.y -= 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedHotspot]);

  return (
    <div className="relative w-full rounded-3xl border border-amber-500/20 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-6 z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300">
          <Compass className="h-3.5 w-3.5 text-amber-400 animate-spin-slow" />
          <span>Interactive Moroccan Geography</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-amber-100">
          Explore Hotspots Across the Kingdom
        </h2>

        <p className="text-xs sm:text-sm text-amber-200/80 font-light leading-relaxed">
          From the vibrant souks of Marrakech to the towering Sahara dunes of Merzouga. Select a destination to inspect travel times and royal itineraries.
        </p>

        {/* Selected Hotspot Card */}
        <div className="rounded-2xl border border-amber-500/30 bg-slate-950/90 p-5 space-y-4 shadow-xl">
          <div className="relative h-44 w-full overflow-hidden rounded-xl">
            <img
              src={selectedHotspot.image}
              alt={selectedHotspot.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 rounded-full border border-amber-400/40 bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-amber-300">
              {selectedHotspot.category} Hotspot
            </span>
            <span className="absolute bottom-3 left-3 font-serif text-xl font-bold text-white">
              {selectedHotspot.name} <span className="text-amber-400 font-sans text-xs ml-2">({selectedHotspot.arabicName})</span>
            </span>
          </div>

          <p className="text-xs text-amber-200/80 font-light leading-relaxed line-clamp-2">
            {selectedHotspot.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-amber-500/15 pt-3">
            <div>
              <span className="text-amber-400/60 uppercase font-semibold block">Drive From Marrakech</span>
              <span className="font-bold text-amber-100">{selectedHotspot.driveFromMarrakech}</span>
            </div>
            <div>
              <span className="text-amber-400/60 uppercase font-semibold block">Recommended Stay</span>
              <span className="font-bold text-amber-100">{selectedHotspot.recommendedDuration}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              href={`/destination/${selectedHotspot.id}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-slate-950 hover:brightness-110 transition"
            >
              <Eye className="h-4 w-4" />
              <span>Inspect {selectedHotspot.name} Guide</span>
            </Link>
          </div>
        </div>

        {/* Quick Hotspot Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedHotspot(dest)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                selectedHotspot.id === dest.id
                  ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'border-amber-500/15 bg-slate-950/60 text-slate-300 hover:border-amber-400/40 hover:text-amber-200'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right 3D Canvas Column */}
      <div className="lg:col-span-7 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center">
        <div ref={containerRef} className="h-full w-full" />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-950/80 px-3.5 py-1.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-amber-400 animate-pulse" />
          <span>Three.js Realtime Moroccan Globe</span>
        </div>
      </div>
    </div>
  );
};
