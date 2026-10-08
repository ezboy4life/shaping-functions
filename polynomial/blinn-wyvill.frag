float blinnWyvillCosineApproximation(float x) {
  float x2 = x*x;
  float x4 = x2*x2;
  float x6 = x4*x2;
  
  float fa = (4.0/9.0);
  float fb = (17.0/9.0);
  float fc = (22.0/9.0);
  
  float y = fa*x6 - fb*x4 + fc*x2;
  return y;
}
