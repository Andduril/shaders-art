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

vec2 randomGradient(vec2 p) {
  float x = dot(p, vec2(123.4, 234.5));
  float y = dot(p, vec2(234.5, 345.6));
  vec2 gradient = vec2(x, y);
  gradient = sin(gradient);
  gradient = gradient * 43758.5453;
  // gradient = sin(gradient);
  gradient = sin(gradient + iTime);
  return gradient;
}

vec2 quintic(vec2 p) {
  return p * p * p * (10.0 + p * (-15.0 + p * 6.0));
}

float perlinNoise(vec2 uv) {
  vec2 gridId = floor(uv);
  vec2 gridUv = fract(uv);

  vec2 bl = gridId + vec2(0.0, 0.0);
  vec2 br = gridId + vec2(1.0, 0.0);
  vec2 tl = gridId + vec2(0.0, 1.0);
  vec2 tr = gridId + vec2(1.0, 1.0);

  vec2 g1 = randomGradient(bl);
  vec2 g2 = randomGradient(br);
  vec2 g3 = randomGradient(tl);
  vec2 g4 = randomGradient(tr);

  vec2 distFromBl = gridUv - vec2(0.0, 0.0);
  vec2 distFromBr = gridUv - vec2(1.0, 0.0);
  vec2 distFromTl = gridUv - vec2(0.0, 1.0);
  vec2 distFromTr = gridUv - vec2(1.0, 1.0);

  float d1 = dot(g1, distFromBl);
  float d2 = dot(g2, distFromBr);
  float d3 = dot(g3, distFromTl);
  float d4 = dot(g4, distFromTr);

  gridUv = quintic(gridUv);

  float bot = mix(d1, d2, gridUv.x);
  float top = mix(d3, d4, gridUv.x);
  float pNoise = mix(bot, top, gridUv.y);

  return pNoise + 0.1;
}

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  float cellSize = 14.0;
  vec2 cell = mod(fragCoord, cellSize);
  vec2 center = vec2(0.5 * cellSize);

  vec2 cellId = floor(fragCoord / cellSize);
  float strength = perlinNoise(cellId * 0.35 + iTime * 0.2);
  strength = strength * 0.5 + 0.5;

  float onThresh = 0.75;
  float offThresh = 0.25;
  strength = step(onThresh, strength);

  float d = length(cell - center);
  float r = 0.5;
  float dotMask = (1.0 - smoothstep(r, r + 2.0, d)) * strength;

  vec3 bg = vec3(0.0);
  vec3 dotColor = vec3(0.102, 0.322, 0.208);

  vec3 color = mix(bg, dotColor, dotMask);
  gl_FragColor = vec4(color, 1.0);
}
