import React from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

import './starrySky.scss';

export default function StarrySky() {
    const starrySky: React.RefObject<HTMLDivElement> = React.useRef(null);

    useLayoutEffect(() => {
        const heightElem: HTMLDivElement | null = starrySky.current;
        const widthElem: HTMLDivElement | null = starrySky.current;
        const height: number | undefined = heightElem?.getBoundingClientRect().height;
        const width: number | undefined = widthElem?.getBoundingClientRect().width;
        const gsapContext: gsap.Context = gsap.context(() => {
            const stars: HTMLSpanElement[] = gsap.utils.toArray('.star');
            stars.forEach((star: gsap.TweenTarget) => {
                if( typeof width === 'number' && typeof height === 'number') {
                    gsap.to(star, {
                        x: Math.floor(Math.random() * width),
                        y: Math.floor(Math.random() * height)
                    });
                }
                gsap.to(star, {
                    boxShadow: `0px 0px 4px 1px`,
                    delay: Math.floor(Math.random() * 3),
                    repeat: -1,
                    duration: 2.5,
                    yoyo: true,
                    ease: 'none'
                });
            });
            gsap.to('.star', {
                opacity: 1,
                delay: 0.4
            });
        });

        return () => {
            gsapContext.revert();
        }
    });

    return(
        <div className="starry-sky" ref={starrySky}>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
            <span className={'star'}/>
        </div>
    );
}