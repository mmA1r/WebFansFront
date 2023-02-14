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

    const setIndex: ISetIndex = (index) => {
        //swiperRef.current.removeEventListener('mousemove', () => parallaxMove);
        const timeout: any = setTimeout(() => {
            dispatch(changeSide(index));
        }, 250);
        return () => clearTimeout(timeout);
    }

    const parallaxMove = function(e: MouseEvent<HTMLElement>, width: number, height: number, isAnimating: boolean) {
        const vectX = width - e.pageX;
        const vectY = height -  e.pageY;
        if(!isAnimating) {
            gsap.to('.layer-back', {
                x: Math.floor((vectX) * 0.03),
                y: Math.floor((vectY) * 0.03),
            });
        }
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

        swiperElem.addEventListener('mousemove', (e:any) => parallaxMove(e, widthValue, heightValue, swiperElem.swiper.animating));
        document.querySelector('.route-to-sign-up')?.addEventListener('click', nextSlide);
        document.querySelector('.route-to-sign-in')?.addEventListener('click', prevSlide);

        return () => {
            swiperElem.removeEventListener('mousemove', () => parallaxMove);
        }
    });

    return(
            <Swiper
                modules={[Navigation, Parallax]}
                //allowTouchMove={false}
                speed={1000}
                navigation={true}
                parallax={true}
                onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
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