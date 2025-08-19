

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
//pi
const float pi = 3.1415926;

//obtain the relative density of microfacets per solid angle whose normal is aligned with H

//GGX: a formula to calculate distribution statistically
//D(H,N) = (roughness) ^ 2 / pi * ((N dot H)^2 * (roughness^2 - 1) + 1) ^2

float DistributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float numerator = a;
    float denominator = (dot(N, H) * dot(N, H) * (a - 1.0) + 1.0);
    denominator = denominator * denominator;
    denominator = denominator * pi;
    return numerator / denominator;
}


//formula: G(v) = 2 * (N * V) / ((N*V) + sqrt(roughness^2 + (1- roughness^2)*(N*V)^2))
//A complete Geometric attentuaqtion contains two part G(V, L) = G(V) * G(L)
//each of then represents visibility from view and visibility from light
float smithGeometric(vec3 N, vec3 V, float roughness) {
    float ndotv = max(dot(N, V), 0.0);  //if the dot product is negative, then is invisible
    float a = roughness * roughness; 
    float denominator = ndotv + sqrt(a + (1.0 - a) * ndotv * ndotv);
    float numerator = 2.0 * ndotv;
    return numerator / denominator;
}

//formula: F = F_0 + (1-F0) * pow(1.0 - cos(theta), 5.0);
//How to get F0? linear interpolation between surface color and base F0
vec3 fresnelSchlick(float costheta, vec3 baseColor, float metalness)
{
    vec3 F0_Mixed = mix(vec3(0.04), baseColor, metalness);
    return F0_Mixed + (1.0-F0_Mixed) * pow(1.0 - costheta, 5.0);
}


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

    float G1 = smithGeometric(N, V, roughness) * smithGeometric(N, L1, roughness);
    float D1 = DistributionGGX(N, H1, roughness);
    vec3 F1 = fresnelSchlick(dot(N, V), objectColor, metalness);

    float G2 = smithGeometric(N, V, roughness) * smithGeometric(N, L2, roughness);
    float D2 = DistributionGGX(N, H2, roughness);
    vec3 F2 = fresnelSchlick(dot(N, V), objectColor, metalness);

    

    float denominator1 = 1.0 / (4.0 * dot(N, V) * dot(N, L1)); //normalize the energy
    float denominator2 = 1.0 / (4.0 * dot(N, V) * dot(N, L2));
    vec3 specular1 = lightColor1 * lightIntensity1 * (D1 * G1 /denominator1) * F1;
    vec3 specular2 = lightColor2 * lightIntensity2 * (D2 * G2 /denominator2) * F2;

    vec3 ambient = objectColor * ambientIntensity;

    //calculate energy reflected by diffuse light
    vec3 diffuse1 = (vec3(1.0) - F1) * diffuseLight(N, L1, lightColor1, objectColor, lightIntensity1);
    vec3 diffuse2 = (vec3(1.0) - F2) * diffuseLight(N, L2, lightColor2, objectColor, lightIntensity2);

    vec3 finalColor = ambient + objectColor * specular1 + objectColor * specular2 + diffuse1 + diffuse2;

    gl_FragColor = vec4(finalColor, 1.0);
}