"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Render in NDC directly so the quad always fills the viewport,
    // independent of camera / aspect ratio.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  uniform vec3  uBg;

  // 2D simplex noise (Ashima)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Aspect-correct sampling so the noise doesn't squash horizontally
    // and we always have signal across the full width.
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.5;
    float t = uTime * 0.08;

    // mouse warp
    vec2 m = uMouse * 0.6;
    p += m * 0.4;

    float n1 = snoise(p + vec2(t, t * 0.6));
    float n2 = snoise(p * 1.4 - vec2(t * 0.8, -t));
    float n3 = snoise(p * 0.6 + vec2(-t * 0.4, t * 0.9));

    // Lower thresholds so colored blobs reach the edges of the screen.
    float blob1 = smoothstep(-0.6, 0.9, n1);
    float blob2 = smoothstep(-0.5, 0.85, n2);
    float blob3 = smoothstep(-0.3, 0.75, n3);

    vec3 col = uBg;
    col = mix(col, uColorA, blob1 * 0.70);
    col = mix(col, uColorB, blob2 * 0.55);
    col = mix(col, uColorC, blob3 * 0.40);

    // Very gentle vignette keeps edges readable without creating black bars.
    float vig = smoothstep(1.35, 0.55, distance(uv, vec2(0.5)));
    col *= mix(0.82, 1.0, vig);

    // film grain
    float grain = fract(sin(dot(uv * 1000.0 + t, vec2(12.9898,78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Mesh() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColorA: { value: new THREE.Color("#a855f7") },
      uColorB: { value: new THREE.Color("#7c3aed") },
      uColorC: { value: new THREE.Color("#ec4899") },
      uBg: { value: new THREE.Color("#15101f") },
    }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    const targetX = (state.pointer.x ?? 0);
    const targetY = (state.pointer.y ?? 0);
    mouse.current.x += (targetX - mouse.current.x) * 0.04;
    mouse.current.y += (targetY - mouse.current.y) * 0.04;
    ref.current.uniforms.uMouse.value.copy(mouse.current);
    const size = state.size;
    ref.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderGradient({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[0.75, 1]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
      >
        <Mesh />
      </Canvas>
    </div>
  );
}
