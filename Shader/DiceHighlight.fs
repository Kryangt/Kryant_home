
varying vec2 v_uv;
uniform float horizontal;
uniform float vertical;

uniform float random;
void main()
{
    float x = v_uv.x * horizontal;
    float y = v_uv.y * vertical;

    //get the coordinate of lower right corner

    float x_corner = floor(x);
    float y_corner = floor(y);

    float n_uv_x = x - x_corner;
    float n_uv_y = y - y_corner;

    vec2 n_uv = vec2(n_uv_x, n_uv_y);

    //decide which map to loop from

    float index = 0.0;
    float x_index = x_corner + 1.0;

    //if y corner is 0,returns 1 so that buttom are 4 5 6
    float y_index = 3.0 * step(-0.5, -y_corner);

    index = y_index + x_index;

    //determine the color and opacity

    float dc = step(0.0, -abs(index - random));
    float opacity = dc * 0.3;
    vec3 color = vec3(1, 1, 0) * dc;
    
    gl_FragColor = vec4(color, opacity);
}