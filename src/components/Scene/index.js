'use client';
import React from "react";
import { Canvas } from '@react-three/fiber'
import Model from './Model';
export default function Index() {
    return (
        <Canvas>
            <Model/>
            <ambientLight intensity={1} />
        </Canvas>
    )
}