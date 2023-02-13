import { Swiper, SwiperOptions } from "swiper";
import { useLayoutEffect } from 'react';
import BackLayer from "./layers/backLayer/BackLayer";

import './loginPage.scss';

export default function LoginPage() {

    useLayoutEffect(() => {
        const swiperParams: SwiperOptions = {
            navigation: {
                nextEl: null,
                prevEl: null
            },
            allowTouchMove: false,
            speed: 1000,
            parallax: true
        };
    
        const swiper = new Swiper('.swiper', swiperParams);
        //console.log(swiper)
    });

    return(
        <div className="swiper">
            <BackLayer/>
            <div className="swiper-wrapper">
                <div className="swiper-slide">

                </div>
                <div className="swiper-slide">

                </div>
            </div>
        </div>
    );
}