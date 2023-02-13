import StarrySky from './starrySky/StarrySky';

import './backLayer.scss';

export default function LayerBack() {

    return(
        <div
            className={'layer-back'}
            data-swiper-parallax={'68%'}
        >
            <StarrySky/>
        </div>
    );
}