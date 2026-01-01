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
