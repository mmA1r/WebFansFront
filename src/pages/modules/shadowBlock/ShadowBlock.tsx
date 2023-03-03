import { FC, useEffect } from "react";
import { gsap } from "gsap";
import './shadowBlock.scss';

interface IShadowBlock {}

const ShadowBlock: FC<IShadowBlock> = () => {

    useEffect(() => {
        gsap.set('.shadow-block', {
            zIndex: -100,
            opacity: 0
        });
    });

    return(
        <div className="shadow-block"></div>
    );
}

export default ShadowBlock;