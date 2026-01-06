"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import fragmentShader from "../shaders/dot.glsl";
import { INITIAL_UNIFORMS } from "@/utils/uniforms";
import { vertexShader } from "@/utils/shaders";

export const DotShaderMaterial = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ DotShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    dotShaderMaterial: import("@react-three/fiber").ThreeElement<
      typeof DotShaderMaterial
    >;
  }
}
