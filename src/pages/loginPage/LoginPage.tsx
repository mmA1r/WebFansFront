import React, { FC, MouseEvent, useLayoutEffect } from 'react';
import { Navigation, Parallax } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch } from '../../hooks/redux';
import { changeSide } from '../../store/features/currentSlide';
import { gsap } from 'gsap';

import BackLayer from "./layers/backLayer/BackLayer";
import MiddleLayer from "./layers/middleLayer/MiddleLayer";

import './loginPage.scss';
import MiddleFrontLayer from './layers/middleFrontLayer/MiddleFrontLayer';

interface ILoginPage {

}
interface ISetIndex {
    (index: number): any
}
type DivValue = number | undefined;

const LoginPage: FC<ILoginPage> = () => {
    const dispatch = useAppDispatch();
    const swiperRef: any = React.useRef();

    var reqId: any;
    var mouseX: number | undefined;
    var mouseY: number | undefined;
    var mult: number = 0.03;

    const setIndex: ISetIndex = (index) => {
        const timeout: any = setTimeout(() => {
            dispatch(changeSide(index));
        }, 250);
        return () => clearTimeout(timeout);
    }

    const findMouseVector = function(e: MouseEvent<HTMLElement>, width: number, height: number) {
        mouseX = width - e.pageX;
        mouseY = height - e.pageY;
    }

    function nextSlide():void {
        return swiperRef.current.swiper.slideNext(1000);
    }

    function prevSlide():void {
        return swiperRef.current.swiper.slidePrev(1000);
    }

    useLayoutEffect(() => {
        const swiperElem = swiperRef.current;
        const layerBack: DOMRect | undefined = document.querySelector('.layer-back')?.getBoundingClientRect();
        const layerWidth: DivValue = layerBack?.width;
        const layerHeight: DivValue = layerBack?.height;
        const widthValue = layerWidth ? layerWidth / 2 : 400;
        const heightValue = layerHeight ? layerHeight : 400;

        swiperElem.addEventListener('mousemove', (e:any) => findMouseVector(e, widthValue, heightValue));
        document.querySelector('.route-to-sign-up')?.addEventListener('click', nextSlide);
        document.querySelector('.route-to-sign-in')?.addEventListener('click', prevSlide);
        
        parallaxMove();

        return () => {
            swiperElem.removeEventListener('mousemove', findMouseVector);
            cancelAnimationFrame(reqId);
        }
    });

    function onEnd() {
        mult = 0.001;
    }

    function parallaxMove():void {
        const swiper: any = swiperRef.current.swiper;
        const isAnimating: boolean = swiper.animating;
        const slideIndex: number = swiper.activeIndex;
        if(mouseX && mouseY && !isAnimating) {
            if(mult < 0.03) {
                mult += 0.001;
            }
            gsap.set('.layer-back', {
                transform: `
                    translate3d(calc(${slideIndex ? '34%' : '0%'} + ${Math.floor((mouseX) * mult)}px), 
                    ${Math.floor((mouseY) * mult)}px, 
                    0px)
                `,
            });
        }
        reqId = requestAnimationFrame(parallaxMove);
    }


    return(
            <Swiper
                modules={[Navigation, Parallax]}
                allowTouchMove={false}
                speed={1000}
                navigation={true}
                parallax={true}
                onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
                onSlideChangeTransitionEnd={() => onEnd()}
                ref={swiperRef}
            >
                <BackLayer/>
                <SwiperSlide>
                    <MiddleLayer slideNumber={0}/>
                    <MiddleFrontLayer slideNumber={0}/>
                </SwiperSlide>
                <SwiperSlide>
                    <MiddleLayer slideNumber={1}/>
                    <MiddleFrontLayer slideNumber={1}/>
                </SwiperSlide>
            </Swiper>
    );
}

export default LoginPage;