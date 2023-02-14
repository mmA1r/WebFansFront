import React, { FC, useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import './header.scss';
import { useAppSelector } from '../../../../../hooks/redux';

interface IHeader {
    index: number
}

type Ref = React.RefObject<HTMLDivElement>;
type DivElem = HTMLDivElement | null;
type RefValue = number | undefined;

const Header: FC<IHeader> = ({ index }) => {
    const headerRef: Ref = React.useRef(null);
    const currentIndex = useAppSelector((state) => state.currentSlide.value);

    useLayoutEffect(() => {
        const headerElem: DivElem = headerRef.current;
        const width: RefValue = headerElem?.getBoundingClientRect().width;
        const gsapContext: gsap.Context = gsap.context(() => {
            const animation: gsap.core.Tween = gsap.to(`.particle-header-slide${index}`, {
                x: width, 
                duration: 7, 
                yoyo: true, 
                repeat: -1,
                ease: 'none',
            });
            if(currentIndex !== index) {
                return animation.pause();
            }
        });

        return () => {
            return gsapContext.revert();
        }
    });

    return(
        <div className='header' ref={headerRef}>
            <div className={`particle-header-slide${index}`}></div>
        </div>
    );
}

export default Header;
