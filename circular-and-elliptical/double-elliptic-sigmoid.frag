#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float doubleEllipticSigmoid (float x, float a, float b){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 
  b = max(min_param_b, min(max_param_b, b));
 
  float y = 0.0;
  if (x<=a){
    y = b * (1.0 - (sqrt(pow(a, 2.0) - pow(x, 2.0))/a));
  } else {
    y = b + ((1.0-b)/(1.0-a))*sqrt(pow((1.0-a), 2.0) - pow((x-1.0), 2.0));
  }
  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = doubleEllipticSigmoid(st.x, 0.366, 0.228);
  vec3 color = vec3(y);
  float pct = plot(st,y);
  color = (1.0 - pct) * color + pct * vec3(0.0,0.0,1.0);
  gl_FragColor = vec4(color,1.0);
}
