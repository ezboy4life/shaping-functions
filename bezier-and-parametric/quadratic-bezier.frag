#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
  return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

float quadraticBezier (float x, float a, float b){
  // adapted from BEZMATH.PS (1993)
  // by Don Lancaster, SYNERGETICS Inc. 
  // http://www.tinaja.com/text/bezmath.html

  float epsilon = 0.00001;
  a = max(0.0, min(1.0, a)); 
  b = max(0.0, min(1.0, b)); 
  if (a == 0.5){
    a += epsilon;
  }
  
  // solve t from x (an inverse operation)
  float om2a = 1.0 - 2.0*a;
  float t = (sqrt(a*a + om2a*x) - a)/om2a;
  float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
  return y;
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = quadraticBezier(st.x, 0.087, 0.893);
  vec3 color = vec3(y);
  float pct = plot(st,y);
  color = (1.0 - pct) * color + pct * vec3(0.0,0.0,1.0);
  gl_FragColor = vec4(color,1.0);
}
