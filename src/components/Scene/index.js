'use client';
import React from "react";
import { Canvas } from '@react-three/fiber'
import Model from './Model';
export default function Index() {
    return (
        <Canvas>
            <Model/>
            <directionalLight intensity={2} position={[0, 2, 3]} />
        </Canvas>
    )
}