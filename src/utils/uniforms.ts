import { Texture, Vector3, Vector4 } from "three";

export type ShaderToyUniforms = {
  iResolution: Vector3; // vec3
  iTime: number; // float
  iTimeDelta: number; // float
  iFrameRate: number; // float
  iFrame: number; // int
  iChannelTime: Float32Array; // float[4]
  iChannelResolution: Vector3[]; // vec3[4]
  iMouse: Vector4; // vec4

  // (optionnel mais fréquent ShaderToy)
  iChannel0?: Texture | null;
  iChannel1?: Texture | null;
  iChannel2?: Texture | null;
  iChannel3?: Texture | null;
};

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
