precision highp float;
precision highp int;

uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform float iFrameRate;
uniform int iFrame;
uniform float iChannelTime[4];
uniform vec3 iChannelResolution[4];
uniform vec4 iMouse;

varying vec2 vUv;

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  float cellSize = 14.0;
  vec2 cell = mod(fragCoord, cellSize);
  vec2 center = vec2(0.5 * cellSize);

  float d = length(cell - center);
  float r = 0.5;
  float dotMask = 1.0 - smoothstep(r, r + 2.0, d);

  vec3 bg = vec3(0.0);
  vec3 dotColor = vec3(0.102, 0.322, 0.208); // vert

  vec3 color = mix(bg, dotColor, dotMask);
  gl_FragColor = vec4(color, 1.0);
}
