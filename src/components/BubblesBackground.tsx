"use client";

import { BubblesShaderMaterial } from "@/materials/bubbles.material";
import "../materials/bubbles.material";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import BubblesMaterial from "./three/Bubbles";

export type FullscreenQuadProps = {
  onReady?: () => void;
};

const FullscreenQuad = ({ onReady }: FullscreenQuadProps) => {
  const matRef = useRef<InstanceType<typeof BubblesShaderMaterial>>(null);
  const { size, gl } = useThree();

  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.needsUpdate = true;
  }, []);

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

  const handleCompiled = () => {
    onReady!();
  };

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;

    const t = state.clock.elapsedTime;

    m.iTime = t;
    m.iTimeDelta = delta;
    m.iFrameRate = 1 / Math.max(delta, 1e-6);
    m.iFrame = (m.iFrame + 1) | 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <BubblesMaterial
        ref={matRef}
        depthTest={false}
        depthWrite={false}
        onCompiled={handleCompiled}
      />
    </mesh>
  );
};

const BubblesBackground = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none isolate">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-out
          ${show ? "opacity-100" : "opacity-0"}`}
      >
        <Canvas gl={{ antialias: true }}>
          <FullscreenQuad onReady={() => setShow(true)} />
        </Canvas>
      </div>
    </div>
  );
};

export default BubblesBackground;
