uniform sampler2D uMaskTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseSpeed;
uniform float uNoiseThreshold;
uniform float uNoiseSoftness;
uniform float uOpacity;
uniform vec2 uPointerScreenPos;
uniform float uPointerRadius;
uniform float uPointerFeather;
uniform float uPointerPeakBoost;
uniform float uPointerStrength;

varying vec3 vWorldPos;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise3d(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  float n000 = hash(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, u.x);
  float nx10 = mix(n010, n110, u.x);
  float nx01 = mix(n001, n101, u.x);
  float nx11 = mix(n011, n111, u.x);
  float nxy0 = mix(nx00, nx10, u.y);
  float nxy1 = mix(nx01, nx11, u.y);

  return mix(nxy0, nxy1, u.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += noise3d(p) * amplitude;
    p = p * 2.05 + vec3(7.1, 11.7, 3.6);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 maskColor = texture2D(uMaskTexture, uv).rgb;
  float maskSignal = max(max(maskColor.r, maskColor.g), maskColor.b);
  if (maskSignal < 0.00001) discard;

  float contentMask = smoothstep(0.03, 0.2, maskSignal);
  float n = fbm(vWorldPos * uNoiseScale + vec3(0.0, uTime * uNoiseSpeed, 0.0));
  float pointerDistance = distance(uv, uPointerScreenPos);
  float pointerRegion = 1.0 - smoothstep(uPointerRadius, uPointerRadius + uPointerFeather, pointerDistance);
  float peakedNoise = max(n - (pointerRegion * uPointerPeakBoost * uPointerStrength), 0.0);
  float reveal = 1.0 - smoothstep(uNoiseThreshold - uNoiseSoftness, uNoiseThreshold + uNoiseSoftness, peakedNoise);
  float alpha = reveal * contentMask * uOpacity;

  gl_FragColor = vec4(maskColor, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
