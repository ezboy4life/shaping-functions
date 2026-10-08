#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float logisticSigmoid (float x, float a){
  // n.b.: this Logistic Sigmoid has been normalized.
  float epsilon = 0.0001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = max(min_param_a, min(max_param_a, a));
  a = (1.0/(1.0-a) - 1.0);

  float A = 1.0 / (1.0 + exp(0.0 -((x-0.5)*a*2.0)));
  float B = 1.0 / (1.0 + exp(a));
  float C = 1.0 / (1.0 + exp(0.0-a)); 
  float y = (A-B)/(C-B);
  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = logisticSigmoid(st.x, 0.987);
  vec3 color = vec3(y);
  float pct = plot(st,y);
  color = (1.0 - pct) * color + pct * vec3(0.0,0.0,1.0);
  gl_FragColor = vec4(color,1.0);
}
