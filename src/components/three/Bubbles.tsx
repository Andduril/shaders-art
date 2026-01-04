"use client";

import "@/materials/bubbles.material";

import { BubblesShaderMaterial } from "@/materials/bubbles.material";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";

export type ShaderCompiledEvent = {
  shader: WebGLProgramParametersWithUniforms;
  renderer: WebGLRenderer;
};

type BubblesMaterialProps =
  ComponentPropsWithoutRef<"bubblesShaderMaterial"> & {
    onCompiled?: (e: ShaderCompiledEvent) => void;
    ref: RefObject<InstanceType<typeof BubblesShaderMaterial> | null>;
  };

const BubblesMaterial = ({
  onCompiled,
  ref,
  ...props
}: BubblesMaterialProps) => {
  const firedRef = useRef<boolean>(false);

  useEffect(() => {
    const material = ref.current;
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
  }, [onCompiled, ref]);

  return <bubblesShaderMaterial ref={ref} {...props} />;
};

export default BubblesMaterial;
