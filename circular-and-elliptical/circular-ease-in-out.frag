#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float circularEaseIn (float x){
  float y = 1.0 - sqrt(1.0 - x*x);
  return y;
}

float circularEaseOut (float x){
  float y = sqrt(1.0 - pow((1.0 - x), 2.0));
  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = circularEaseOut(st.x);
  vec3 color = vec3(y);
  float pct = plot(st,y);
  color = (1.0 - pct) * color + pct * vec3(0.0,0.0,1.0);
  gl_FragColor = vec4(color,1.0);
}
