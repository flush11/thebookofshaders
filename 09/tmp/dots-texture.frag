// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rows = 100.0;

vec2 brickTile(vec2 _st, float _zoom){
  _st *= _zoom;
  if (fract(_st.y * 0.5) > 0.5){
      _st.x += 0.5;
  }
  return fract(_st);
}

float circle(vec2 _st, float _radius){
  vec2 pos = vec2(0.5)-_st;
  _radius *= 0.75;
  return 1.-smoothstep(_radius-(_radius*0.01),_radius+(_radius*0.01),dot(pos,pos)*3.14);
}

void main(){

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec2 pos = st;

  st = brickTile(st,500.);
  
  float pattern = texture2D(u_tex0,pos).r;
  pattern = circle(st, pattern);

  gl_FragColor = vec4(1.-vec3(pattern),1.0);
}