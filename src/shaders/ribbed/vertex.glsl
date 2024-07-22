uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;

#define PI 3.1415926535897932384626433832795

/*
* SMOOTH MOD
* - authored by @charstiles -
* based on https://math.stackexchange.com/questions/2491494/does-there-exist-a-smooth-approximation-of-x-bmod-y
* (axis) input axis to modify
* (amp) amplitude of each edge/tip
* (rad) radius of each edge/tip
* returns => smooth edges
*/

float smoothMod(float axis, float amp, float rad){
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
    return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
}

float wave(vec2 position) {
    return fit(smoothMod(position.x * 10.0, 0.9, 5.5), 0.25, 0.85, 0.0, 1.0);
}

void main() {
    vec2 coords = uv;
    coords.x += uTime;
    float pattern = wave(coords);

    vPosition = position;
    vNormal = normal;
    vUv = uv;
    vDisplacement = pattern;

    vec3 newPosition = position + vec3(0.0, 0.0, vDisplacement);

    vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
}