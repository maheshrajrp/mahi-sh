import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatedText } from "./animated-text"

gsap.registerPlugin(useGSAP)

export const Content = () => {

    return <>
        <AnimatedText>Hello</AnimatedText>
        <AnimatedText>Hello World</AnimatedText>
    </>
}
