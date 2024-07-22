import {useRef, useEffect} from 'react';
import {MeshTransmissionMaterial} from '@react-three/drei';
import {extend, useFrame} from '@react-three/fiber';

// Custom Shader Material Component
const CustomShaderMeshTransmissionMaterial = ({children, ...props}) => {
    const materialRef = useRef(null);

    useFrame( (state, delta) => {
        materialRef.current.uniforms.uTime.value += delta * 0.02;
        //console.log(materialRef.current.uniforms)
    })

    useEffect(() => {
        if (!materialRef.current) return;

        // Capture the original onBeforeCompile function
        const originalOnBeforeCompile = materialRef.current.onBeforeCompile;

        // Define your custom onBeforeCompile function
        materialRef.current.onBeforeCompile = (shader) => {
            // Call the original onBeforeCompile function to preserve existing behavior
            if (originalOnBeforeCompile) originalOnBeforeCompile(shader);

            // Your custom vertex shader code as a string
            const customVertexShaderCode = `
                uniform float uTime;
    
                varying vec3 vPosition;
                varying vec2 vUv;
                varying float vDisplacement;
    
                #define CUSTOMPI 3.1415926535897932384626433832795
                
                float smoothMod(float axis, float amp, float rad){
                    float top = cos(CUSTOMPI * (axis / amp)) * sin(CUSTOMPI * (axis / amp));
                    float bottom = pow(sin(CUSTOMPI * (axis / amp)), 2.0) + pow(rad, 2.0);
                    float at = atan(top / bottom);
                    return amp * (1.0 / 2.0) - (1.0 / CUSTOMPI) * at;
                }
            
                float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
                    return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
                }
            
                float wave(vec2 position) {
                    return fit(smoothMod(position.x * 20.0, 0.6, 5.0), 0.15, 0.75, 0.0, 1.0);
                }
            `;

            // Inject your custom vertex shader code
            shader.vertexShader = customVertexShaderCode + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace('#include <project_vertex>', /*glsl*/`
                vec2 coords = uv;
                coords.x += uTime;
                float pattern = wave(coords);
    
                vDisplacement = pattern;
            
                vec3 newPosition = position + vec3(0.0, 0.0, vDisplacement);
            
                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                gl_Position = projectionMatrix * mvPosition;
            `);

            //const customFragmentShaderCode = `
            //    varying float vDisplacement;
            //`;

            //shader.fragmentShader = customFragmentShaderCode + shader.fragmentShader;

            //shader.fragmentShader = shader.fragmentShader.replace('#include <colorspace_fragment>', /*glsl*/`
            //    gl_FragColor = vec4(vec3(vDisplacement), 1);
            //`);

            console.log('vertex: ', shader.vertexShader)
            console.log('fragment: ', shader.fragmentShader)

            // Trigger an update to recompile the shader with your custom onBeforeCompile function
            materialRef.current.needsUpdate = true;
        };

        materialRef.current.uniforms.uTime = { value: 0 };
    }, []);

    return (
        <MeshTransmissionMaterial ref={materialRef} {...props}>
            {children}
        </MeshTransmissionMaterial>
    );
};

// Don't forget to extend Three.js's material system with your custom material if needed
extend({CustomShaderMeshTransmissionMaterial});

export default CustomShaderMeshTransmissionMaterial;