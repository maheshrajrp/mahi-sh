import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function sr(seed: number) {
    const x = Math.sin(seed + 1) * 43758.5453123
    return x - Math.floor(x)
}

function buildAsteroidGeometry(seed: number) {
    const geo = new THREE.IcosahedronGeometry(1.8, 4)
    const pos = geo.attributes.position
    const count = pos.count

    const s1 = sr(seed) * 50
    const s2 = sr(seed + 1) * 50
    const s3 = sr(seed + 2) * 50

    const ex = 0.60 + sr(seed + 3) * 0.80
    const ey = 0.60 + sr(seed + 4) * 0.65
    const ez = 0.60 + sr(seed + 5) * 0.55

    const craterCount = 4 + Math.floor(sr(seed + 6) * 6)
    const craters = Array.from({ length: craterCount }, (_, i) => {
        const phi = sr(seed + 10 + i * 3) * Math.PI * 2
        const theta = Math.acos(2 * sr(seed + 11 + i * 3) - 1)
        return {
            nx: Math.sin(theta) * Math.cos(phi),
            ny: Math.sin(theta) * Math.sin(phi),
            nz: Math.cos(theta),
            radius: 0.16 + sr(seed + 12 + i * 3) * 0.30,
            depth: 0.09 + sr(seed + 13 + i * 3) * 0.18,
        }
    })

    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
        const len = Math.sqrt(x * x + y * y + z * z)
        const nx = x / len, ny = y / len, nz = z / len

        const n1 = Math.sin(nx * 3.1 + s1) * Math.cos(ny * 4.7) * Math.sin(nz * 3.5) * 0.22
        const n2 = Math.sin(nx * 5.9 + s2 + ny * 4.2) * Math.cos(nz * 6.3) * 0.12
        const n3 = Math.sin(nx * 10.3 + s3) * Math.cos(ny * 8.9 + s1) * Math.sin(nz * 9.7) * 0.055
        const n4 = Math.sin(nx * 19.7 + ny * 17.3 + s2) * Math.cos(nz * 21.1 + s3) * 0.022
        let disp = n1 + n2 + n3 + n4

        for (const c of craters) {
            const d = Math.sqrt((nx - c.nx) ** 2 + (ny - c.ny) ** 2 + (nz - c.nz) ** 2)
            if (d < c.radius) {
                const t = d / c.radius
                disp -= (1 - t * t) * c.depth
                if (t > 0.72) disp += Math.sin((t - 0.72) / 0.28 * Math.PI) * c.depth * 0.35
            }
        }

        const bump = 1.0 + disp
        pos.setXYZ(i, nx * ex * bump, ny * ey * bump, nz * ez * bump)

        const t = Math.max(0, Math.min(1, (disp + 0.35) / 0.55))
        // Charcoal look - dark but with visible surface detail
        const base = 0.12 + sr(seed + 20) * 0.05
        colors[i * 3] = base + t * 0.18 // R
        colors[i * 3 + 1] = base + t * 0.16 // G
        colors[i * 3 + 2] = base + t * 0.14 // B
    }


    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
}

const N_GEO = 13
const N_PER_GEO = 1
const TOTAL = N_GEO * N_PER_GEO

const BX = 55, BY = 35, BZ_NEAR = 14, BZ_FAR = -65

interface InstanceData {
    pos: THREE.Vector3[]
    vel: THREE.Vector3[]
    rot: [number, number, number][]
    av: [number, number, number][]
    scl: number[]
}

function buildInstanceData(): InstanceData {
    const pos: THREE.Vector3[] = []
    const vel: THREE.Vector3[] = []
    const rot: [number, number, number][] = []
    const av: [number, number, number][] = []
    const scl: number[] = []

    for (let i = 0; i < TOTAL; i++) {
        pos.push(new THREE.Vector3(
            (sr(i * 7) - 0.5) * BX * 2,
            (sr(i * 7 + 1) - 0.5) * BY * 2,
            BZ_NEAR + (sr(i * 7 + 2)) * (BZ_FAR - BZ_NEAR),
        ))

        const speed = 0.012 + sr(i * 5) ** 1.4 * 0.091   // fast tail
        const th = sr(i * 3) * Math.PI * 2
        const ph = Math.acos(2 * sr(i * 3 + 1) - 1)
        vel.push(new THREE.Vector3(
            Math.sin(ph) * Math.cos(th) * speed,
            Math.sin(ph) * Math.sin(th) * speed * 0.6,
            -Math.abs(Math.cos(ph) * speed * 0.35) - 0.015,  // Always "falling" away
        ))

        rot.push([
            sr(i * 11) * Math.PI * 2,
            sr(i * 11 + 1) * Math.PI * 2,
            sr(i * 11 + 2) * Math.PI * 2,
        ])

        av.push([
            (sr(i * 17) - 0.5) * 0.018,
            (sr(i * 17 + 1) - 0.5) * 0.024,
            (sr(i * 17 + 2) - 0.5) * 0.011,
        ])

        scl.push(Math.pow(sr(i * 19), 1.6) * 3.5 + 0.4)
    }

    return { pos, vel, rot, av, scl }
}

export default function Asteroids() {
    const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([])
    const dummy = useRef(new THREE.Object3D())

    const geometries = useMemo(
        () => Array.from({ length: N_GEO }, (_, i) => buildAsteroidGeometry(i * 41.3)),
        [],
    )

    const data = useMemo(() => buildInstanceData(), [])
    const _color = useMemo(() => new THREE.Color(), [])

    // Seed initial matrices before first render
    useEffect(() => {
        const d = dummy.current
        meshRefs.current.forEach((mesh, gi) => {
            if (!mesh) return
            for (let li = 0; li < N_PER_GEO; li++) {
                const idx = gi * N_PER_GEO + li
                d.position.copy(data.pos[idx])
                d.rotation.set(...data.rot[idx])
                d.scale.setScalar(data.scl[idx])
                d.updateMatrix()
                mesh.setMatrixAt(li, d.matrix)
                mesh.setColorAt(li, _color.setScalar(1))
            }
            mesh.instanceMatrix.needsUpdate = true
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
        })
    }, [data, _color])

    useFrame((state) => {
        const d = data
        const obj = dummy.current
        const camPos = state.camera.position

        meshRefs.current.forEach((mesh, gi) => {
            if (!mesh) return

            for (let li = 0; li < N_PER_GEO; li++) {
                const idx = gi * N_PER_GEO + li
                const p = d.pos[idx]
                const v = d.vel[idx]
                const r = d.rot[idx]
                const a = d.av[idx]
                const s = d.scl[idx]

                // Drift
                p.x += v.x; p.y += v.y; p.z += v.z

                // Wrap around the roaming volume
                if (p.x > BX) p.x = -BX
                if (p.x < -BX) p.x = BX
                if (p.y > BY) p.y = -BY
                if (p.y < -BY) p.y = BY
                if (p.z > BZ_NEAR) p.z = BZ_FAR
                if (p.z < BZ_FAR) p.z = BZ_NEAR

                // Tumble
                r[0] += a[0]; r[1] += a[1]; r[2] += a[2]

                // Distance to camera for exaggerated scaling
                const distToCam = Math.sqrt(
                    (p.x - camPos.x) ** 2 +
                    (p.y - camPos.y) ** 2 +
                    (p.z - camPos.z) ** 2
                )

                // Exaggerated Perspective: shrink more rapidly as distance increases
                // Reference distance of 15-20 where scale is roughly 1.0
                const sizeFactor = Math.pow(20 / Math.max(5, distToCam), 1.6)

                // Fading at boundaries to prevent popping
                const normZ = (p.z - BZ_FAR) / (BZ_NEAR - BZ_FAR)
                const farFade = Math.pow(Math.max(0, Math.min(1, normZ * 1.2 - 0.1)), 1.5)
                const nearFade = THREE.MathUtils.smoothstep(p.z, BZ_NEAR, BZ_NEAR - 10)
                const fade = farFade * nearFade

                obj.position.set(p.x, p.y, p.z)
                obj.rotation.set(r[0], r[1], r[2])
                obj.scale.setScalar(s * sizeFactor)
                obj.updateMatrix()

                mesh.setMatrixAt(li, obj.matrix)
                mesh.setColorAt(li, _color.setScalar(fade))
            }


            mesh.instanceMatrix.needsUpdate = true
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
        })
    })

    return (
        <>
            <ambientLight intensity={0.15} />
            {/* Primary sun — steep angle carves out craters */}
            <directionalLight position={[80, 45, 30]} intensity={3.8} color="#fff8e8" />
            {/* Cool blue rim from behind */}
            <pointLight position={[-40, -20, -30]} intensity={1.4} color="#3355cc" />
            {/* Faint warm fill */}
            <pointLight position={[0, -50, 0]} intensity={0.6} color="#aa6622" />
            {geometries.map((geo, gi) => (
                <instancedMesh
                    key={gi}
                    ref={el => { meshRefs.current[gi] = el }}
                    args={[geo, undefined, N_PER_GEO]}
                >
                    <meshStandardMaterial vertexColors roughness={0.96} metalness={0.02} />
                </instancedMesh>
            ))}
        </>
    )
}
