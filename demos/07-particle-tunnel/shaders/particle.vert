uniform float uTime;
uniform float uPixelRatio;

attribute float aSize;
attribute float aSpeed;
attribute float aOffset;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Move particles along Z axis (toward camera)
  float z = mod(pos.z + uTime * aSpeed * 0.5, 200.0) - 100.0;
  pos.z = z;

  // Slight spiral motion
  float angle = uTime * 0.1 * aSpeed + aOffset;
  pos.x += sin(angle) * 2.0;
  pos.y += cos(angle) * 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  // Size attenuation by distance
  float dist = -mvPosition.z;
  float size = aSize * uPixelRatio * (120.0 / max(dist, 1.0));

  gl_PointSize = max(size, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vColor = aColor;

  // Fade based on distance (close = bright, far = dim)
  float fadeFar = smoothstep(100.0, 50.0, dist);
  float fadeNear = smoothstep(0.0, 10.0, dist);
  vAlpha = fadeFar * fadeNear;
}
