uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorHot;
uniform float uSpeed;
uniform float uPulse;

varying vec3 vWorldPos;

void main() {
  float flow = fract((vWorldPos.x + vWorldPos.z) * 0.42 - uTime * uSpeed);
  float bandA = smoothstep(0.0, 0.08, flow) * (1.0 - smoothstep(0.08, 0.26, flow));
  float bandB = smoothstep(0.55, 0.72, flow) * (1.0 - smoothstep(0.72, 0.9, flow));
  float pulse = 0.5 + 0.5 * sin(uTime * uPulse + vWorldPos.y * 2.2);
  float glow = max(max(bandA, bandB), 0.45 * pulse);
  vec3 color = mix(uColorBase, uColorHot, glow);

  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
