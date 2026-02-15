varying vec3 vColor;
varying float vAlpha;

void main() {
  // Circular shape with soft edges
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  // Soft radial gradient
  float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
  alpha *= alpha; // more concentrated center glow

  gl_FragColor = vec4(vColor, alpha * vAlpha);
}
