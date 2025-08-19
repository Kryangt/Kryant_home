

varying vec2 v_uv;
uniform float horizontal;
uniform float vertical;

uniform sampler2D one;
uniform sampler2D two;
uniform sampler2D three;
uniform sampler2D four;
uniform sampler2D five;
uniform sampler2D six;

void main(){
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

    index = x_index + y_index;


    //how to turn this into steps
    vec4 color = vec4(0.0);

    color += step(0.0, -abs(index - 1.0)) * texture2D(one, n_uv); 
    color += step(0.0, -abs(index - 2.0)) * texture2D(two, n_uv); 
    color += step(0.0, -abs(index - 3.0)) * texture2D(three, n_uv); 
    color += step(0.0, -abs(index - 4.0)) * texture2D(four, n_uv); 
    color += step(0.0, -abs(index - 5.0)) * texture2D(five, n_uv); 
    color += step(0.0, -abs(index - 6.0)) * texture2D(six, n_uv); 

    gl_FragColor = color;
}