"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

const welcomes = [
    "welcome", "வணக்கம் :)", "hola!", "benvenuto", "bienvenue", "willkommen", "ようこそ", "欢迎",
    "welkom", "bienvenido", "witamy", "välkommen", "환영합니다",
];

export function WelcomeSection() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredLink, setHoveredLink] = useState<'resume' | 'blog' | null>(null);
    const wordRef = useRef(null);
    const container = useRef(null);

    useGSAP(() => {
        if (wordRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomes.length);
                }
            });

            tl.fromTo(wordRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
                .to(wordRef.current, { opacity: 0, duration: 1, delay: 1 });
        }
    }, { scope: container, dependencies: [currentIndex] });

    console.log(hoveredLink)

    return (
        <div ref={container} className='absolute top-0 left-0 h-full w-full flex items-center justify-center flex-col'>
            <div className="flex items-center justify-center p-8 max-w-4xl text-center flex-col pointer-events-auto">
                <span ref={wordRef} className="text-white font-thin text-6xl lg:text-9xl">
                    {welcomes[currentIndex]}
                </span>
                <div className='flex text-xs lg:text-xl flex-row gap-8 py-8 hover:text-cyan-500 cursor-pointer relative'>
                    {/* Invisible Content */}
                    <a
                        href='/Maheshraj_Resume_Public.pdf'
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-white absolute z-40 top-7 -left-12.5 opacity-0 p-10 w-full hover:text-cyan-500 transition-colors'
                        onMouseEnter={() => setHoveredLink('resume')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        view resume →
                    </a>
                    <a
                        href='/hello'
                        className={`text-white  transition-colors relative ${hoveredLink === 'resume' ? 'text-cyan-500! underline' : ''}`}

                    >
                        view resume →
                    </a>

                    {/* Invisible Content */}
                    <a
                        href='https://blog.mehi.sh'
                        target="_blank"
                        rel="noopener noreferrer"
                        className='hover:text-red-500 opacity-0 text-white absolute z-50 top-7 left-15 p-1 w-full'
                        onMouseEnter={() => setHoveredLink('blog')}
                        onMouseLeave={() => setHoveredLink(null)}

                    >
                        read blog →
                    </a>
                    <a

                        className={`text-white  transition-colors relative ${hoveredLink === 'blog' ? 'text-cyan-500! underline' : ''}`}

                    >
                        read blog →
                    </a>
                </div>
            </div>
        </div>
    );
}
