import { FC, useRef, useLayoutEffect } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { gsap } from 'gsap';

import SignInBlock from './signInBlock/SignInBlock';
import SignUpBlock from './signUpBlock/SignUpBlock';

import './middleFrontLayer.scss';

interface IMiddleFrontLayer {
    slideNumber: number;
}

const MiddleFrontLayer: FC<IMiddleFrontLayer> = ({ slideNumber }) => {
    const loginBlockRef:any = useRef();
    const currentSlide = useAppSelector((state) => state.currentSlide.value);

    useLayoutEffect(() => {
        const halfHeight = loginBlockRef.current.getBoundingClientRect().height / 2;
        const gsapContext: gsap.Context = gsap.context(() => {
            const bottomAnim = gsap.to(`.right-bottom-praticle${slideNumber}, .left-bottom-praticle${slideNumber}`, {
                y: halfHeight,
                yoyo: true,
                repeat: -1,
                duration: 1.5,
                delay: 0.5,
                ease: 'none'
            });
            const topAnim = gsap.to(`.right-top-praticle${slideNumber}, .left-top-praticle${slideNumber}`, {
                y: -halfHeight,
                yoyo: true,
                repeat: -1,
                duration: 1.5,
                delay: 0.5,
                ease: 'none'
            });
            if(currentSlide !== slideNumber) {
                topAnim.pause();
                bottomAnim.pause();
            }
        });

        return () => {
            gsapContext.revert();
        }
    });

    return(
        <div 
            data-swiper-parallax={'8%'} 
            className="slider-layer layer-middle-front" 
            ref={loginBlockRef}
        >
            {slideNumber ? <SignUpBlock/> : <SignInBlock/>}
            <div className={`particle right-top-praticle${slideNumber}`}></div>
            <div className={`particle right-bottom-praticle${slideNumber}`}></div>
            <div className={`particle left-top-praticle${slideNumber}`}></div>
            <div className={`particle left-bottom-praticle${slideNumber}`}></div>
        </div>
    );
}

export default MiddleFrontLayer;