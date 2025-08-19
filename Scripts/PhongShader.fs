


varying vec3 vView;
varying vec3 vNormal;

// Assume a fixed light direction
uniform vec3 lightDirection1; 
uniform vec3 lightDirection2; 
// Material roughness
uniform float roughness;

uniform float red;
uniform float green;
uniform float blue;
uniform vec3 ambientIntensity; // Corrected: Ambient is a color
uniform vec3 lightColor1;
uniform float lightIntensity1;
uniform vec3 lightColor2;
uniform float lightIntensity2;
uniform float metalness;
uniform float shininess;


vec3 diffuseLight(vec3 N, vec3 L, vec3 lightColor, vec3 objectColor, float intensity)
{
    float diffuseFactor = max(dot(N, L), 0.0);
    vec3 diffuse = diffuseFactor * lightColor * intensity;
    return objectColor * diffuse;
}

void main()
{
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    vec3 L1 = normalize(lightDirection1);
    vec3 L2 = normalize(lightDirection2);
    vec3 H1 = normalize(V + L1); // Halfway vector
    vec3 H2 = normalize(V + L2); 

    vec3 objectColor = vec3(red / 128.0, green / 128.0, blue / 128.0);

    vec3 specular1 = lightColor1 * lightIntensity1 * pow(max(dot(N,H1),0.0), shininess);
    vec3 specular2 = lightColor2 * lightIntensity2 * pow(max(dot(N,H2),0.0), shininess);
    vec3 ambient = objectColor * ambientIntensity;

    vec3 finalColor = ambient + objectColor * specular1 + objectColor * specular2 + diffuseLight(N, L1, lightColor1, objectColor, lightIntensity1) + diffuseLight(N, L2, lightColor2, objectColor, lightIntensity2);

    gl_FragColor = vec4(finalColor, 1.0);
}