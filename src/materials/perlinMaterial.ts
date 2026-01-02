"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

import fragmentShader from "../shaders/perlin.glsl";
import { Vector3 } from "three";
import { Vector4 } from "three";
import { ShaderToyUniforms } from "@/utils/uniforms";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const INITIAL_UNIFORMS: ShaderToyUniforms = {
  iResolution: new Vector3(1, 1, 1),
  iTime: 0,
  iTimeDelta: 0,
  iFrameRate: 0,
  iFrame: 0,
  iChannelTime: new Float32Array(4),
  iChannelResolution: [
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
  ],
  iMouse: new Vector4(0, 0, 0, 0),

  iChannel0: null,
  iChannel1: null,
  iChannel2: null,
  iChannel3: null,
};

export const PerlinShaderMaterial = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ PerlinShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    perlinShaderMaterial: import("@react-three/fiber").ThreeElement<
      typeof PerlinShaderMaterial
    >;
  }
}
