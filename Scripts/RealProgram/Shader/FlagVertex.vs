
uniform float time;
uniform float amplitude;
uniform float frequency;

varying vec2 v_uv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * 
    vec4( position + vec3(0, 0, amplitude * sin(time * frequency + uv.x * 6.0)), 1.0 );

    v_uv  = uv;
}   
