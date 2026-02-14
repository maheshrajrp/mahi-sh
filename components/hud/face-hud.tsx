"use client"

import { Html, Hud, PerspectiveCamera } from "@react-three/drei"
import { BatteryLow, CircleAlert, GlobeX, SignalZero } from "lucide-react"
import { FaceHudItem } from "./face-hud-item"

export const FaceHud = () => {

    return <Hud renderPriority={1}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <FaceHudItem align="top-right">
            <Html position={[0, 0, 0]}>
                <BatteryLow />
            </Html>
        </FaceHudItem>
        <FaceHudItem align="top-left">
            <Html position={[0, 0, 0]}>
                <div className="flex flex-row gap-8">
                    <GlobeX />
                    <CircleAlert />
                    <SignalZero />
                </div>
            </Html>
        </FaceHudItem>
    </Hud>
}