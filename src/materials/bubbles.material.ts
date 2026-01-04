"use client";

import { vertexShader } from "@/utils/shaders";
import { shaderMaterial } from "@react-three/drei";
import { Vector3, Vector4 } from "three";
import fragmentShader from "../shaders/bubbles.glsl";
import { extend } from "@react-three/fiber";
import { ShaderToyUniforms } from "@/utils/uniforms";

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

export const BubblesShaderMaterial = shaderMaterial(
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
);

extend({ BubblesShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    bubblesShaderMaterial: import("@react-three/fiber").ThreeElement<
      typeof BubblesShaderMaterial
    >;
  }
}
