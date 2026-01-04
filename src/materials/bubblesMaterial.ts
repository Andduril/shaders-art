// "use client";

// import { shaderMaterial } from "@react-three/drei";
// import { extend } from "@react-three/fiber";

// import fragmentShader from "../shaders/bubbles.glsl";
// import { Vector3, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
// import { Vector4 } from "three";
// import { ShaderToyUniforms } from "@/utils/uniforms";
// import { vertexShader } from "@/utils/shaders";
// import { JSX } from "react";

// export const INITIAL_UNIFORMS: ShaderToyUniforms = {
//   iResolution: new Vector3(1, 1, 1),
//   iTime: 0,
//   iTimeDelta: 0,
//   iFrameRate: 0,
//   iFrame: 0,
//   iChannelTime: new Float32Array(4),
//   iChannelResolution: [
//     new Vector3(0, 0, 0),
//     new Vector3(0, 0, 0),
//     new Vector3(0, 0, 0),
//     new Vector3(0, 0, 0),
//   ],
//   iMouse: new Vector4(0, 0, 0, 0),

//   iChannel0: null,
//   iChannel1: null,
//   iChannel2: null,
//   iChannel3: null,
// };

// const BaseBubblesShaderMaterial = shaderMaterial(
//   INITIAL_UNIFORMS,
//   vertexShader,
//   fragmentShader
// );

// export type BubblesCompiledEvent = {
//   shader: WebGLProgramParametersWithUniforms;
//   renderer: WebGLRenderer;
// };

// type BubblesShaderMaterialProps = Omit<JSX.IntrinsicElements['bubblesShaderMaterial'], 'ref'> & {
//   onCompiled?: (e: BubblesCompiledEvent) => void;
// };

// const BubblesMa

// extend({ BubblesShaderMaterial });

// declare module "@react-three/fiber" {
//   interface ThreeElements {
//     bubblesShaderMaterial: import("@react-three/fiber").ThreeElement<
//       typeof BubblesShaderMaterial & {
//         onCompiled?: (e: BubblesCompiledEvent) => void;
//       }
//     >;
//   }
// }
