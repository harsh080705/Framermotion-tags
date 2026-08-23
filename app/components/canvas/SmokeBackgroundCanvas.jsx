'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_bgColor;
  uniform vec3 u_smokeColor1;
  uniform vec3 u_smokeColor2;
  uniform float u_opacity;
  uniform float u_speed;
  uniform vec2 u_velocity;
  uniform float u_density;
  uniform float u_scale;
  uniform float u_turbulence;
  uniform float u_vignette;
  uniform float u_grain;
  uniform vec2 u_mouse;
  uniform float u_parallaxStrength;
  uniform float u_seed;

  varying vec2 vUv;

  // Stable 3D Hash
  float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  // 3D Noise
  float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      
      return mix(
          mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
      );
  }

  // Fractal Brownian Motion
  float fbm(vec3 p) {
      float f = 0.0;
      float a = 0.5;
      mat3 rot = mat3(
          0.00,  0.80,  0.60,
         -0.80,  0.36, -0.48,
         -0.60, -0.48,  0.64
      );
      
      for (int i = 0; i < 6; i++) {
          f += a * noise(p);
          p = rot * p * 2.0;
          a *= 0.5;
      }
      return f;
  }

  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv = uv * 2.0 - 1.0;
      uv.x *= u_resolution.x / u_resolution.y;

      float t = (u_time + u_seed * 105.12) * u_speed;
      vec2 drift = (u_time * u_velocity) + (u_mouse * u_parallaxStrength);
      vec2 seedOffset = vec2(sin(u_seed * 12.34), cos(u_seed * 56.78)) * 100.0;
      
      vec2 baseDomain = uv * u_scale + drift + seedOffset;

      // Domain Warping (Turbulence & Wind & Parallax)
      vec3 q = vec3(0.0);
      q.x = fbm(vec3(baseDomain, t));
      q.y = fbm(vec3(baseDomain + vec2(1.0), t));

      vec3 r = vec3(0.0);
      r.x = fbm(vec3(baseDomain + u_turbulence * q.xy + vec2(1.7, 9.2), t * 1.2));
      r.y = fbm(vec3(baseDomain + u_turbulence * q.xy + vec2(8.3, 2.8), t * 1.3));

      float f = fbm(vec3(baseDomain + r.xy, t * 0.5));

      float smokeIntensity = clamp((f * f) * u_density, 0.0, 1.0) * u_opacity;
      
      vec3 smokeStrandColor = mix(u_smokeColor1, u_smokeColor2, smoothstep(0.1, 0.9, f));
      vec3 color = mix(u_bgColor, smokeStrandColor, smokeIntensity);
      
      float vignetteAmt = smoothstep(0.0, 1.5, dot(uv, uv) * u_vignette);
      color = mix(color, color * 0.05, vignetteAmt);

      float noiseGrain = fract(sin(dot(uv, vec2(12.9898, 78.233)) + u_time) * 43758.5453);
      color += (noiseGrain - 0.5) * u_grain;

      gl_FragColor = vec4(color, 1.0);
  }
`;

function SmokePlane({
  bgColor = '#020617',
  smokeColor1 = '#312e81',
  smokeColor2 = '#6366f1',
  opacity = 1.0,
  speed = 0.15,
  velocityX = 0.2,
  velocityY = 0.1,
  density = 4.5,
  scale = 2.2,
  turbulence = 1.2,
  vignette = 0.8,
  grain = 0.03,
  parallaxStrength = 0.5,
  seed = 1.0,
}) {
  const matRef = useRef();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: {
        value: new THREE.Vector2(
          typeof window !== 'undefined' ? window.innerWidth : 1920,
          typeof window !== 'undefined' ? window.innerHeight : 1080
        ),
      },
      u_bgColor: { value: new THREE.Color(bgColor) },
      u_smokeColor1: { value: new THREE.Color(smokeColor1) },
      u_smokeColor2: { value: new THREE.Color(smokeColor2) },
      u_opacity: { value: opacity },
      u_speed: { value: speed },
      u_velocity: { value: new THREE.Vector2(velocityX, velocityY) },
      u_density: { value: density },
      u_scale: { value: scale },
      u_turbulence: { value: turbulence },
      u_vignette: { value: vignette },
      u_grain: { value: grain },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_parallaxStrength: { value: parallaxStrength },
      u_seed: { value: seed },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!matRef.current) return;
    const mat = matRef.current;

    mat.uniforms.u_time.value = state.clock.getElapsedTime();
    mat.uniforms.u_resolution.value.set(
      state.size.width * state.viewport.dpr,
      state.size.height * state.viewport.dpr
    );

    // Lerp mouse coordinates for smooth parallax
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 4 * delta;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 4 * delta;
    mat.uniforms.u_mouse.value.copy(mouseRef.current);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function SmokeBackgroundCanvas({ className = '' }) {
  return (
    <div className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90 ${className}`}>
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          depth: false,
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <SmokePlane />
      </Canvas>
    </div>
  );
}
