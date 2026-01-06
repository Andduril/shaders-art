"use client";

import "@/materials/bubbles.material";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import {
  Material,
  WebGLProgramParametersWithUniforms,
  WebGLRenderer,
} from "three";

export type ShaderCompiledEvent = {
  shader: WebGLProgramParametersWithUniforms;
  renderer: WebGLRenderer;
};

type CustomMaterialProps<TMaterial extends Material = Material> = {
  children: ReactElement<TMaterial>;
  materialRef: RefObject<TMaterial | null>;
  onCompiled?: (e: ShaderCompiledEvent) => void;
};

const CustomMaterial = ({
  children,
  materialRef,
  onCompiled,
}: CustomMaterialProps) => {
  const firedRef = useRef<boolean>(false);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    const previous = material.onBeforeCompile;

    material.onBeforeCompile = (shader, renderer) => {
      previous?.(shader, renderer);

      if (firedRef.current) return;

      firedRef.current = true;

      queueMicrotask(() => {
        onCompiled?.({
          shader,
          renderer,
        });
      });
    };

    return () => {
      material.onBeforeCompile = previous ?? null;
    };
  }, [onCompiled, materialRef]);

  return children;
};

export default CustomMaterial;
