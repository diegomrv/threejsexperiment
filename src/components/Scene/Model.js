import React, { useRef, useEffect } from 'react'
import {
    MeshTransmissionMaterial,
    CameraControls,
    PerspectiveCamera,
    Image,
    Grid,
    shaderMaterial,
    Plane,
    Sphere,
    Icosahedron
} from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import vertexShader from '../../shaders/ribbed/vertex.glsl'
import fragmentShader from '../../shaders/ribbed/fragment.glsl'
import CustomMeshTransmissionMaterial from "../CustomMeshTransmissionMaterial";

export default function Model() {
    const { viewport } = useThree()
    const geometry = useRef(null);

    useEffect(() => {
        console.log(geometry.current)
    }, [geometry.current])

    const materialProps = useControls({
        samples: { value: 10, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0.4, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.1, min: 0, max: 1 },
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
    })

    const gridProps = {
        cellColor: 'white',
        args: [50, 50]
    }

    return (
        <>
            <CameraControls/>
            <Grid {...gridProps} />

            <PerspectiveCamera makeDefault position={[0, 0, 1]}>
            </PerspectiveCamera>

            <Image url="img/background.jpg" scale={[viewport.width, viewport.height]} position={[0, 0, -1.1]}/>
            <Plane ref={geometry} args={[1, 1, 150, 150]} scale={[viewport.width, viewport.height, 1]}
                   position={[0, 0, -1]}>
                <CustomMeshTransmissionMaterial {...materialProps} />
            </Plane>

            {/*<MeshTransmissionMaterial {...materialProps}/>*/}
            {/*<shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader}
                            uniforms={{uTime: {value: 0}}}/>*/}
        </>
    );
}