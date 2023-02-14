import { FC } from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import './middleLayer.scss';

interface IMiddleLayer {
    slideNumber: number
}

const MiddleLayer: FC<IMiddleLayer> = ({ slideNumber }) => {
    return(
        <div
            className="slider-layer layer-middle"
            data-swiper-parallax={'24%'}
        >
            <Footer index={slideNumber} />
            <Header index={slideNumber}/>
        </div>
    );
}

export default MiddleLayer