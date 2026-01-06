"use client";

import { DotShaderMaterial } from "@/materials/dot.material";
import "../materials/dot.material";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function FullscreenQuad() {
  const matRef = useRef<InstanceType<typeof DotShaderMaterial>>(null);
  const { size, gl } = useThree();

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.iResolution.set(size.width, size.height, 1);
  }, [size.width, size.height]);

  useEffect(() => {
    const dom = gl.domElement;
    let down = false;

    const toShadertoyY = (y: number) => size.height - y;

    const move = (e: PointerEvent) => {
      if (!matRef.current) return;
      const r = dom.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      matRef.current.iMouse.x = x;
      matRef.current.iMouse.y = toShadertoyY(y);
    };

    const downFn = (e: PointerEvent) => {
      down = true;
      if (!matRef.current) return;
      const r = dom.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      matRef.current.iMouse.z = x;
      matRef.current.iMouse.w = toShadertoyY(y);
    };

    const upFn = () => {
      down = false;
      if (!matRef.current) return;

      matRef.current.iMouse.z = -Math.abs(matRef.current.iMouse.z);
      matRef.current.iMouse.w = -Math.abs(matRef.current.iMouse.w);
    };

    dom.addEventListener("pointermove", move);
    dom.addEventListener("pointerdown", downFn);
    window.addEventListener("pointerup", upFn);

    return () => {
      dom.removeEventListener("pointermove", move);
      dom.removeEventListener("pointerdown", downFn);
      window.removeEventListener("pointerup", upFn);
    };
  }, [gl.domElement, size.height, size.width]);

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;

    const t = state.clock.elapsedTime % 120;

    m.iTime = t;
    m.iTimeDelta = delta;
    m.iFrameRate = 1 / Math.max(delta, 1e-6);
    m.iFrame = (m.iFrame + 1) | 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <dotShaderMaterial ref={matRef} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas gl={{ antialias: true }}>
        <FullscreenQuad />
      </Canvas>
    </div>
  );
}
