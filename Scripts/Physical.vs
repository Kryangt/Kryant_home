

varying vec3 vNormal;
varying vec3 vView;


void main()
{
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-(viewPosition.xyz));

    gl_Position = projectionMatrix * viewPosition;
}