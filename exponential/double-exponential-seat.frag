#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float doubleExponentialSeat(float x, float a){
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = min(max_param_a, max(min_param_a, a)); 

  float y = 0.0;
  if (x <= 0.5) {
    y = (pow(2.0 * x, 1.0 - a)) / 2.0;
  } else {
    y = 1.0 - (pow(2.0 * (1.0 - x), 1.0 - a)) / 2.0;
  }

  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = doubleExponentialSeat(st.x, 0.756);
  vec3 color = vec3(y);
  float pct = plot(st,y);
  color = (1.0 - pct) * color + pct * vec3(0.0,0.0,1.0);
  gl_FragColor = vec4(color,1.0);
}
