
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

type AnimatedTextProps = {
    children: string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children }) => {

    const divRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [visible, setVisible] = useState(false)

    useGSAP(() => {
        const split = new SplitText(textRef.current, { type: "words,lines", mask: 'lines', linesClass: 'line', autoSplit: true });
        gsap.from(split.lines, {
            yPercent: 120,
            stagger: 0.1,
            scrollTrigger: {
                trigger: divRef.current,
                // markers: true,
                scrub: true,
                start: "clamp(top center)",
                end: "clamp(bottom center)"
            }
        });
    }, { dependencies: [visible] });


    return <div ref={divRef} className='m-auto flex items-center justify-center h-full'>
        <h1 ref={textRef} className='text-6xl lg:text-9xl text-center'>{children}</h1>
    </div>;
};
