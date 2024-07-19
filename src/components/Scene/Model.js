import React, { useRef } from 'react'
import { MeshTransmissionMaterial, Sphere, CameraControls, PerspectiveCamera, Image, Grid } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Model() {
    const { viewport } = useThree()
    const sphere = useRef(null);

    /*useFrame( () => {
        sphere.current.rotation.x += 0.02
    })*/

    const materialProps = useControls({
        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
        roughness: { value: 0, min: 0, max: 1, step: 0.1 },
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
        chromaticAberration: { value: 0.02, min: 0, max: 1},
        backside: { value: true },
    })

    const gridProps = {
        cellColor: 'white',
        args: [50, 50]
    }

    return (
        <>
            <CameraControls />
            <Grid {...gridProps} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} >
                <Image url="img/background.jpg" scale={[viewport.width, viewport.height]} position={[0, 0, -4]}/>
                <Sphere args={[1, 64, 32]} position={[0, 0, -2]} >
                    <MeshTransmissionMaterial {...materialProps}/>
                </Sphere>
            </PerspectiveCamera>
        </>
    );
}