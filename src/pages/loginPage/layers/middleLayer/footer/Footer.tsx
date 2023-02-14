import React, { FC, useLayoutEffect } from 'react'
import { gsap } from 'gsap';
import { useAppSelector } from '../../../../../hooks/redux';

import './footer.scss';

interface IFooter {
    index: number
}

type Ref = React.RefObject<HTMLDivElement>;
type DivElem = HTMLDivElement | null;
type RefValue = number | undefined;

const Footer: FC<IFooter> = ({ index }) => {
    const footerRef: Ref = React.useRef(null);
    const currentIndex = useAppSelector((state) => state.currentSlide.value);

    useLayoutEffect(() => {
        const footerElem: DivElem = footerRef.current;
        const width: RefValue = footerElem?.getBoundingClientRect().width;
        const revertWidth: number = width ? -width : 0;
        const gsapContext: gsap.Context = gsap.context(() => {
            const animation: gsap.core.Tween = gsap.to(`.particle-footer-slide${index}`, {
                x: revertWidth, 
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
        <div className='footer' ref={footerRef}>
            <div className={`particle-footer-slide${index}`}></div>
        </div>
    );
}

export default Footer;
