
varying vec2 v_uv;
uniform vec3 color;
void main()
{
    gl_FragColor = vec4(color, 1);
}