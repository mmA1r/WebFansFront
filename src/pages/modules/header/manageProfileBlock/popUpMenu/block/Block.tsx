import { FC } from 'react';
import ManageButton from './manageButton/ManageButton';
import './block.scss';

interface IBlock {
    blockType: string,
    buttonsType: string[]
}

const BlockType: FC<IBlock> = ({ blockType, buttonsType }) => {
    return(
        <div className={`${blockType}-block pop-up-menu-block`}>
            {buttonsType.map(button => {
                return <ManageButton key={button} type={button}/>
            })}
        </div>
    );
}

export default BlockType;