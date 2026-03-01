import { useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { ReactNode, useRef } from "react"
import * as THREE from 'three'

export const Content = () => {

    const scroll = useScroll()
    const { width, height } = useThree((state) => state.viewport)

    const startPosition = new THREE.Vector3(0, 0, 5)
    const endPosition = new THREE.Vector3(0, 0, 0)
    const divRef = useRef<HTMLDivElement>(null)

    useFrame((state, delta) => {
        const r1 = scroll.range(0 / 4, 1 / 4)
        const r2 = scroll.range(1 / 4, 1 / 4)
        const r3 = scroll.range(2 / 4, 1 / 4)
        const r4 = scroll.range(3 / 4, 1 / 4)
        if (divRef.current) {
            const y = scroll.offset * height
            divRef.current.style.transform = `translateY(${y}px)`
        }

        // Animate camera position based on scroll offset
        state.camera.position.lerpVectors(startPosition, endPosition, scroll.offset)
        state.camera.lookAt(0, 0, 0)
    })

    return <>
        <div className="text-white pointer-events-none h-screen w-screen overflow-hidden">
            <div className="h-10vh">
                <div ref={divRef} className='h-full w-full absolute top-0 left-0 will-change-transform' >
                    <Item count={1} >
                        <div className="h-full flex justify-center items-center">
                            <div className="">
                                <h1 className='text-6xl lg:text-9xl text-center'>hi <span className=''> there</span>!</h1>
                                <p className='text-sm lg:text-xl opacity-80'>welcome to <span className='text-cyan-300'>my</span> portfolio</p>
                                <p className='italic opacity-80'>(work in progress)</p>
                            </div>
                        </div>
                    </Item>
                    <Item count={2} >
                        <div className="h-full flex justify-center items-center">
                            <div className="">
                                <h1 className='text-6xl lg:text-9xl text-center'>hi <span className=''> there</span>!</h1>
                                <p className='text-sm lg:text-xl opacity-80'>welcome to <span className='text-cyan-300'>my</span> portfolio</p>
                                <p className='italic opacity-80'>(work in progress)</p>
                            </div>
                        </div>
                    </Item>
                    <Item count={3} >
                        <div className="h-full flex justify-center items-center">
                            <div className="">
                                <h1 className='text-6xl lg:text-9xl text-center'>hi <span className=''> there</span>!</h1>
                                <p className='text-sm lg:text-xl opacity-80'>welcome to <span className='text-cyan-300'>my</span> portfolio</p>
                                <p className='italic opacity-80'>(work in progress)</p>
                            </div>
                        </div>
                    </Item>
                    <Item count={4} >
                        <div className="h-full flex justify-center items-center">
                            <div className="">
                                <h1 className='text-6xl lg:text-9xl text-center'>hi <span className=''> there</span>!</h1>
                                <p className='text-sm lg:text-xl opacity-80'>welcome to <span className='text-cyan-300'>my</span> portfolio</p>
                                <p className='italic opacity-80'>(work in progress)</p>
                            </div>
                        </div>
                    </Item>
                </div>
            </div>
        </div>
    </>
}

type ItemProps = {
    children: ReactNode
    count: number
}

export const Item: React.FC<ItemProps> = ({ count, children }) => {

    const getClassName = () => {
        switch (count) {
            case 1:
                return 'top-[100vh] w-[100vw]'
            case 2:
                return 'top-[180vh] w-[100vw]'
            case 3:
                return 'top-[260vh] w-[100vw]'
            case 4:
                return 'top-[350vh] w-[100vw]'
        }
    }

    return <div className={'absolute ' + getClassName()}>
        {children}
    </div>
}