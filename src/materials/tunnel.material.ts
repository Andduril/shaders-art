"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import fragmentShader from "../shaders/tunnel.glsl";
import { INITIAL_UNIFORMS } from "@/utils/uniforms";
import { vertexShader } from "@/utils/shaders";

export const TunnelShaderMaterial = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ TunnelShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    tunnelShaderMaterial: import("@react-three/fiber").ThreeElement<
      typeof TunnelShaderMaterial
    >;
  }
}
