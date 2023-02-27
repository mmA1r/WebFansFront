import { FC } from "react";
import './shadowBlock.scss';

interface IShadowBlock {}

const ShadowBlock: FC<IShadowBlock> = () => {
    return(
        <div className="shadow-block"></div>
    );
}

export default ShadowBlock;